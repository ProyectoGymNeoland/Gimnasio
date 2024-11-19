const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema(
  {
    day: {
      type: String,
      enum: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
      required: true,
    },



    dates: { type: Date, required: true },
    type: {
      type: String,
      enum: ["Habil", "Finde", "Festivo"],
      required: true,
    },
    // 1: 9-10; 2: 10-11, 3: 11-12, 4:12-13, 5:13-14, 6: 17-18, 7: 18-19, 8: 19-20
    one: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    two: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    three: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    four: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    five: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    six: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    seven: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
    eight: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityToDay" },
  },
  {
    timestamps: true,
  }
);

const Day = mongoose.model("Day", DaySchema);
module.exports = Day;