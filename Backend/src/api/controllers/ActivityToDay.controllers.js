const Activities = require("../models/Activities.model");
const ActivityToDay = require("../models/ActivityToDay.model");
const Day = require("../models/Day.model");
const User = require("../models/User.model");

const createActivityToDay = async (req, res, next) => {
  try {
    const { activityId, monitorId, bookings,room } = req.body;
    const idActivity = await Activities.findById(activityId)
    if (!idActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    const idMonitor = await User.findById(monitorId)

    if (!idMonitor || idMonitor.rol !== "monitor") {
      return res.status(400).json({
        error: "El usuario no tiene el rol necesario para asociar la actividad",
      });
    }

const customBody={
      activityId,
      avaibleSpots:idActivity.spots,
      monitorId,
      bookings,
      room,
    }

    const newActivityToDay = new ActivityToDay(customBody)
      const savedActivityToDay = await newActivityToDay.save();
      const findNewActivityToDay = await ActivityToDay.findById(savedActivityToDay._id).populate("activityId monitorId");
      
      res.status(findNewActivityToDay ? 200 : 404).json(findNewActivityToDay ? findNewActivityToDay: "Error no se ha creado");

  } catch (error) {
    return res.status(404).json({
      messege: "error en el creado del elemento",
      error: error.message,
    });
  }
};

const getAllActivitiesToDay = async (req, res) => {
  try {
    const activitiesToDay = await ActivityToDay.find().populate("activityId monitorId")
    res.status(200).json(activitiesToDay);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las actividades del día" });
  }
};

const getActivityToDayById = async (req, res) => {
  const { id } = req.params;
  try {
    const activityToDay = await ActivityToDay.findById(id);
    if (!activityToDay) {
      return res.status(404).json({ error: "Actividad del día no encontrada" });
    }
    res.status(200).json(activityToDay);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la actividad del día" });
  }
};

const toggleBooking = async (req, res, next) => {
  try {
    const { idActivityToDay } = req.params;
    const { _id } = req.user;
    const activityToDay = await ActivityToDay.findById(idActivityToDay);
    if (activityToDay.bookings.length >= activityToDay.avaibleSpots) {
          return res.status(404).json({
          error: "no se puede realizar la reserva, no quedan plazas disponibles.",
        });
    }
    if (req.user.reservas.includes(idActivityToDay)) {
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { reservas: idActivityToDay },
        });
        try {
          await ActivityToDay.findByIdAndUpdate(idActivityToDay, {
            $pull: { bookings: _id },
            $inc: { avaibleSpots: 1 },
          });

          return res.status(200).json({
            action: "Quitar reserva",
            user: await User.findById(_id).populate("reservas"),
            ActivitieToDay: await ActivityToDay.findById(
              idActivityToDay
            ).populate("bookings"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no cancelada la reserva - bookings",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no cancelada la reserva user - reservas",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { reservas: idActivityToDay },
        });
        try {
          await ActivityToDay.findByIdAndUpdate(idActivityToDay, {
            $push: { bookings: _id },
            $inc: { avaibleSpots: -1 },
          });

          return res.status(200).json({
            action: "Reserva realizada",
            user: await User.findById(_id).populate("reservas"),
            ActivitieToDay: await ActivityToDay.findById(
              idActivityToDay
            ).populate("bookings"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no hecha la reserva - bookings",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no hecha la reserva user - reservas",
          message: error.message,
        });
      }
    }
  
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
const deleteActivityToDay = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activityToDay = await ActivityToDay.findByIdAndDelete(id);
    if (activityToDay) {
      return res.status(404).json("not deleted");
    }else{
      
      try {
         await ActivityToDay.findById(id);
        await Day.updateMany(
          {
            $or: [
              { one: id },
              { two: id },
              { three: id },
              { four: id },
              { five: id },
              { six: id },
              { seven: id },
              { eight: id },
            ],
          },
          {
            $unset: {
              one: id,
              two: id,
              three: id,
              four: id,
              five: id,
              six: id,
              seven: id,
              eight: id,
            },
          }
          /*La función $pull se utiliza para eliminar elementos específicos de un array dentro de un documento. Sin embargo, en este caso, los campos no son arrays, son campos que contienen directamente el ID de la actividad.$unset se usa para eliminar campos completos de un documento, mientras que $pull se utiliza para eliminar elementos específicos de un array dentro de un documento.*/
        );
      } catch (error) {
        return res.status(404).json(error.message);
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
const updateActivityToDay = async (req, res, next) => {
  try {
    await ActivityToDay.syncIndexes();
    const { idActivityToDay } = req.params;
    const activityToDayId = await ActivityToDay.findById(idActivityToDay);
    if (activityToDayId) {
      const customBody = {
        _id: activityToDayId._id,
        activityId: req.body?.activityId
          ? req.body?.activityId
          : activityToDayId.activityId,
        monitorId: req.body?.monitorId
          ? req.body?.monitorId
          : activityToDayId.monitorId,
      };
      if (
        req.body?.monitorId &&
        req.body.monitorId !== activityToDayId.monitorId
      ) {
        const idMonitor = await User.findById(req.body.monitorId); // Aquí comprueba que el Id de user que pasamos tenga el rol correcto.
        if (!idMonitor || idMonitor.rol !== "monitor") {
          return res.status(400).json({
            error:
              "El usuario no tiene el rol necesario para asociar la actividad",
          });
        }
      }

      try {
        await ActivityToDay.findByIdAndUpdate(idActivityToDay, customBody);

        const activitiesToDayByIdUpdate = await ActivityToDay.findById(
          idActivityToDay
        );
        const elementUpdate = Object.keys(req.body);
        let test = {};
        elementUpdate.forEach((item) => {
          if (req.body[item] === activitiesToDayByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });
        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json("este ActivityToDay no existe");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createActivityToDay,
  getAllActivitiesToDay,
  getActivityToDayById,
  toggleBooking,
  deleteActivityToDay,
  updateActivityToDay,
};
