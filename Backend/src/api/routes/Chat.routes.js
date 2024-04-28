const express = require("express");
const ChatRoutes = express.Router();
const { isAuth } = require("../../middleware/auth.middleware");
const { getChatsByUserId } = require("../controllers/Chat.controllers");

// Ruta para obtener chats por ID de usuario
ChatRoutes.get("/:userId", isAuth, getChatsByUserId);

module.exports = ChatRoutes;
