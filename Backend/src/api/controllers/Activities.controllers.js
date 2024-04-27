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
const { search } = require("../routes/Activities.routes");

//! ------------------------------------------------------------------------
//? ---------------------------CREAR ACTIVIDADES----------------------------
//! ------------------------------------------------------------------------

const createActivity = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    /*if (req.user.rol !== "superadmin") {
      return res
        .status(403)
        .json({ error: "No estás autorizado para realizar esta acción" });
    }*/
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

    const newActivity = new Activities(req.body);

    await newActivity.save();

    return res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
};

//! ------------------------------------------------------------------------
//? ---------------------------STATUS ACTIVIDAD-----------------------------
//! ------------------------------------------------------------------------

const toggleStatus = async (req, res, next) => {
  try {
    /*if (req.user.rol !== "superadmin") {
      return res
        .status(403)
        .json({ error: "No estás autorizado para realizar esta acción" });
    } ---- lo quito porque en el middelware tengo isAuthAdmin*/
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

//la diferencia es que es con find() y populamos las pelis. La dif con el anterior es que el find nos da un array,
/*por lo que usamos length y que sea mayor que 0. Si es mayor que 0 mandamos un 200 y decimos todos los que 
elementos character que hemos pedido.
*/
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

    const allActivities = await Activities.find(search).populate("like");

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

    const allActivities = await Activities.find({ name }).populate("like");

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

    const { id } = req.params;
    // vamos a tener el middleware de auth por lo cual se crea req.user
    const { _id } = req.user;

    //! me quedo aquí porque mi user no tiene activitiesFav hacia mi modelo...
    if (req.user.activitiesFav.includes(id)) {
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { activitiesFav: id },
        });
        try {
          await Activities.findByIdAndUpdate(id, {
            $pull: { likes: _id },
          });

          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("activitiesFav"),
            activity: await Activities.findById(id).populate("likes"),
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
          $push: { activiesFav: id },
        });

        try {
          await Activities.findByIdAndUpdate(id, {
            $push: { likes: _id },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("activitiesFav"),
            movie: await Activity.findById(id).populate("likes"),
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
    return res.status(404).json(error.message);
  }
};

/**

9. toggleLike (all)
11. delete (all)
 */

module.exports = {
  createActivity,
  toggleStatus,
  getAll,
  getById,
  getByName,
  getByType,
  update,
  toggleLikeActivity,
};
