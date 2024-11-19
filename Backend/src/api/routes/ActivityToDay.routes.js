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
  getBookingsByUser,
  createDayActivity,
} = require("../controllers/ActivityToDay.controllers");

ActivityToDayRoutes.post(
  "/createActivityToDay",
  [isAuthSuper],
  createActivityToDay
);
ActivityToDayRoutes.get("/", getAllActivitiesToDay);
ActivityToDayRoutes.get("/findById/:id", getActivityToDayById);
ActivityToDayRoutes.patch(
  "/:idActivityToDay",
  [isAuthSuper],
  updateActivityToDay
);
ActivityToDayRoutes.patch("/booking/:idActivityToDay", [isAuth], toggleBooking);
ActivityToDayRoutes.delete("/:id", [isAuthSuper], deleteActivityToDay);
ActivityToDayRoutes.get("/bookedActivities/:userId",getBookingsByUser);
ActivityToDayRoutes.post("/createDayActivity",[isAuthSuper],createDayActivity);
module.exports = ActivityToDayRoutes;
