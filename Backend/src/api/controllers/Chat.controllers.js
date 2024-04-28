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

//! -----------------------------------------------------------------------------
//? ---------------------------------deleteChat----------------------------------
//! -----------------------------------------------------------------------------

const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({ error: "El chat no existe." });
    }

    res.status(200).json({ message: "Chat eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el chat:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el chat." });
  }
};

module.exports = {
  getChatsByUserId,
  deleteChat,
};
