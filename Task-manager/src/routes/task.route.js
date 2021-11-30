const express = require("express");
const router = new express.Router();
const Task = require("../models/task.model"); //tasks model
const auth = require("../middleware/auth.middleware");

//Tasks endpoint
// Task creation
router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch {
    res.status(400);
    res.send(e);
  }
});

//read tasks

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const options = {
    sort: {},
  };
  try {
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.limit) {
      options.limit = parseInt(req.query.limit);
    }
    if (req.query.skip) {
      options.skip = parseInt(req.query.skip);
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      console.log(parts);
      options.sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    console.log(options);
    // const tasks = await Task.find({});
    const tasks = await Task.find(
      {
        owner: req.user._id,
        ...match,
      },
      null,
      options
    );
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// read individual task

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (task) {
      res.send(task);
    }
  } catch (e) {
    res.send(500).send(e);
  }
});

// update task by id
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    allowedUpdates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("No task to delete");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
