const express = require("express");
const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  create,
  getById,
  getAll,
  getByName,
  update,
  deleteCharacter,
  toggleLikeCharacter,
} = require("../controllers/Character.controllers");
const CharacterRoutes = express.Router();

CharacterRoutes.post("/create", [isAuth], upload.single("image"), create);
CharacterRoutes.get("/getAll", getAll);
CharacterRoutes.get("/get/name/:name", getByName);
CharacterRoutes.get("/get/id/:id", getById);
CharacterRoutes.patch("/:id", [isAuth], upload.single("image"), update);
CharacterRoutes.delete("/:id", [isAuth], deleteCharacter);
CharacterRoutes.patch("/like/:idCharacter", [isAuth], toggleLikeCharacter);
module.exports = CharacterRoutes;
