const Activities = require("../models/Activities.model");
const ActivityToDay = require("../models/ActivityToDay.model");
const Day = require("../models/Day.model");
const User = require("../models/User.model");

const createDay = async (req, res, next) => {

  /* Controlador desactualizado por mala relación dedatos (lo mismo que ocurre con el controlador de createActivityToDay). */
  try {
    const { day, dates, type, one, two, three, four, five, six, seven, eight} = req.body;

    if (type ==  "Habil" ){
      const customDate = {
        one, two, three, four, five, six, seven, eight,day, dates, type
      }

      const newDay = new Day(customDate)
      try {
          const savedDay = await newDay.save();
      const findNewDay = await Day.findById(savedDay._id).populate("one two three four five six seven eight")
      
      res.status(findNewDay ? 200 : 404).json(findNewDay ? findNewDay: "Error no se ha creado");
        
      } catch (error) {
        return res.status(404).json({
          message: "Error no se ha creado",
          error: error
        })
        
      }
    }else if(type =="Finde"){

      const customDate = {
        one, two, three,day, dates, type
      }

      const newDay = new Day(customDate)
      try {
          const savedDay = await newDay.save();
      const findNewDay = await Day.findById(savedDay._id).populate("one two three")
      
      res.status(findNewDay ? 200 : 404).json(findNewDay ? findNewDay: "Error no se ha creado");
        
      } catch (error) {
        return res.status(404).json({
          message: "Error no se ha creado",
          error: error
        })
  
      }
    }else if(type =="Festivo"){

      const customDate = {
        one, two, three, four, five, day, dates, type
      }

      const newDay = new Day(customDate)
      try {
          const savedDay = await newDay.save();
      const findNewDay = await Day.findById(savedDay._id).populate("one two three four five")
      
      res.status(findNewDay ? 200 : 404).json(findNewDay ? findNewDay: "Error no se ha creado");
        
      } catch (error) {
        return res.status(404).json({
          message: "Error no se ha creado",
          error: error
        })
    
      }
    }else{
      return res.status(404).json("el type no es correcto")
    }
    
  } catch (error) {
    next(error);
  }
};

const updateDay = async (req, res, next) => {
  try {
    const { idDay } = req.params; // ID del día por params
    const { day, room, dates, type, activities } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    // Verificar si el día existe en la base de datos
    const existingDay = await Day.findById(idDay);

    // Actualizar los datos del día con los valores proporcionados en el cuerpo de la solicitud
    if (existingDay) {
      const updateFields = {};
      if (day) updateFields.room = day;
      if (room) updateFields.room = room;
      if (dates) updateFields.dates = dates;
      if (type) updateFields.type = type;
      let maxTimeSlots = 8; // Por defecto, máximo de 8 tramos
      if (type === "Finde") {
        maxTimeSlots = 3; // Fin de semana: máximo de 3 tramos
      } else if (type === "Festivo") {
        maxTimeSlots = 5; // Día festivo: máximo de 5 tramos
      }

      // Actualizar las actividades del día si se proporcionan
      if (activities && activities.length > 0) {
        // Recorrer las actividades proporcionadas en el cuerpo de la solicitud
        for (const activity of activities) {
          const { timeSlot, activityId } = activity;

          // Verificar si el tramo horario está dentro del rango permitido
          if (timeSlot > 0 && timeSlot <= maxTimeSlots) {
            // Asignar la actividad al tramo horario correspondiente del día
            switch (timeSlot) {
              case 1:
                updateFields.one = activityId;
                break;
              case 2:
                updateFields.two = activityId;
                break;
              case 3:
                updateFields.three = activityId;
                break;
              case 4:
                updateFields.four = activityId;
                break;
              case 5:
                updateFields.five = activityId;
                break;
              case 6:
                updateFields.six = activityId;
                break;
              case 7:
                updateFields.seven = activityId;
                break;
              case 8:
                updateFields.eight = activityId;
                break;
              default:
                // Manejar caso de tramo no válido
                break;
            }
          }
        }
      }
    }
    try {
      await Day.findByIdAndUpdate(idDay, existingDay);
      const updatedDay = await Day.findById(idDay);
      res.status(200).json(updatedDay);
      const elementUpdate = Object.keys(req.body);
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] === updatedDay[item]) {
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
  } catch (error) {
    next(error);
  }
};
const deleteDay = async (req, res, next) => {
  try {
    const { idDay } = req.params;
    await Day.findByIdAndDelete(idDay);
    if (await Day.findById(idDay)) {
      return res.status(404).json("not deleted");
    } else {
      return res.status(200).json("day deleted");
    }
  } catch (error) {
    return next(error);
  }
};

const getAllDay = async (req,res,next)=>{
  try {
    const days = await Day.find().populate({
    path: "one",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "two",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "three",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "four",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "five",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "six",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "seven",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "eight",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  })
   if (getAllDay.length === 0) {
      return res.status(404).json("dias no encontrados");
    } else return res.status(200).json({ data: days });
  } catch (error) {
    return next(error);
  }

} 

const getByIdDay = async (req,res,next)=>{
  const { id } = req.params;
  try {
    const day = await Day.findById(id).populate({
    path: "one",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "two",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "three",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "four",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "five",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "six",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "seven",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  }).populate({
    path: "eight",
    populate: [
      { path: "monitorId", model: User },
      { path: "activityId", model: Activities  },
    ],
  });
    if (!day) {
      return res.status(404).json({ error: "Día no encontrado" });
    }
    res.status(200).json(day);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la actividad del día" });
  }
}

module.exports = {
  createDay,
  updateDay,
  deleteDay,
  getAllDay,
  getByIdDay,
};

