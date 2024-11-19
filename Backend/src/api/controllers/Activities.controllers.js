const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

dotenv.config();

//! -----------------------------------------------------------------------
//? ------------------------------modelos----------------------------------
//! -----------------------------------------------------------------------
const Activities = require("../models/Activities.model");
const User = require("../models/User.model");
const enumTypeActivityIsOk = require("../../utils/enumOk");
const { default: isBoolean } = require("validator/lib/isBoolean");
const ActivityToDay = require("../models/ActivityToDay.model");

//! ------------------------------------------------------------------------
//? ---------------------------CREAR ACTIVIDADES----------------------------
//! ------------------------------------------------------------------------

const createActivity = async (req, res, next) => {
  let catchImg = req.file?.path;
  console.log(req.file);
  if (!catchImg) {
    catchImg = "https://pic.onlinewebfonts.com/svg/img_181369.png"; //aquí podemos poner por defecto al logo del gym
  }
  try {
    // esta acción solo puede hacerla el superadmin, por eso metemos el middelware en la ruta
    await Activities.syncIndexes();

    const { name, type } = req.body;

    if (!enumTypeActivityIsOk(type)) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res
        .status(400)
        .json({ error: "type no válido. Acepta pistas o colectivas" });
    }

    const activitieExist = await Activities.findOne({ name });

    if (activitieExist) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json({ error: "Esta actividad ya existe" });
    }
    //no hace falta poner el else porque si no se da la condición, directamente sigue al sgte pto.

    const newActivity = new Activities({ ...req.body, image: catchImg });

    await newActivity.save();

    return res.status(201).json(newActivity);
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);

    next(error);
  }
};

//! ------------------------------------------------------------------------
//? ---------------------------STATUS ACTIVIDAD-----------------------------
//! ------------------------------------------------------------------------

const toggleStatus = async (req, res, next) => {
  try {
    await Activities.syncIndexes();

    const { idActivity } = req.params;

    const activity = await Activities.findById(idActivity);

    if (!activity) {
      return res.status(404).json({ error: "Esa actividad no existe" });
    }

    activity.status = activity.status ? false : true; //yo no sé el status de activity, por tanto
    // si status es true, me lo pasas a false, y si es false me lo pasas a true

    await Activities.findByIdAndUpdate(idActivity, activity);

    return res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
};

//! ------------------------------------------------------------------------
//? ------------------------------GET ALL-----------------------------------
//! ------------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    let { status, name } = req.query;
    let search = {};
    if (status) {
      search.status = validator.toBoolean(status);
    }
    /*
    if (name) {
      search.name = name;
    }*/

    const allActivities = await Activities.find(search);

    if (allActivities.length > 0) {
      return res.status(200).json(allActivities);
    } else {
      return res.status(404).json({
        error: "No se han encontrado actividades",
      });
    }
  } catch (error) {
    return res.status(409).json({
      error: "Error",
      message: error.message,
    });
  }
};

//! ------------------------------------------------------------------------
//? ------------------------------GET BY ID---------------------------------
//! ------------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findById(id);
    if (activity) {
      return res.status(200).json(activity);
    } else {
      return res
        .status(404)
        .json({ error: "No se ha encontrado la actividad" });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ------------------------------------------------------------------------
//? -----------------------------GET BY NAME--------------------------------
//! ------------------------------------------------------------------------

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    // Con esto conseguimos que no importe mayúsculas y minúsculas en el input buscador
    const regex = new RegExp(name, "i");

    const allActivities = await Activities.find({ name: regex }).populate(
      "like"
    );

    if (allActivities.length > 0) {
      return res.status(200).json(allActivities);
    } else {
      return res
        .status(404)
        .json({ error: "No se han encontrado actividades" });
    }
  } catch (error) {
    return res.status(409).json({
      error: "Error",
      message: error.message,
    });
  }
};

//! ------------------------------------------------------------------------
//? ------------------------------GET BY TYPE-------------------------------
//! ------------------------------------------------------------------------

const getByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    if (!enumTypeActivityIsOk(type)) {
      return res
        .status(400)
        .json({ error: "type no válido. Acepta pistas o colectivas" });
    }
    const allActivities = await Activities.find({ type }).populate("like");

    if (allActivities.length > 0) {
      return res.status(200).json(allActivities);
    } else {
      return res
        .status(404)
        .json({ error: "No se han encontrado actividades" });
    }
  } catch (error) {
    return res.status(409).json({
      error: "Error",
      message: error.message,
    });
  }
};

