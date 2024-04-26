const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityToDaySchema = new Schema(
  {
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    avaibleSpots: { type: Number }, //PLAZAS DISPONIBLES
    monitorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

const ActivityToDay = mongoose.model("ActivityToDay", ActivityToDaySchema);

module.exports = ActivityToDay;
