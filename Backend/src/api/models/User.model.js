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
    age: {
      type: Number,
      required: true,
    },
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" }],
    rol: {
      //Diferenciamos entre las distintas personas y sus respectivos roles que tienen acceso al gimnasio
      type: String,
      enum: ["monitor", "user", "superadmin"],
      default: "user",
    },
    confirmationCode: {
      //Envio de codigo de confirmacion al email
      type: Number,
      required: true,
    },
    check: {
      //Comprobacion de registro del usuario
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },

    activitiesFav: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
    ],
    monitoresFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    wallLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wall" }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    commentsPublicByOther: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    ],
    postedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
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
