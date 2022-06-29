const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    //ADD VALIDATION!!!!
    email: { type: String, required: true, unique: true },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought" }],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const handleError = (err) => console.error(err);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);

User.create(
  {
    username: "andypieratt",
    email: "pieratt.aw@gmail.com",
  },
  (err) => (err ? handleError(err) : console.log("Created new user"))
);

User.create(
  {
    username: "andy474747474",
    email: "pieratt.aw@gmail.org",
  },
  (err) => (err ? handleError(err) : console.log("Created new user"))
);

module.exports = User;
