const Activities = require("../models/Activities.model");
const ActivityToDay = require("../models/ActivityToDay.model");
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const Wall = require("../models/Wall.model");
const User = require("../models/User.model");

const createMessage = async (req, res, next) => {
    try {
      const { type, content } = req.body;
      const { idRecipient } = req.params; // -----> id de a quien quiero hacer el comentario
      /**
       * idRecipient puede ser el id de : movie, character, user
       */
  
      const findUser = await User.findById(idRecipient);
      // const findMonitor = await User.findById(idRecipient);
    
  
      /**
       * cuando no lo encuentre devuelve un null y el que encuentre va a devolver el objeto encontrado
       *
       */
  
      if (findUser) {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
  
        if (type == "private") {
          try {
            const chatExistOne = await Chat.findOne({
              userOne: req.user._id,
              userTwo: findUser._id,
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
              ///&/ existe un chat y entonces lo actualizamos conm el nuevo mensaje
  
              if (chatExistOne) {
                try {
                  await chatExistOne.updateOne({
                    /** podemos hacer un push */
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
              /// crear un chat con el comentario que hemos creado
  
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

  const deleteMessagesByUser = async (req, res, next) => {
    try {
      const { chatId, userId } = req.params;
  
      // Encontrar el chat por su ID
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

  const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Buscamos al usuario por su ID y nos traemos los dos tipos de comentarios que hace
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
  

//   const deleteCharacter = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const character = await Character.findByIdAndDelete(id);
//       if (character) {
//         // lo buscamos para vr si sigue existiendo o no
//         const finByIdCharacter = await Character.findById(id);
  
//         try {
//           const test = await Movie.updateMany(
//             { characters: id },
//             { $pull: { characters: id } }
//           );
//           console.log(test);
  
//           try {
//             await User.updateMany(
//               { charactersFav: id },
//               { $pull: { charactersFav: id } }
//             );
  
//             return res.status(finByIdCharacter ? 404 : 200).json({
//               deleteTest: finByIdCharacter ? false : true,
//             });
//           } catch (error) {
//             return res.status(404).json({
//               error: "error catch update User",
//               message: error.message,
//             });
//           }
//         } catch (error) {
//           return res.status(404).json({
//             error: "error catch update Movie",
//             message: error.message,
//           });
//         }
//       }
//     } catch (error) {
//       return res.status(404).json(error.message);
//     }
//   };

 
 
//  const update = async (req, res, next) => {
//     let catchImg = req.file?.path;
//     try {
//       await Character.syncIndexes();
//       const { id } = req.params;
//       const characterById = await Character.findById(id);
//       if (characterById) {
//         const oldImg = characterById.image;
  
//         const customBody = {
//           _id: characterById._id,
//           image: req.file?.path ? catchImg : oldImg,
//           name: req.body?.name ? req.body?.name : characterById.name,
//         };
  
//         if (req.body?.gender) {
//           const resultEnum = enumOk(req.body?.gender);
//           customBody.gender = resultEnum.check
//             ? req.body?.gender
//             : characterById.gender;
//         }
  
//         try {
//           await Character.findByIdAndUpdate(id, customBody);
//           if (req.file?.path) {
//             deleteImgCloudinary(oldImg);
//           }
  
//           //** ------------------------------------------------------------------- */
//           //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
//           //** ------------------------------------------------------------------- */
  
//           // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID
  
//           const characterByIdUpdate = await Character.findById(id);
  
//           // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
//           const elementUpdate = Object.keys(req.body);
  
//           /** vamos a hacer un objeto vacion donde meteremos los test */
  
//           let test = {};
  
//           /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */
  
//           elementUpdate.forEach((item) => {
//             if (req.body[item] === characterByIdUpdate[item]) {
//               test[item] = true;
//             } else {
//               test[item] = false;
//             }
//           });
  
//           if (catchImg) {
//             characterByIdUpdate.image === catchImg
//               ? (test = { ...test, file: true })
//               : (test = { ...test, file: false });
//           }
  
//           /** vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
//            * si no hay ningun false entonces lanzamos un 200 porque todo esta correcte
//            */
  
//           let acc = 0;
//           for (clave in test) {
//             test[clave] == false && acc++;
//           }
  
//           if (acc > 0) {
//             return res.status(404).json({
//               dataTest: test,
//               update: false,
//             });
//           } else {
//             return res.status(200).json({
//               dataTest: test,
//               update: true,
//             });
//           }
//         } catch (error) {
//           return res.status(404).json(error.message);
//         }
//       } else {
//         return res.status(404).json("este character no existe");
//       }
//     } catch (error) {
//       return res.status(404).json(error.message);
//     }
//   };




// const toggleLikeMuro = async (req, res, next) => {
//   try {
//     const { wallId } = req.params;
//     // vamos a tener el middleware de auth por lo cual se crea req.user
//     const { _id } = req.user;

//     if (req.user.murosLikes.includes(wallId)) {
//       try {
//         await User.findByIdAndUpdate(_id, {
//           $pull: { murosLikes: wallId },
//         });

//         try {
//           await Wall.findByIdAndUpdate(wallId, {
//             $pull: { likes: _id },
//           });

//           return res.status(200).json({
//             action: "disliked",
//             user: await User.findById(_id).populate("murosLikes"),
//             wall: await Wall.findById(wallId).populate("likes"),
//           });
//         } catch (error) {
//           return res.status(404).json({
//             error: "no update wall - likes",
//             message: error.message,
//           });
//         }
//       } catch (error) {
//         return res.status(404).json({
//           error: "no update user-  murosLikes",
//           message: error.message,
//         });
//       }
//     } else {
//       try {
//         await User.findByIdAndUpdate(_id, {
//           $push: { murosLikes: wallId },
//         });

//         try {
//           await Wall.findByIdAndUpdate(wallId, {
//             $push: { likes: _id },
//           });

//           return res.status(200).json({
//             action: "like",
//             user: await User.findById(_id).populate("murosLikes"),
//             wall: await Wall.findById(wallId).populate("likes"),
//           });
//         } catch (error) {
//           return res.status(404).json({
//             error: "no update wall - likes",
//             message: error.message,
//           });
//         }
//       } catch (error) {
//         return res.status(404).json({
//           error: "no update user-  murosLikes",
//           message: error.message,
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(404).json(error.message);
//   }
// };

module.exports = { deleteMessagesByUser,createMessage, getById };