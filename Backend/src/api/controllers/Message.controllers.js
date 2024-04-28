const Activities = require("../models/Activities.model");
const ActivityToDay = require("../models/ActivityToDay.model");
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const Wall = require("../models/Wall.model");
const User = require("../models/User.model");



//! -----------------------------------------------------------------------------
//? ----------------------------CREATE MESSAGE-----------------------------------
//! -----------------------------------------------------------------------------

const createMessage = async (req, res, next) => {
    try {
      const { type, content } = req.body;
      const { idRecipient } = req.params; // id de a quien quiero hacer el comentario
  
      const findUser = await User.findById(idRecipient);
  
      if (findUser) {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
  
        if (type == "private") {
          try {
            const chatExistOne = await Chat.findOne({
              userOne: req.user._id, //usuario logado
              userTwo: findUser._id, //usuario que recibe
            });
            const chatExistTwo = await Chat.findOne({
              userOne: findUser._id,
              userTwo: req.user._id,
            });
  
            /**
             * si no tengo ningun chat abierto con el otro usuario ambas constantes
             * serán null
             *
             * Si tengo abierto un chat con ese usuario una de las dos constantes tendra valor y la
             * otra sera null
             */
  
            if (chatExistOne != null || chatExistTwo != null) {
              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              // ---------------------------- CHAT EXISTE: TENEMOS QUE ACTUALIZARLO -------------------------------------
              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              ///Si existe un chat, entonces lo actualizamos con el nuevo mensaje
  
              if (chatExistOne) {
                try {
                  await chatExistOne.updateOne({
                    // podemos hacer un push 
                    $push: { messages: newMessage._id },
                  });
                  try {
                    await User.findByIdAndUpdate(req.user._id, {
                      $push: {
                        postedMessages: newMessage._id,
                      },
                    });
                    return res.status(200).json({
                      chat: await Chat.findById(chatExistOne._id).populate(
                        "messages  userOne  userTwo"
                      ),
                      comment: newMessage,
                    });
                  } catch (error) {
                    return res.status(404).json({
                      error:
                        "no hemos actualizado el user en la clave postedMessages",
                      idMessage: newMessage._id,
                    });
                  }
                } catch (error) {
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                }
              } else {
                try {
                  await chatExistTwo.updateOne({
                    $push: { messages: newMessage._id },
                  });
                  try {
                    await User.findByIdAndUpdate(req.user._id, {
                      $push: {
                        postedMessages: newMessage._id,
                      },
                    });
                    return res.status(200).json({
                      chat: await Chat.findById(chatExistTwo._id).populate(
                        "messages  userOne  userTwo"
                      ),
                      comment: newMessage,
                    });
                  } catch (error) {
                    return res.status(404).json({
                      error:
                        "no hemos actualizado el user en la clave postedMessages",
                      idMessage: newMessage._id,
                    });
                  }
                } catch (error) {
                  try {
                    await Message.findByIdAndDelete(savedMessage._id);
                    return res
                      .status(404)
                      .json(
                        "error en actualizar el chat existente, elimino el comentario"
                      );
                  } catch (error) {
                    return res
                      .status(404)
                      .json(
                        "no he borrado el coment  ni tampoco he actualizdo el chat existente"
                      );
                  }
                }
              }
            } else {
              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              // ---------------------------- CREAR CHAT PORQUE NO EXISTE NINGUNO ---------------------------------------
              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              /// crear un chat con el mensaje que hemos creado
  
              const newChat = new Chat({
                userOne: req.user._id,
                userTwo: findUser._id,
                messages: [savedMessage._id],
              });
              try {
                await newChat.save();
                try {
                  await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                      postedMessages: newMessage._id,
                      chats: newChat._id,
                    },
                  });
                  try {
                    await User.findByIdAndUpdate(idRecipient, {
                      $push: {
                        chats: newChat._id,
                      },
                    });
                    return res.status(200).json({
                      chat: await Chat.findById(newChat._id).populate(
                        "messages  userOne  userTwo"
                      ),
                      comment: newMessage,
                    });
                  } catch (error) {
                    return res.status(404).json({
                      error:
                        "no hemos actualizado el user que recibe el comentario la clave chat",
                      idMessage: newMessage._id,
                    });
                  }
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user el dueño del mensaje en la clave postedMessages y en la clave chats",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                // lo borramos porque no nos ha enviado bien el tipo
                try {
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res.status(404).json(error.message);
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no se ha creado el chat pero no se ha borrado el comentario",
                    idMensageNoBorrado: savedMessage._id,
                  });
                }
              }
            }
          } catch (error) {
            return res.status(404).json(error.message);
          }
        } else if (type == "public") {
          try {
            await User.findByIdAndUpdate(req.user._id, {
              $push: {
                postedMessages: newMessage._id,
              },
            });
            try {
              await User.findByIdAndUpdate(idRecipient, {
                $push: {
                  commentsPublicByOther: newMessage._id,
                },
              });
              return res.status(200).json({
                userOwner: await User.findById(req.user._id).populate([
                  {
                    path: "chats",
                    model: Chat,
                    populate: "messages userOne userTwo",
                  },
                ]),
                recipient: await User.findById(idRecipient),
                comentario: newMessage._id,
              });
            } catch (error) {
              return res.status(404).json({
                error:
                  "error catch update quien recibe el comentario  -  commentsPublicByOther",
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error:
                "error catch update quien hace el comentario  -  postedMessages",
              message: error.message,
            });
          }
        } else {
          return res.status(404).json("no has puesto el tipo correctamente");
        }
      } 
    } catch (error) {
      return next(error);
    }
  };

