const express = require("express");
const WallRoutes = express.Router();

const {
  getByUser,
  createWall,
  getByType,
  buscarActivitiesEnWall,
  getByDay,
  deleteWall,
  deleteWallByExpiration,
} = require("../controllers/Wall.controllers");
const { isAuthAdmin } = require("../../middleware/auth.middleware");

// Ruta para crear una nueva entrada en el muro
WallRoutes.post("/createWall", [isAuthAdmin], createWall);

// Ruta para obtener muros por usuario
WallRoutes.get("/getByUser/:userId", getByUser);
WallRoutes.get("/findByType/:type", getByType);
WallRoutes.get("/findByActivitie/:wallId/activities", buscarActivitiesEnWall);
WallRoutes.get("/findByDay", getByDay);
WallRoutes.delete("/walls/:id", deleteWall);
WallRoutes.delete("/paredesVencidas", deleteWallByExpiration);

module.exports = WallRoutes;
