const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    //ADD REACTION ID!!!!
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
