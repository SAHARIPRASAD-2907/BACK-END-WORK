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
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(201);
      res.send(user);
    })
    .catch((e) => {
      res.send(400);
      res.send(e);
    });
});
//read users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send("Error in accessing data");
    });
});
//read single user
app.get("/users/:id", (req, res) => {
  User.find({ id: req.params.id })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

//Tasks endpoint
// Task creation
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(201);
      res.send(task);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});

//read tasks

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((task) => {
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.get("/tasks/:id", (req, res) => {
  Task.find({ id: req.params.id })
    .then((task) => {
      res.send(task);
    })
    .catch((e) => {
      res.send(500).send(e);
    });
});
