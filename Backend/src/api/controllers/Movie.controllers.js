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

const createMovie = async (req, res, next) => {
  try {
    await Movie.syncIndexes();

    /** hacemos una instancia del modelo  */
    const customBody = {
      name: req.body?.name,
      year: req.body?.year,
    };
    const newMovie = new Movie(customBody);
    const savedMovie = await newMovie.save();

    // test en el runtime
    return res
      .status(savedMovie ? 200 : 404)
      .json(savedMovie ? savedMovie : "error al crear la movie");
  } catch (error) {
    return res.status(404).json({
      error: "error catch create movie",
      message: error.message,
    });
  }
};

const toggleLikeMovie = async (req, res, next) => {
  try {
    const { idMovie } = req.params;
    // vamos a tener el middleware de auth por lo cual se crea req.user
    const { _id } = req.user;

    if (req.user.moviesFav.includes(idMovie)) {
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { moviesFav: idMovie },
        });

        try {
          await Movie.findByIdAndUpdate(idMovie, {
            $pull: { likes: _id },
          });

          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("moviesFav"),
            movie: await Movie.findById(idMovie).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update movie - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  moviesFav",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { moviesFav: idMovie },
        });

        try {
          await Movie.findByIdAndUpdate(idMovie, {
            $push: { likes: _id },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("moviesFav"),
            movie: await Movie.findById(idMovie).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update movie - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  moviesFav",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? ----------------------------add o delete un character  --------------
//! ---------------------------------------------------------------------
/// aqui metemos los personajes en el array del modelo de movie
const toggleCharacter = async (req, res, next) => {
  try {
    /** estee id es el id de la moviee que queremos actualizar */
    const { idMovie } = req.params;
    const { characters } = req.body; // -----> idDeLosCharacter enviaremos esto por el req.body "12412242253,12535222232,12523266346"
    /** Buscamos la pelicula por id para saber si existe */

    /** Buscamos la pelicula por id para saber si existe */
    const movieById = await Movie.findById(idMovie);

    if (movieById) {
      /** cageemos el string que traemos del body y lo convertimos en un array
       * separando las posiciones donde en el string habia una coma
       * se hace mediante el metodo del split
       */

      const arrayIdCharacters = characters.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos quee:
       * 1) ----> sacar eel character si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */

      Promise.all(
        arrayIdCharacters.map(async (character, index) => {
          if (movieById.characters.includes(character)) {
            //*************************************************************************** */

            //________ BORRAR DEL ARRAY DE PERSONAJES EL PEERSONAJE DENTRO DE LA MOVIE___

            //*************************************************************************** */

            try {
              await Movie.findByIdAndUpdate(idMovie, {
                // dentro de la clavee characters me vas a sacar el id del elemento que estoy recorriendo
                $pull: { characters: character },
              });

              try {
                await Character.findByIdAndUpdate(character, {
                  $pull: { movies: idMovie },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update character",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update movie",
                message: error.message,
              }) && next(error);
            }
          } else {
            //*************************************************************************** */
            //________ METER EL PERSONAJE EN EL ARRAY DE PERSONAJES DE LA MOVIE_____________
            //*************************************************************************** */
            /** si no lo incluye lo tenemos que meter -------> $push */

            try {
              await Movie.findByIdAndUpdate(idMovie, {
                $push: { characters: character },
              });
              try {
                await Character.findByIdAndUpdate(character, {
                  $push: { movies: idMovie },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update character",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update movie",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Movie.findById(idMovie).populate("characters"),
          });
        });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { toggleLikeMovie, toggleCharacter, createMovie };
