const express = require("express");
const router = new express.Router();
const Task = require("../models/task"); //tasks model

//Tasks endpoint
// Task creation
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch {
    res.status(400);
    res.send(e);
  }
});

//read tasks

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (tasks) {
      res.send(tasks);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// read individual task

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id });
    if (task) {
      res.send(task);
    }
  } catch (e) {
    res.send(500).send(e);
  }
});

// update task by id
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findById(req.params.id);
    allowedUpdates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("No task to delete");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
