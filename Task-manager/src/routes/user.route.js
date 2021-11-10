const express = require("express");
const router = new express.Router();
const User = require("../models/user"); //users model

// User endpoints
//user creation
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});
//read users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(500).send("No data found");
    }
    res.status(201).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

//read single user
router.get("/users/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  try {
    if (!user) {
      return res.status(500).send("No data found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
//User updating end point
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "password", "age"];
  const isvalidOperation = updates.every((update) => {
    return allowedUpdate.includes(update);
  });
  if (!isvalidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("No data found to update");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
// Delete users
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
