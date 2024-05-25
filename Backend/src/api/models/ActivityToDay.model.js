const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityToDaySchema = new Schema(
  {
    
    room: {
      type: String,
      num: ["sala verde", "sala roja","sala azul","sala amarilla","sala naranja","sala morada"],
      required: false,
    },
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
    avaibleSpots: { type: Number }, //PLAZAS DISPONIBLES
    monitorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const ActivityToDay = mongoose.model("ActivityToDay", ActivityToDaySchema);

module.exports = ActivityToDay;
