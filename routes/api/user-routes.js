const router = require("express").Router();
const { User, Thought } = require("../../models/index");

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

//POST NEW USER
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

//UPDATE NOT WORKING!!!!!!!!!!!!
//PUT USER BY ID
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate({ _id: req.params.id });
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: "Could not update user with that ID" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER BY ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
    if (deleteUser) {
      res.status(200).json(deleteUser);
    } else {
      res.status(404).json({ message: "Could not delte user with that ID." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORT
module.exports = router;