//! -----------------------------------------------------------------------------
//? ----------------------------DELETE MESSAGE POR USUARIO-----------------------
//! -----------------------------------------------------------------------------

  const deleteMessagesByUser = async (req, res, next) => {
    try {
      const { chatId, userId } = req.params;
  
      // Encontrar el chat por su iD
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat no encontrado" });
      }
  
      // Filtrar los mensajes del usuario en el chat
      const messagesToDelete = chat.messages.filter(message => message.userId === userId);
  
      // Eliminar los mensajes del usuario del array de mensajes del chat
      chat.messages = chat.messages.filter(message => message.userId !== userId);
  
      // Guardar el chat actualizado
      await chat.save();
  
      // Eliminar los mensajes del usuario de la colección de mensajes
      await Chat.deleteMany({ _id: { $in: messagesToDelete } });
  
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
  

//! -----------------------------------------------------------------------------
//? ----------------------------TOGGLE LIKE MESSAGE -----------------------------
//! -----------------------------------------------------------------------------


  const toggleLikeMuro = async (req, res, next) => {
    try {
    //meto el Id del muro en los params
      const { wallId } = req.params;
      // vamos a tener el middleware de auth por lo cual se crea req.user
      const { _id } = req.user;
    // si en los likes del user está el iD del muro que buscamos, continúo..
      if (req.user.murosLikes.includes(wallId)) {
        try { 
        //actualizo los likes del muro y del user a disliked
          await User.findByIdAndUpdate(_id, {
            $pull: { murosLikes: wallId },
          });
          try {
            await Wall.findByIdAndUpdate(wallId, {
              $pull: { likes: _id },
            });
            //populamos la respuesta
            return res.status(200).json({
              action: "disliked",
              user: await User.findById(_id).populate("murosLikes"),
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
            error: "no update user-  murosLikes",
            message: error.message,
          });
        }
      } else {
      //si el id del muro no esta en el user, tenemos que añadirlo para crewar el like
        try {
          await User.findByIdAndUpdate(_id, {
            $push: { murosLikes: wallId },
          });
          try {
            await Wall.findByIdAndUpdate(wallId, {
              $push: { likes: _id },
            });
          // populamos la respuesta
            return res.status(200).json({
              action: "like",
              user: await User.findById(_id).populate("murosLikes"),
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
            error: "no update user-  murosLikes",
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
  toggleLikeMuro 
};