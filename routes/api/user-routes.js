const router = require("express").Router();
const { User, Thought } = require("../../models/index");
const ObjectId = require("mongoose").Types.ObjectId;

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

//PUT USER BY ID
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    updateUser.save();
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: "Could not update user with that ID" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD FRIEND TO FRIENDS LIST
router.post("/:id/friends/:friendId", async (req, res) => {
  try {
    const addFriend = await User.findOne({ _id: new ObjectId(req.params.id) });
    addFriend.friends.push(new ObjectId(req.params.friendId));
    await addFriend.save();
    if (addFriend) {
      res.status(200).json(addFriend);
    } else {
      res.status(404).json({ message: "Failed to add friend." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE FROM FRIENDS LIST
router.delete("/:id/friends/:friendId", async (req, res) => {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    );
    await deleteFriend.save();
    if (deleteFriend) {
      res.status(200).json(deleteFriend);
    } else {
      res
        .status(404)
        .json({ message: "Could not remove freind with that ID." });
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
      res.status(404).json({ message: "Could not delete user with that ID." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORT
module.exports = router;
