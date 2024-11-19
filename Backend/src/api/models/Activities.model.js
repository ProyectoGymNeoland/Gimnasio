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
    }, // PLAZAS
    status: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Activities = mongoose.model("Activities", ActivitiesSchema);

module.exports = Activities;
