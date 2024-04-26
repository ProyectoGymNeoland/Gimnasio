const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityToDaySchema = new Schema(
  {
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
    avaibleSpots: { type: Number }, //PLAZAS DISPONIBLES
    monitorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

const ActivityToDay = mongoose.model("ActivityToDay", ActivityToDaySchema);

module.exports = ActivityToDay;
