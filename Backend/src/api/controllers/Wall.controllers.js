//-------------------CREATE CONTROLLER---------------

const mongoose = require("mongoose");
const multer = require("multer");
const Wall = require("../models/Wall.model");
const Day = require("../models/Day.model");
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

//! -----------------------------------------------------------------------------
//? ---------------------------------findByType----------------------------------
//! -----------------------------------------------------------------------------

const getByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const wallByType = await Wall.findByType(req.params.type);
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

module.exports = {
  createWall,
  getByUser,
  getByType,
  getByDay,
  buscarActivitiesEnWall,
};
