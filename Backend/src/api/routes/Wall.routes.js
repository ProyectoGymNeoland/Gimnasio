const express = require("express");
const WallRoutes = express.Router();

const { getByUser, createWall } = require("../controllers/Wall.controllers");

// Ruta para crear una nueva entrada en el muro
WallRoutes.post("/createWall", createWall);

// Ruta para obtener muros por usuario
WallRoutes.get("/getByUser/:userId", getByUser);

module.exports = WallRoutes;
