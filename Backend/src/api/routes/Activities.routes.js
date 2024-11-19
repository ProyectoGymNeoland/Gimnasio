const express = require("express");
const { isAuth, isAuthSuper } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

const {
  createActivity,
  toggleStatus,
  getAll,
  getById,
  getByName,
  getByType,
  update,
  toggleLikeActivity,
  deleteActivity,
} = require("../controllers/Activities.controllers");
const ActivitiesRoutes = express.Router();

// Defino la ruta para crear una nueva actividad
ActivitiesRoutes.post(
  "/create",
  [isAuthSuper],
  upload.single("image"),
  createActivity
);

ActivitiesRoutes.patch(
  "/toggleStatus/:idActivity",
  [isAuthSuper],
  toggleStatus
);

ActivitiesRoutes.get("/getAll", getAll);
ActivitiesRoutes.get("/:id", getById);
ActivitiesRoutes.get("/name/:name", getByName);
ActivitiesRoutes.get("/type/:type", [isAuth], getByType);
ActivitiesRoutes.put("/:id", [isAuth], upload.single("image"), update);
ActivitiesRoutes.patch("/like/:id", [isAuth], toggleLikeActivity);
ActivitiesRoutes.delete("/:id", [isAuthSuper], deleteActivity);

module.exports = ActivitiesRoutes;
