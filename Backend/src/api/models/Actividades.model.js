const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["pistas", "colectivas"],
    },
    spots: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["enabled", "disabled"],
    },
  },
  {
    timestamps: true,
  }
);

const Actividad = mongoose.model("Actividades", ActivitiesSchema);

module.exports = Actividad;
