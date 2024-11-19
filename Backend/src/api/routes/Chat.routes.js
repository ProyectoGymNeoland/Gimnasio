const express = require("express");
const ChatRoutes = express.Router();
const { isAuth } = require("../../middleware/auth.middleware");
const {
  getChatsByUserId,
  deleteChat,
  getChatById, 
  updateChat
} = require("../controllers/Chat.controllers");
// Ruta para obtener chats por ID de usuario
ChatRoutes.get("/:userId", isAuth, getChatsByUserId);
ChatRoutes.delete("/:chatId", deleteChat);
ChatRoutes.get('/detail/:chatId', isAuth, getChatById);
ChatRoutes.put('/chats/:chatId', updateChat);

module.exports = ChatRoutes;
