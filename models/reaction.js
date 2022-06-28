const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    reactionId: { type: mongoose.Schema.Types.ObjectId },
    reactionBody: { type: String, required: true, max: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
