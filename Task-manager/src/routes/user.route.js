const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/user.model"); //users model

// User endpoints
//user creation
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});
//user login endpoint
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    console.log(user);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

//user logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("user logged out sucessfully");
  } catch (e) {
    res.status(500).send();
  }
});

//users logoutAll
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("all users logged out");
  } catch (e) {
    res.status(500).send(e);
  }
});
//read users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//User updating end point
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "password", "age"];
  const isvalidOperation = updates.every((update) => {
    return allowedUpdate.includes(update);
  });
  if (!isvalidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    allowedUpdate.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});
// Delete users
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send("User deleted successfully");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
