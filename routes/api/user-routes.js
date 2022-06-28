const router = require("express").Router();
const { User, Thoughts, Reaction } = require("../../models/index");

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const userData = await User.find({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE USER
router.post("/", async (req, res) => {
  try {
    const newUserData = new User({
      username: req.body.username,
      email: req.body.email,
    });
    newUserData.save();
    if (newUserData) {
      res.status(200).json(newUserData);
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORT
module.exports = router;
