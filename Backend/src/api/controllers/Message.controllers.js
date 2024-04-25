const Character = require("../models/Character.model");
const Chat = require("../models/Chat.model");
const Menssage = require("../models/Message.model");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createMessage = async (req, res, next) => {
  try {
    const { type, content } = req.body;
    const { idRecipient } = req.params; // -----> id de a quien quiero hacer el comentario
    /**
     * idRecipient puede ser el id de : movie, character, user
     */

    const findUser = await User.findById(idRecipient);
    const findCharacter = await Character.findById(idRecipient);
    const findMovie = await Movie.findById(idRecipient);

    /**
     * cuando no lo encuentre devuelve un null y el que encuentre va a devolver el objeto encontrado
     *
     */

    if (findUser) {
      const newMessage = new Menssage(req.body);
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
                      "no hemos actualizado el user en la clave postedMenssages",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                await Menssage.findByIdAndDelete(savedMessage._id);
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
                      "no hemos actualizado el user en la clave postedMenssages",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                try {
                  await Menssage.findByIdAndDelete(savedMessage._id);
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
                    "no hemos actualizado el user el dueño del mensaje en la clave postedMenssages y en la clave chats",
                  idMessage: newMessage._id,
                });
              }
            } catch (error) {
              // lo borramos porque no nos ha enviado bien el tipo
              try {
                await Menssage.findByIdAndDelete(savedMessage._id);
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
    } else if (findCharacter) {
      if (type == "private") {
        return res.status(404).json("no puedes hacer comentarios privados");
      } else {
        try {
          const newMessage = new Menssage(req.body);
          const savedMessage = await newMessage.save();

          try {
            await User.findByIdAndUpdate(req.user._id, {
              $push: {
                postedMessages: newMessage._id,
              },
            });

            try {
              await Character.findByIdAndUpdate(findCharacter._id, {
                $push: { comments: newMessage._id },
              });

              return res.status(200).json({
                userOwner: await User.findById(req.user._id).populate(
                  "postedMessages"
                ),
                character: await Character.findById(findCharacter._id).populate(
                  "comments"
                ),
              });
            } catch (error) {
              return res.status(404).json({
                error: "error catch update character - comments",
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error:
                "error catch update userOwner del comentario  -  postedMessages",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error catch save message",
            message: error.message,
          });
        }
      }
    } else if (findMovie) {
      if (type == "private") {
        return res.status(404).json("no puedes hacer comentarios privados");
      } else {
        try {
          const newMessage = new Menssage(req.body);
          const savedMessage = await newMessage.save();

          try {
            await User.findByIdAndUpdate(req.user._id, {
              $push: {
                postedMessages: newMessage._id,
              },
            });

            try {
              await Movie.findByIdAndUpdate(findMovie._id, {
                $push: { comments: newMessage._id },
              });

              return res.status(200).json({
                userOwner: await User.findById(req.user._id).populate(
                  "postedMessages"
                ),
                Movie: await Movie.findById(findMovie._id).populate("comments"),
              });
            } catch (error) {
              return res.status(404).json({
                error: "error catch update Movie - comments",
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error:
                "error catch update userOwner del comentario  -  postedMessages",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error catch save message",
            message: error.message,
          });
        }
      }
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMessage };
