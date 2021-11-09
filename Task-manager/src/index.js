const express = require("express");
require("./db/mongoose"); //mongoose setup and connection

const User = require("./models/user"); //users model
const Task = require("./models/task"); //tasks model

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("Server is up on port", port);
});

//initial page
app.get("/", (req, res) => {
  res.send("Task Manager API");
});

// User endpoints
//user creation
app.post("/users", async (req, res) => {
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
app.get("/users", async (req, res) => {
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
app.get("/users/:id", async (req, res) => {
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
app.patch("/users/:id", async (req, res) => {
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

//Tasks endpoint
// Task creation
app.post("/tasks", async (req, res) => {
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

app.get("/tasks", async (req, res) => {
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

app.get("/tasks/:id", async (req, res) => {
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
app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
