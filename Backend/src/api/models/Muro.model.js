const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MuroSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  {
    timestamps: true,
  }
);
