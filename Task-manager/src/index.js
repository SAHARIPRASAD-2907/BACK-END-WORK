const express = require("express");
require("./db/mongoose"); //mongoose setup and connection
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port", port);
});

//initial page
app.get("/", (req, res) => {
  res.send("Task Manager API");
});
