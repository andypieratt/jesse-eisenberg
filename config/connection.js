const mongoose = require("mongoose");

//CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/socialnetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//EXPORT
module.exports = mongoose.connection;
