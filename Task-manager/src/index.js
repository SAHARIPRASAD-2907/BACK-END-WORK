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
app.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.send(400);
      res.send(e);
    });
});

//Tasks endpoint
app.post("/task", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});
