const Activities = require("../models/Activities.model");
const ActivityToDay = require("../models/ActivityToDay.model");
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const Wall = require("../models/Wall.model");
const User = require("../models/User.model");



//! -----------------------------------------------------------------------------
//? ----------------------------CREATE MESSAGE-----------------------------------
//! -----------------------------------------------------------------------------

// const createMessage = async (req, res, next) => {
//     try {
//       const { type, content } = req.body;
//       const { idRecipient } = req.params; // id de a quien quiero hacer el comentario
//       req.body.owner = req.user._id;

//       const findUser = await User.findById(idRecipient);
  
//       if (findUser) {
//         const newMessage = new Message(req.body);
//         const savedMessage = await newMessage.save();
  
//         if (type == "private") {
//           try {
//             const chatExistOne = await Chat.findOne({
//               userOne: req.user._id, //usuario logado
//               userTwo: findUser._id, //usuario que recibe
//             });
//             const chatExistTwo = await Chat.findOne({
//               userOne: findUser._id,
//               userTwo: req.user._id,
//             });
  
//             /**
//              * si no tengo ningun chat abierto con el otro usuario ambas constantes
//              * serán null
//              *
//              * Si tengo abierto un chat con ese usuario una de las dos constantes tendra valor y la
//              * otra sera null
//              */
  
//             if (chatExistOne != null || chatExistTwo != null) {
//               //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//               // ---------------------------- CHAT EXISTE: TENEMOS QUE ACTUALIZARLO -------------------------------------
//               //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//               ///Si existe un chat, entonces lo actualizamos con el nuevo mensaje
  
//               if (chatExistOne) {
//                 try {
//                   await chatExistOne.updateOne({
//                     // podemos hacer un push 
//                     $push: { messages: newMessage._id },
//                   });
//                   try {
//                     await User.findByIdAndUpdate(req.user._id, {
//                       $push: {
//                         postedMessages: newMessage._id,
//                       },
//                     });
//                     return res.status(200).json({
//                       chat: await Chat.findById(chatExistOne._id).populate(
//                         "messages  userOne  userTwo"
//                       ),
//                       comment: newMessage,
//                     });
//                   } catch (error) {
//                     return res.status(404).json({
//                       error:
//                         "no hemos actualizado el user en la clave postedMessages",
//                       idMessage: newMessage._id,
//                     });
//                   }
//                 } catch (error) {
//                   await Message.findByIdAndDelete(savedMessage._id);
//                   return res
//                     .status(404)
//                     .json(
//                       "error en actualizar el chat existente, elimino el comentario"
//                     );
//                 }
//               } else {
//                 try {
//                   await chatExistTwo.updateOne({
//                     $push: { messages: newMessage._id },
//                   });
//                   try {
//                     await User.findByIdAndUpdate(req.user._id, {
//                       $push: {
//                         postedMessages: newMessage._id,
//                       },
//                     });
//                     return res.status(200).json({
//                       chat: await Chat.findById(chatExistTwo._id).populate(
//                         "messages  userOne  userTwo"
//                       ),
//                       comment: newMessage,
//                     });
//                   } catch (error) {
//                     return res.status(404).json({
//                       error:
//                         "no hemos actualizado el user en la clave postedMessages",
//                       idMessage: newMessage._id,
//                     });
//                   }
//                 } catch (error) {
//                   try {
//                     await Message.findByIdAndDelete(savedMessage._id);
//                     return res
//                       .status(404)
//                       .json(
//                         "error en actualizar el chat existente, elimino el comentario"
//                       );
//                   } catch (error) {
//                     return res
//                       .status(404)
//                       .json(
//                         "no he borrado el coment  ni tampoco he actualizdo el chat existente"
//                       );
//                   }
//                 }
//               }
//             } else {
//               //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//               // ---------------------------- CREAR CHAT PORQUE NO EXISTE NINGUNO ---------------------------------------
//               //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//               /// crear un chat con el mensaje que hemos creado
  
