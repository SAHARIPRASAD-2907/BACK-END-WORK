const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const me = new User({
  name: "hariprasad",
  age: 27,
});

const task = new Tasks({
  description: "Complete node js course",
  completed: false,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error", error);
  });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });
