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
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    activitiesFav: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
    ],
  },
  {
    timestamps: true,
  }
);

ActivitiesSchema.statics.findByActivity = async function (activity) {
  return this.find({ type: activity });
};

const Activities = mongoose.model("Activities", ActivitiesSchema);

module.exports = Activities;
