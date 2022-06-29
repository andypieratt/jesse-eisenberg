const router = require("express").Router();
const { User, Thought } = require("../../models/index");

//GET ALL THOUGHTS
router.get("/", async (req, res) => {
  try {
    const thoughtData = await Thought.find({});
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET THOUGHT BY ID
router.get("/:id", async (req, res) => {
  try {
    const thoughtData = await Thought.findOne({ _id: req.params.id });
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST THOUGHT
router.post("/", async (req, res) => {
  try {
    const newThought = new Thought({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    newThought.save();
    if (newThought) {
      res.status(200).json(newThought);
    } else {
      res.status(404).json({ message: "Could not create a new Thought" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT THOUGHT BY ID
router.put("/:id", async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (updateThought) {
      res.status(200).json(updateThought);
    } else {
      res.status(404).json({
        message: "Could not update because no thought found with that ID",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE THOUGHT BY ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteThought = await Thought.finOneAndDelete({
      _id: req.params.id,
    });
    if (deleteThought) {
      res.status(200).json(deleteThought);
    } else {
      res.status(404).json({ message: "No, thought with that ID." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORT
module.exports = router;