//               const newChat = new Chat({
//                 userOne: req.user._id,
//                 userTwo: findUser._id,
//                 messages: [savedMessage._id],
//               });
//               try {
//                 await newChat.save();
//                 try {
//                   await User.findByIdAndUpdate(req.user._id, {
//                     $push: {
//                       postedMessages: newMessage._id,
//                       chats: newChat._id,
//                     },
//                   });
//                   try {
//                     await User.findByIdAndUpdate(idRecipient, {
//                       $push: {
//                         chats: newChat._id,
//                       },
//                     });
//                     return res.status(200).json({
//                       chat: await Chat.findById(newChat._id).populate(
//                         "messages  userOne  userTwo"
//                       ),
//                       comment: newMessage,
//                     });
//                   } catch (error) {
//                     return res.status(404).json({
//                       error:
//                         "no hemos actualizado el user que recibe el comentario la clave chat",
//                       idMessage: newMessage._id,
//                     });
//                   }
//                 } catch (error) {
//                   return res.status(404).json({
//                     error:
//                       "no hemos actualizado el user el dueño del mensaje en la clave postedMessages y en la clave chats",
//                     idMessage: newMessage._id,
//                   });
//                 }
//               } catch (error) {
//                 // lo borramos porque no nos ha enviado bien el tipo
//                 try {
//                   await Message.findByIdAndDelete(savedMessage._id);
//                   return res.status(404).json(error.message);
//                 } catch (error) {
//                   return res.status(404).json({
//                     error:
//                       "no se ha creado el chat pero no se ha borrado el comentario",
//                     idMensageNoBorrado: savedMessage._id,
//                   });
//                 }
//               }
//             }
//           } catch (error) {
//             return res.status(404).json(error.message);
//           }
//         } else if (type == "public") {
//           try {
//             await User.findByIdAndUpdate(req.user._id, {
//               $push: {
//                 postedMessages: newMessage._id,
//               },
//             });
//             try {
//               await User.findByIdAndUpdate(idRecipient, {
//                 $push: {
//                   commentsPublicByOther: newMessage._id,
//                 },
//               });
//               return res.status(200).json({
//                 userOwner: await User.findById(req.user._id).populate([
//                   {
//                     path: "chats",
//                     model: Chat,
//                     populate: "messages userOne userTwo",
//                   },
//                 ]),
//                 recipient: await User.findById(idRecipient),
//                 comentario: newMessage._id,
//               });
//             } catch (error) {
//               return res.status(404).json({
//                 error:
//                   "error catch update quien recibe el comentario  -  commentsPublicByOther",
//                 message: error.message,
//               });
//             }
//           } catch (error) {
//             return res.status(404).json({
//               error:
//                 "error catch update quien hace el comentario  -  postedMessages",
//               message: error.message,
//             });
//           }
//         } else {
//           return res.status(404).json("no has puesto el tipo correctamente");
//         }
//       } 
//     } catch (error) {
//       return next(error);
//     }
//   };
const createMessage = async (req, res, next) => {
  try {
      const { content } = req.body;
      const { idRecipient } = req.params;
      const userId = req.user._id;

      if (!content || !idRecipient) {
          return res.status(400).json({ error: 'Content and recipient ID are required' });
      }

      const findUser = await User.findById(idRecipient);

      if (!findUser) {
          return res.status(404).json({ error: 'Recipient not found' });
      }

      const newMessage = new Message({
          owner: userId,
          content: content,
          type: 'private'
      });

      const savedMessage = await newMessage.save();

      const chatExistOne = await Chat.findOne({
          userOne: userId,
          userTwo: findUser._id,
      });

      const chatExistTwo = await Chat.findOne({
          userOne: findUser._id,
          userTwo: userId,
      });

      if (chatExistOne || chatExistTwo) {
          const existingChat = chatExistOne || chatExistTwo;
          await existingChat.updateOne({ $push: { messages: savedMessage._id } });

          await User.findByIdAndUpdate(userId, { $push: { postedMessages: savedMessage._id } });

          return res.status(200).json({
              chat: await Chat.findById(existingChat._id).populate('messages userOne userTwo'),
              message: savedMessage
          });
      } else {
          const newChat = new Chat({
              userOne: userId,
              userTwo: findUser._id,
              messages: [savedMessage._id]
          });

          await newChat.save();

          await User.findByIdAndUpdate(userId, {
              $push: { postedMessages: savedMessage._id, chats: newChat._id }
          });

          await User.findByIdAndUpdate(idRecipient, { $push: { chats: newChat._id } });

          return res.status(200).json({
              chat: await Chat.findById(newChat._id).populate('messages userOne userTwo'),
              message: savedMessage
          });
      }
  } catch (error) {
      console.error('Error in createMessage controller:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};
//! -----------------------------------------------------------------------------
//? ----------------------------DELETE MESSAGE POR USUARIO-----------------------
//! -----------------------------------------------------------------------------

const deleteMessagesByUser = async (req, res, next) => {
     const userId = req.params.userId;
    try {
 // Obtener la lista de IDs de los mensajes del usuario
    const user = await User.findById(userId);
    const userMessageIds = user.postedMessages.map(message => message._id);

 // Eliminar mensajes del usuario en el modelo User
    await User.findByIdAndUpdate(userId, { $set: { postedMessages: [] } });

 // Buscar y actualizar los chats para eliminar los mensajes del usuario
    await Chat.updateMany(
        { $or: [{ userOne: userId }, { userTwo: userId }] },
        { $pull: { messages: { $in: userMessageIds } } }
    );

 // Eliminar los documentos de mensaje del usuario
    await Message.deleteMany({ _id: { $in: userMessageIds } });
  
      return res.status(200).json("Mensajes del usuario eliminados exitosamente");
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor", message: error.message });
    }
  };

//! -----------------------------------------------------------------------------
//? ----------------------------GET MESSAGES BY USER----------------------------
//! -----------------------------------------------------------------------------

  const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Buscamos al usuario por su iD y nos traemos los dos tipos de comentarios que hace
      const user = await User.findById(id, 'commentsPublicByOther postedMessages')
        .populate('commentsPublicByOther')
        .populate('postedMessages');
  
      if (!user) {
      //si el usuariio no existe, lanzo error
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Si existe, filtro los mensajes públicos y privados del usuario
      const mensajesPublicos = user.commentsPublicByOther;
      const mensajesPrivados = user.postedMessages;
      
      //los devuelvo con un json ya que está populados
      return res.status(200).json({ mensajesPublicos, mensajesPrivados });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  };
  
//! ----------------------------GET MESSAGE BY ID----------------------------
const getMessageById = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    return res.status(200).json( message );
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor', message: error.message });
  }
};
//! -----------------------------------------------------------------------------
//? ----------------------------TOGGLE LIKE MESSAGE -----------------------------
//! -----------------------------------------------------------------------------


const toggleLikeWall = async (req, res, next) => {
  try {
    const { wallId } = req.params;
    const { _id } = req.user;
    if (req.user.wallLikes?.includes(wallId)) {
      try { 
        await User.findByIdAndUpdate(_id, {
          $pull: { wallLikes: wallId },
        });
        try {
          await Wall.findByIdAndUpdate(wallId, {
            $pull: { likes: _id },
          });
          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("wallLikes"),
            wall: await Wall.findById(wallId).populate("likes"),
          });
          
        } catch (error) {
          return res.status(404).json({
            error: "no update wall - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  wallLikes",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { wallLikes: wallId },
        });
        try {
          await Wall.findByIdAndUpdate(wallId, {
            $push: { likes: _id },
          });
          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("wallLikes"),
            wall: await Wall.findById(wallId).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update wall - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  wallLikes",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

  

module.exports = { 
  deleteMessagesByUser,
  createMessage, 
  getById, 
  toggleLikeWall,
  getMessageById
};