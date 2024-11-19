const express = require("express");
const WallRoutes = express.Router();
const { isAuth } = require('../../middleware/auth.middleware')
const {
  getByUser,
  createWall,
  getByType,
  buscarActivitiesEnWall,
  getByDay,
  deleteWall,
  deleteWallByExpiration,
  getAllWalls,
  getWallById,
  getWallByName,
  updateWall,
  createPublicMessage

} = require("../controllers/Wall.controllers");
const { isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

// Ruta para crear una nueva entrada en el muro
WallRoutes.post("/createWall", upload.single('image'), [isAuthAdmin], createWall);

// Ruta para obtener muros por usuario
WallRoutes.get("/getByUser/:userId", getByUser);
WallRoutes.get("/findByType/:type", getByType);
WallRoutes.get("/findByActivitie/:wallId/activities", buscarActivitiesEnWall);
WallRoutes.get("/findByDay", getByDay);
WallRoutes.get("/getall", getAllWalls);
WallRoutes.delete("/walls/:id", deleteWall);
WallRoutes.delete("/paredesVencidas", deleteWallByExpiration);
WallRoutes.get('/walls/:id', getWallById);
WallRoutes.get('/wall/:name', getWallByName);
WallRoutes.patch('/walls/:id', updateWall);
WallRoutes.post('/:wallId/messages', [isAuth], createPublicMessage);

module.exports = WallRoutes;
