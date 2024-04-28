const express = require("express");
const ActivityToDayRoutes = express.Router();

const { isAuthSuper, isAuth } = require("../../middleware/auth.middleware");
const {
  createActivityToDay,
  getAllActivitiesToDay,
  getActivityToDayById,
  toggleBooking,
  updateActivityToDay,
  deleteActivityToDay,
} = require("../controllers/ActivityToDay.controllers");

ActivityToDayRoutes.post(
  "/createActivityToDay",
  [isAuthSuper],
  createActivityToDay
);
ActivityToDayRoutes.get("/", getAllActivitiesToDay);
ActivityToDayRoutes.get("/findById/:id", getActivityToDayById);
ActivityToDayRoutes.patch("/:idActivityToDay", updateActivityToDay);
ActivityToDayRoutes.patch("/booking/:idActivityToDay", [isAuth], toggleBooking);
ActivityToDayRoutes.delete("/:id", [isAuthSuper], deleteActivityToDay);
module.exports = ActivityToDayRoutes;
