const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  //ADD VALIDATION
  email: { type: String, required: true, unique: true },
  // thoughts: [Thoughts._id],
  // friends: [User._id],
  // friendCount: [friends.length],
});

const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);

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
