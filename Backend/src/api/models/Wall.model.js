const mongoose = require("mongoose");

const WallSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Empresa", "usuarios", "Publicidad"],
      required: true,
    },
    expirationDate: {
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
WallSchema.statics.findByUser = async function (userId) {
  return this.find({ owner: userId }); // Busca los muros donde el campo "owner" coincide con el ID del usuario
};

WallSchema.statics.findByType = async function (type) {
  return this.find({ type: type });
};

WallSchema.statics.findByActivity = async function (activity) {
  return this.find({ type: activity });
};

//! -------- con la definicion de datos y su esquema vamos a crear el modelo de datos

const Wall = mongoose.model("Wall", WallSchema);

//! -------- exportar el modelo para que lo utilicen los controladores

module.exports = Wall;
