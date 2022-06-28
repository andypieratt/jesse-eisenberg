//REQUIRES/VARIABLES
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//ADD MODEL REQUIRE IF NEEDED

const PORT = process.env.PORT || 3001;
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//LISTEN
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
});
