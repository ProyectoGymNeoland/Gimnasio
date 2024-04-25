const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const enumOk = require("../../utils/enumOk");
const Character = require("../models/Character.model");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

//CRUD ---> CREATE (post) , READ (get), UPDATE (put, patch), DELETE (delete)
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const create = async (req, res, next) => {
  /// vamos a capturar la url dde la imagen que se sube a cloudinary
  /* lo hacemos porque si hay en error como la imagen see sube antes de meternos al controlador
    si hay un error en el controlador, una vez dentro, el elemento no se crea y por ende
    tenmos que borrar la imagen en cloudinary */

  /** El optional chaining se pone porque la imagen no es obligatoria por lo cual
   * puede ser que no tengamos req.file.path
   */
  let catchImg = req.file?.path;
  try {
    //! -----> ACTUALIZAR INDEXES
    /** los indexes se forman cuando una clave del objeto es unique, se puede ver en la
     * parte de mongo que esta al lado de find
     *
     * Esto es importante porque puede que haya modificado el modelo posteriormente a la
     * creacion del controlador
     */

    await Character.syncIndexes();
    //! ------> INSTANCIAR UN NUEVO CHARACTER
    /** vamos a instanciar un nuevo character y le metemos como info incial lo que recibimos
     * por la req.body
     */
    const newCharacter = new Character(req.body);

    //! -------> VALORAR SI HEMOS RECIBIDO UNA IMAGEN O NO
    /** Si recibimos la imagen tenemos que meter la url en el objeto creado arriba con la
     * nueva instancia del Character
     */

    if (req.file) {
      newCharacter.image = catchImg;
    } else {
      newCharacter.image =
        "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
    }

    try {
      //! ------------> VAMOS A GUARDAR LA INSTANCIA DEL NUEVO CHARACTER
      const saveCharacter = await newCharacter.save();
      if (saveCharacter) {
        /** Si existe vamos a enviar un 200 como que todo esta ok y le enviamos con un json
         * el objeto creado
         */

        return res.status(200).json(saveCharacter);
      } else {
        return res
          .status(404)
          .json("No se ha podido guardar el elemento en la DB ❌");
      }
    } catch (error) {
      return res.status(404).json("error general saved character");
    }
  } catch (error) {
    //! -----> solo entramos aqui en el catch cuando ha habido un error
    /** SI HA HABIDO UN ERROR -----
     * Tenemos que borrar la imagen en cloudinary porque se sube antes de que nos metamos en
     * el controlador---> porque es un middleware que esta entre la peticion del cliente y el controlador
     */

    req.file?.path && deleteImgCloudinary(catchImg);

    return (
      res.status(404).json({
        messege: "error en el creado del elemento",
        error: error.message,
      }) && next(error)
    );
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by id --------------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterById = await Character.findById(id);
    if (characterById) {
      return res.status(200).json(characterById);
    } else {
      return res.status(404).json("no se ha encontrado el character");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
//! ---------------------------------------------------------------------
//? -------------------------------get all ------------------------------
//! ---------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allCharacter = await Character.find().populate("movies");
    /** el find nos devuelve un array */
    if (allCharacter.length > 0) {
      return res.status(200).json(allCharacter);
    } else {
      return res.status(404).json("no se han encontrado characters");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by name --------------------------
//! ---------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    /// nos devuelve un array de elementos
    const characterByName = await Character.find({ name });
    if (characterByName.length > 0) {
      return res.status(200).json(characterByName);
    } else {
      return res.status(404).json("no se ha encontrado");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar por nombre capturado en el catch",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE -------------------------------
//! ---------------------------------------------------------------------

const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Character.syncIndexes();
    const { id } = req.params;
    const characterById = await Character.findById(id);
    if (characterById) {
      const oldImg = characterById.image;

      const customBody = {
        _id: characterById._id,
        image: req.file?.path ? catchImg : oldImg,
        name: req.body?.name ? req.body?.name : characterById.name,
      };

      if (req.body?.gender) {
        const resultEnum = enumOk(req.body?.gender);
        customBody.gender = resultEnum.check
          ? req.body?.gender
          : characterById.gender;
      }

      try {
        await Character.findByIdAndUpdate(id, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //** ------------------------------------------------------------------- */
        //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
        //** ------------------------------------------------------------------- */

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

        const characterByIdUpdate = await Character.findById(id);

        // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdate = Object.keys(req.body);

        /** vamos a hacer un objeto vacion donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdate.forEach((item) => {
          if (req.body[item] === characterByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (catchImg) {
          characterByIdUpdate.image === catchImg
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }

        /** vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
         * si no hay ningun false entonces lanzamos un 200 porque todo esta correcte
         */

        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json("este character no existe");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const toggleLikeCharacter = async (req, res, next) => {
  try {
    const { idCharacter } = req.params;
    // vamos a tener el middleware de auth por lo cual se crea req.user
    const { _id } = req.user;

    if (req.user.charactersFav.includes(idCharacter)) {
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { charactersFav: idCharacter },
        });

        try {
          await Character.findByIdAndUpdate(idCharacter, {
            $pull: { likes: _id },
          });

          return res.status(200).json({
            action: "disliked",
            user: await User.findById(_id).populate("charactersFav"),
            character: await Character.findById(idCharacter).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update Character - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  CharactersFav",
          message: error.message,
        });
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { charactersFav: idCharacter },
        });

        try {
          await Character.findByIdAndUpdate(idCharacter, {
            $push: { likes: _id },
          });

          return res.status(200).json({
            action: "like",
            user: await User.findById(_id).populate("charactersFav"),
            character: await Character.findById(idCharacter).populate("likes"),
          });
        } catch (error) {
          return res.status(404).json({
            error: "no update Character - likes",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "no update user-  charactersFav",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);
    if (character) {
      // lo buscamos para vr si sigue existiendo o no
      const finByIdCharacter = await Character.findById(id);

      try {
        const test = await Movie.updateMany(
          { characters: id },
          { $pull: { characters: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { charactersFav: id },
            { $pull: { charactersFav: id } }
          );

          return res.status(finByIdCharacter ? 404 : 200).json({
            deleteTest: finByIdCharacter ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update Movie",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
module.exports = {
  create,
  getById,
  getAll,
  getByName,
  update,
  deleteCharacter,
  toggleLikeCharacter,
};
