const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WallSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Empresa", "usuarios", "Publicidad"],
      required: true,
    },
    fechaCaducidad: {
      type: Date,
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: [{ type: String }],
    activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },

  {
    timestamps: true,
  }
);

//! -------- con la definicion de datos y su esquema vamos a crear el modelo de datos

const Wall = mongoose.model("Wall", WallSchema);

//! -------- exportar el modelo para que lo utilicen los controladores

module.exports = Wall;
