const express = require("express");
const DayRoutes = express.Router();
const { isAuthSuper } = require("../../middleware/auth.middleware");
const {
  createDay,
  updateDay,
  deleteDay,
  getAllDay,
  getByIdDay,
} = require("../controllers/Day.controllers");

DayRoutes.post("/createDay",[isAuthSuper],createDay);
DayRoutes.patch("/update/:idDay", [isAuthSuper], updateDay);
DayRoutes.delete("/:idDay", [isAuthSuper], deleteDay);
DayRoutes.get("/getAll",getAllDay);
DayRoutes.get("/getById/:id", getByIdDay);

module.exports = DayRoutes;
