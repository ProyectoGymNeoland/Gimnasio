const express = require("express");
const {
  toggleLikeMovie,
  toggleCharacter,
  createMovie,
} = require("../controllers/Movie.controllers");
const { isAuth } = require("../../middleware/auth.middleware");
const MovieRoutes = express.Router();

MovieRoutes.patch("/like/:idMovie", [isAuth], toggleLikeMovie);
MovieRoutes.patch("/addCharacter/:idMovie", [isAuth], toggleCharacter);
MovieRoutes.post("/create", [isAuth], createMovie);

module.exports = MovieRoutes;
