const Chat = require("../models/Chat.model");
const User = require("../models/User.model");
const { isAuthAdmin } = require("../../middleware/auth.middleware");

// Controlador para buscar chats por ID de usuario
const getChatsByUserId = async (req, res) => {
  const { userId } = req.params; // Suponiendo que estás pasando el ID de usuario como parámetro en la URL
  try {
    // Buscar chats donde el usuario sea userOne o userTwo
    const chats = await Chat.find({
      $or: [{ userOne: userId }, { userTwo: userId }],
    })
      .populate("messages")
      .populate("userOne")
      .populate("userTwo");
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChatsByUserId,
};
