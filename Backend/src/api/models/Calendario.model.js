const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema(
  {
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    startDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    endDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    avaibleSpots: { type: Number },
    monitorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    room: { type: String, enum: ["sala verde", "sala roja"], required: false },
  },
  {
    timestamps: true,
  }
);

const Calendario = mongoose.model("Calendario", CalendarSchema);

module.exports = Calendario;
