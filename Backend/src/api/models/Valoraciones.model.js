const bcrypt = require("bcrypt"); // para encryptar informacion
const validator = require("validator"); /// n os sirve para validad info
const mongoose = require("mongoose");

const ValoracionSchema = new mongoose.Schema(
  {
    valoracion: { type: mongoose.Schema.Types.ObjectId, ref: "Valoraciones" },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      require: true,
    },
    review: {
      type: String,
      require: false,
    },
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    receptorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
  }
);

const Valoracion = mongoose.model("Valoraciones", ValoracionSchema);

module.exports = Valoracion;
