const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    console.log("Data connection sucessfully");
    const db = client.db(databaseName);
    db.collection("users").insertOne(
      {
        name: "Prasad",
        age: 27,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert in database");
        }

        console.log("The Data is added successfully");
        console.log(result.insertedId);
        return 0;
      }
    );

    db.collection("users").insertMany(
      [
        {
          name: "anand",
          age: 40,
        },
        {
          name: "vanitha",
          age: 67,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert in database");
        }
        console.log(result.insertedCount);
      }
    );

    db.collection("tasks").insertMany(
      [
        {
          description: "Hello i am hari",
          completed: true,
        },
        {
          description: "complete react course",
          completed: false,
        },
        {
          description: "complete task manager course",
          completed: false,
        },
      ],
        (error, result) => {
            if (error) {
              return console.log('tasks not added properly');
            }
            console.log(result.insertedCount);
      }
    );
  }
);
