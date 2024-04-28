const express = require("express");
const ChatRoutes = express.Router();
const { isAuth } = require("../../middleware/auth.middleware");
const {
  getChatsByUserId,
  deleteChat,
} = require("../controllers/Chat.controllers");

// Ruta para obtener chats por ID de usuario
ChatRoutes.get("/:userId", isAuth, getChatsByUserId);
ChatRoutes.delete("/:chatId", deleteChat);

module.exports = ChatRoutes;
