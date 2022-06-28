const router = require("express").Router();

//VARIABLES
const userRoutes = require("./user-routes.js");
const thoughtRoutes = require("./thought-routes.js");
const reactionRoutes = require("./reaction-routes.js");

//MIDDLEWARE
router.use("/user", userRoutes);
// router.use("/thoughts", thoughtRoutes);
// router.use("/reaction", reactionRoutes);

//EXPORT
module.exports = router;
