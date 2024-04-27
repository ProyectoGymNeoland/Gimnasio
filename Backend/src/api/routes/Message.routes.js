const express = require("express");
const MessageRoutes = express.Router();

const{createMessage, deleteMessagesByUser}= require("../controllers/Message.controllers")
const { isAuth } = require("../../middleware/auth.middleware");


MessageRoutes.post("/:idRecipient", [isAuth], createMessage);
MessageRoutes.delete('/:chatId/:userId', deleteMessagesByUser);
module.exports = MessageRoutes;