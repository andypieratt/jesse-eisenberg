const router = require("express").Router();

//VARIABLES
const userRoutes = require("./user-routes.js");
const thoughtRoutes = require("./thought-routes.js");

//MIDDLEWARE
router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

//EXPORT
module.exports = router;
