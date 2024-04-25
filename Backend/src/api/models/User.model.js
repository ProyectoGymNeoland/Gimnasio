const bcrypt = require("bcrypt"); // para encryptar informacion
const validator = require("validator"); /// n os sirve para validad info
const mongoose = require("mongoose");

// el nombre del esquema en mayusculas
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"], // en caso de no ser un email valido
      // lanza el error ----> 'Email not valid'
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword], //minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otros"],
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user",
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    moviesFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    charactersFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // seguidores
    followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // seguidosº
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    banned: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    commentsPublicByOther: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Menssage" },
    ], // los que me hacen a mi
    postedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menssage" }], // son los messages que creo
    /// cuando relacionamos un modelo de con otro lo hacemos con populate y el ref a otr
  },
  {
    // esto es cuando se crea y se actualiza el objeto
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
    // el next puede lanzar al log o puede decir que continuemos
  } catch (error) {
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
