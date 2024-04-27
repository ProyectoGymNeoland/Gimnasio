const express = require("express");
const WallRoutes = express.Router();

const {
  getByUser,
  createWall,
  getByType,
  buscarActivitiesEnWall,
  getByDay,
} = require("../controllers/Wall.controllers");

// Ruta para crear una nueva entrada en el muro
WallRoutes.post("/createWall", createWall);

// Ruta para obtener muros por usuario
WallRoutes.get("/getByUser/:userId", getByUser);
WallRoutes.get("/findByType/:type", getByType);
WallRoutes.get("/findByActivitie/:wallId/activities", buscarActivitiesEnWall);
WallRoutes.get("/findByDay", getByDay);

module.exports = WallRoutes;
