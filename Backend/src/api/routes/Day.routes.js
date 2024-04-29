const express = require("express");
const DayRoutes = express.Router();
const { isAuthSuper } = require("../../middleware/auth.middleware");
const {
  createDay,
  updateDay,
  deleteDay,
} = require("../controllers/Day.controllers");

DayRoutes.post("/createDay", createDay);
DayRoutes.patch("/update/:idDay", [isAuthSuper], updateDay);
DayRoutes.delete("/:idDay", [isAuthSuper], deleteDay);

module.exports = DayRoutes;
