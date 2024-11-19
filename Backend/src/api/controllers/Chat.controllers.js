const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const User = require("../models/User.model");
const { isAuthAdmin, isAuth } = require("../../middleware/auth.middleware");

const getChatsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Buscar chats donde el usuario sea userOne o userTwo
    const chats = await Chat.find({
      $or: [{ userOne: userId }, { userTwo: userId }],
    })
      .populate("messages")
      .populate("userOne")
      .populate("userTwo");

    // Si no se encontraron chats para el usuario, retornar un mensaje informativo
    if (chats.length === 0) {
      return res.status(404).json({ message: "No se encontraron chats para el usuario." });
    }

    res.json(chats);
  } catch (error) {
    console.error('Error al obtener chats:', error);
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
//! -----------------------------------------------------------------------------
//? ---------------------------------Gat Chat By Id----------------------------------
//! -----------------------------------------------------------------------------
const getChatById = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId)
      .populate('userOne', 'name')
      .populate('userTwo', 'name')
      .populate('messages.sender', 'name');

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error al obtener el chat por ID:', error);
    res.status(500).json({ message: 'Error al obtener el chat' });
  }
};

const updateChat = async (req, res) => {
  const { chatId } = req.params;
  const { messageId } = req.body;

  try {
    // Encontrar el chat por su ID
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    // Agregar el nuevo mensaje a la lista de mensajes
    chat.messages.push(messageId);

    // Guardar el chat actualizado
    await chat.save();
 // Popula los mensajes para devolver el chat con los mensajes completos
    await chat.populate('messages').execPopulate();
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el chat', error });
  }
};

module.exports = {
  getChatsByUserId,
  deleteChat,
  getChatById,
  updateChat
};

