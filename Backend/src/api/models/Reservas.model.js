const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    calendarId: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
  },
  {
    timestamps: true,
  }
);

const Reserva = mongoose.model("Reservas", BookingSchema);

module.exports = Reserva;
