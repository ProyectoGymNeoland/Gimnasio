const express = require("express");
const MessageRoutes = express.Router();

const{
    createMessage, 
    deleteMessagesByUser, 
    getById,
    toggleLikeWall,
    getMessageById
}= require("../controllers/Message.controllers");
const { isAuth } = require("../../middleware/auth.middleware");


MessageRoutes.post("/:idRecipient", [isAuth], createMessage);
MessageRoutes.delete('/:userId', deleteMessagesByUser);
MessageRoutes.get("/findById/:id", getById);
MessageRoutes.get("/:messageId", getMessageById);
MessageRoutes.patch("/like/:wallId", [isAuth], toggleLikeWall);


module.exports = MessageRoutes;