//! ------------------------------------------------------------------------
//? ---------------------------------UPDATE---------------------------------
//! ------------------------------------------------------------------------

const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Activities.syncIndexes();
    const { id } = req.params;
    const activity = await Activities.findById(id);

    if (!activity) {
      return res
        .status(404)
        .json({ error: "No se han encontrado actividades" });
    }
    const oldImg = activity.image; // si existe, guardamos la imagen antigua, porque si hay una nueva, la antigua la borro.

    const customBody = {
      //hago un custom body, y le digo que las cosas que me haya podido cambiar, que no me las cambie.
      _id: activity._id, // el id no quiero que lo cambie, por lo que me quedo con lo que tenía
      image: req.file?.path ? catchImg : oldImg, // con un ternario le digo: si hay imagen la metes, y si no, dejas la old.
      name: req.body?.name ? req.body?.name : activity.name, //si recibo nombre me lo cambias, sino, te quedas con lo que tenías.
      spots: req.body?.spots ? req.body?.spots : activity.spots,
      description: req.body?.description
        ? req.body?.description
        : activity.description,
      type: req.body?.type ? req.body?.type : activity.type,
      status:
        req.body?.status !== undefined ? req.body?.status : activity.status,
    };

    try {
      await Activities.findByIdAndUpdate(id, customBody);
      if (req.file?.path) {
        deleteImgCloudinary(oldImg);
      }
      const activityUpdated = await Activities.findById(id);
      return res.status(200).json(activityUpdated);
    } catch (error) {
      return res.status(409).json(error.message);
    }
  } catch (error) {
    return res.status(409).json(error.message);
  }
};

//! ------------------------------------------------------------------------
//? --------------------------------TOGGLE LIKE-----------------------------
//! ------------------------------------------------------------------------

const toggleLikeActivity = async (req, res, next) => {
  try {
    await Activities.syncIndexes();

    const { id } = req.params; //id de la actividad
    const { _id } = req.user;

    if (req.user.activitiesFav?.includes(id)) {
      //me daba error siempre porque la activitiesFav no existia en el objeto user, por eso le meto el ?
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { activitiesFav: id },
        });
        try {
          await Activities.findByIdAndUpdate(id, {
            $pull: { like: _id },
          });

          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("activitiesFav"),
            activity: await Activities.findById(id).populate("like"),
            activityAll: await Activities.find(),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update activities - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  activitiesFav",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { activitiesFav: id },
        });

        try {
          await Activities.findByIdAndUpdate(id, {
            $push: { like: _id },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("activitiesFav"),
            activity: await Activities.findById(id).populate("like"),
            activityAll: await Activities.find(),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update activity - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  activitiesFav",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

/**
 * 1. actividades + imagen
 * 2. actvidades favoritas en usuario
 * 3. actividades del activity today
 * 4. reservas de esa actividad - PENDIENTE
 *
 */

const deleteActivity = async (req, res, next) => {
  try {
    await Activities.syncIndexes();

    const { id } = req.params; // id de la actividad que quiero eliminar se la paso por param
    const activity = await Activities.findByIdAndDelete(id);

    if (!activity) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    if (await Activities.findById(id)) {
      // si me la encuentra es que no se ha borrado
      return res.status(409).json({ error: "Actividad no borrada" });
    }
    try {
      await User.updateMany(
        { activitiesFav: id },
        { $pull: { activitiesFav: id } }
      );
      if (activity.image) {
        deleteImgCloudinary(activity.image);
      }

      try {
        await ActivityToDay.deleteMany({ activityId: id });
        return res.status(200).json({ status: "Borrada con éxito" });
      } catch (error) {
        return res.status(409).json({
          error: " ActivityToDay updateMany",
          message: error.message,
        });
      }
    } catch (error) {
      return res.status(409).json({
        error: " User updateMany  --  likes",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
};

module.exports = {
  createActivity,
  toggleStatus,
  getAll,
  getById,
  getByName,
  getByType,
  update,
  toggleLikeActivity,
  deleteActivity,
};
