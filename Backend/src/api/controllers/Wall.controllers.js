//-------------------CREATE CONTROLLER---------------
const Wall = require("../models/Wall.model");
const Day = require("../models/Day.model");
const Message = require('../models/Message.model');
const User = require('../models/User.model');
const { upload, deleteImgCloudinary, configCloudinary } = require("../../middleware/files.middleware");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();


const createWall = async (req, res) => {

  const { type, name, expirationDate, owner, likes, activity, comments, content, days } = req.body;

  try {

    let imageUrl = '';
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

    // Crea un nuevo documento de muro utilizando el modelo Wall y los datos proporcionados
    const nuevoWall = await Wall.create({
      type,
      expirationDate,
      owner,
      likes,
      image: imageUrl,
      activity,
      comments,
      content,
      days,
      name,
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
//--------------------GET BY USER--------------------

const getByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const wallByUser = await Wall.find({ owner: userId });
    if (wallByUser) {
      return res.status(200).json(wallByUser);
    } else {
      return res.status(404).json("Tipo de usuario no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};


//! -----------------------------------------------------------------------------
//? ---------------------------------findByType----------------------------------
//! -----------------------------------------------------------------------------

const getByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const wallByType = await Wall.find({ type });
    if (wallByType) {
      return res.status(200).json(wallByType);
    } else {
      return res.status(404).json("Tipo de Wall no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------findByActivity------------------------------
//! -----------------------------------------------------------------------------

const buscarActivitiesEnWall = async (req, res, next) => {
  try {
    const { wallId } = req.params;

    const wall = await Wall.findById(wallId).populate("activity");

    if (!wall) {
      return res.status(404).json({ mensaje: "Muro no encontrado" });
    }

    const activity = wall.activity;

    if (!activity) {
      return res
        .status(404)
        .json({ mensaje: "Actividad no encontrada en este muro" });
    }

    return res.status(200).json({ muro: wall, actividad: activity });
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------findByDay------------------------------
//! -----------------------------------------------------------------------------

const getByDay = async (req, res, next) => {
  try {
    const { day } = req.params;
    const wallByDay = await Day.findByDay(req.params.day);
    if (wallByDay) {
      return res.status(200).json(wallByDay);
    } else {
      return res.status(404).json("Day de Wall no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------deleteWall----------------------------------
//! -----------------------------------------------------------------------------

const deleteWall = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Wall.findByIdAndDelete(id);
    res.json({ mensaje: "Muro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el muro:", error);
    res.status(500).json({ mensaje: "Hubo un error al eliminar el muro" });
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------deleteWallByExpiration----------------------------
//! -----------------------------------------------------------------------------

const deleteWallByExpiration = async (req, res) => {
  try {
    const currentDate = new Date();
    const paredesVencidas = await Wall.find({
      expirationDate: { $lt: currentDate },
    });
    console.log(paredesVencidas)
    await Promise.all(
      paredesVencidas.map(async (pared) => {
        await Wall.deleteOne({ _id: pared._id });
      })
    );
    res.status(200).json({
      message: `${paredesVencidas.length} paredes vencidas eliminadas.`,
      update: await Wall.find()
    });
  } catch (error) {
    console.error("Error al eliminar las paredes vencidas:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar las paredes vencidas." });
  }
};

//------------------------GET ALL--------------------------

// Controlador para obtener todos los elementos del muro
const getAllWalls = async (req, res) => {
  try {
    // Obtenemos todos los documentos de la colección Wall
    const walls = await Wall.find();

    // Si no hay muros, enviamos un mensaje de respuesta
    if (walls.length === 0) {
      return res.status(404).json({ message: "No walls found" });
    }

    // Si hay muros, los enviamos como respuesta
    res.status(200).json({ walls });
  } catch (error) {
    // Si hay algún error, enviamos un mensaje de error
    console.error("Error getting walls:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//! ------------------------------------------------------------------------
//? ------------------------------GET BY ID---------------------------------
//! ------------------------------------------------------------------------

const getWallById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const wall = await Wall.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'owner',
        select: 'username name', // Selecciona los campos que necesitas
      },
    });
    if (wall) {
      return res.status(200).json(wall);
    } else {
      return res
        .status(404)
        .json({ error: "No se ha encontrado el muro" });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ------------------------------------------------------------------------
//? ------------------------------GET BY NAME---------------------------------
//! ------------------------------------------------------------------------

const getWallByName = async (req, res) => {
  try {
    const wallName = req.params.name;
    const wall = await Wall.findOne({ name: wallName }).populate('owner').populate('likes').populate('activity').populate('comments').populate('days');
    
    if (!wall) {
      return res.status(404).json({ message: 'Wall not found' });
    }

    res.status(200).json(wall);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



//!-----------------------------------------------------------------------------
//? --------------------------- UPDATE WALL ------------------------------------
//! ---------------------------------------------------------------------------

const updateWall = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Encuentra y actualiza el documento del muro por su ID
    const updatedWall = await Wall.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedWall) {
      return res.status(404).json({ message: 'Muro no encontrado' });
    }

    // Devuelve la respuesta con el muro actualizado
    return res.status(200).json({ message: 'Muro actualizado exitosamente', muro: updatedWall });
  } catch (error) {
    // Maneja cualquier error
    console.error('Error al actualizar el muro:', error);
    return res.status(500).json({ error: error.message });
  }
};

const createPublicMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { wallId } = req.params;
    const userId = req.user._id;

    if (!content || !wallId) {
      return res.status(400).json({ error: 'Content and wall ID are required' });
    }

    const wall = await Wall.findById(wallId);
    if (!wall) {
      return res.status(404).json({ error: 'Wall not found' });
    }

    const newMessage = new Message({
      owner: userId,
      content,
      type: 'public',
    });

    const savedMessage = await newMessage.save();

    await Wall.findByIdAndUpdate(wallId, { $push: { comments: savedMessage._id } });
    await User.findByIdAndUpdate(userId, { $push: { postedMessages: savedMessage._id } });

    const updatedWall = await Wall.findById(wallId).populate({
      path: 'comments',
      populate: {
        path: 'owner',
        select: 'username name', // Selecciona los campos que necesitas
      },
    });

    return res.status(200).json({
      wall: updatedWall,
      message: savedMessage
    });
  } catch (error) {
    console.error('Error in createPublicMessage controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createWall,
  getByUser,
  getWallById,
  getByType,
  getByDay,
  buscarActivitiesEnWall,
  deleteWall,
  deleteWallByExpiration,
  getAllWalls,
  getWallByName,
  updateWall,
  createPublicMessage
};
