const router = require("express").Router();
const { User, Thought } = require("../../models/index");
const ObjectId = require("mongoose").Types.ObjectId;

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
      username: req.body.ObjectId,
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

//POST REACTION BY ID
router.post("/:id/reactions", async (req, res) => {
  try {
    const addReaction = await Thought.findOne({
      _id: new ObjectId(req.params.id),
    });
    addReaction.reactions.push(req.body);
    await addReaction.save();
    if (addReaction) {
      res.status(200).json(addReaction);
    } else {
      res
        .status(404)
        .json({ message: "Could not add reaction to the thought." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE REACTION BY ID
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const removeReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    await removeReaction.save();
    if (removeReaction) {
      res.status(200).json(removeReaction);
    } else {
      res
        .status(404)
        .json({ message: "Could not delete reaction to the thought." });
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
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params.id,
    });
    await deleteThought.save();
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
