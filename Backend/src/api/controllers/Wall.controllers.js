//-------------------CREATE CONTROLLER---------------

const mongoose = require("mongoose");
const multer = require("multer");
const Wall = require("../models/Wall.model");
const User = require("../models/User.model");
const Message = require("../models/Message.model");

const upload = multer().none();

const createWall = async (req, res) => {
  // Extrae los datos necesarios del cuerpo de la solicitud (req.body) o de donde corresponda
  const { type, expirationDate, owner, likes, image, activity, comments } =
    req.body;

  try {
    // Crea un nuevo documento de muro utilizando el modelo Wall y los datos proporcionados
    const nuevoWall = await Wall.create({
      type,
      expirationDate,
      owner,
      likes,
      image,
      activity,
      comments,
    });

    // Devuelve una respuesta con el nuevo muro creado
    return res
      .status(201)
      .json({ mensaje: "Muro creado exitosamente", muro: nuevoWall });
  } catch (error) {
    // Maneja cualquier error
    console.error("Error al crear el muro:", error);
    return res.status(500).json({ error: error.message });
  }
};

// const createWallEntry = async (req, res) => {
//   try {
//     // Analizar los datos del formulario multiparte
//     upload(req, res, async function (err) {
//       if (err) {
//         return res
//           .status(400)
//           .json({ error: "Error al procesar los datos del formulario" });
//       }

//       // Obtener los datos del formulario
//       const { type, expirationDate, owner, activity, comments } = req.body;

//       // Convertir los valores de owner y activity a ObjectId
//       const ownerId = new mongoose.Types.ObjectId(owner);
//       const activityId = new mongoose.Types.ObjectId(activity);

//       // Convertir los valores de comments a un array de ObjectId
//       const commentsIds = comments.map((comment) =>
//         mongoose.Types.ObjectId(comment)
//       );

//       // Crear un nuevo documento Wall con los datos del formulario
//       const newWallEntry = new Wall({
//         type,
//         expirationDate,
//         owner: ownerId,
//         activity: activityId,
//         comments: commentsIds,
//       });

//       // Guardar el nuevo muro en la base de datos
//       const savedWall = await newWallEntry.save();

//       res.status(201).json(savedWall);
//     });
//   } catch (error) {
//     console.error("Error creating wall entry:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };
//--------------------GET BY USER--------------------

const getByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const wallByUser = await Wall.findByUser(userId);
    if (wallByUser) {
      return res.status(200).json(wallByUser);
    } else {
      return res.status(404).json("Tipo de usuario no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createWall,
  getByUser,
};
