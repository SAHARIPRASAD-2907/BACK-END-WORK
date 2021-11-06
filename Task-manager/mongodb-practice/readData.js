const mongodb = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");

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
    // Find one
    db.collection("users").findOne({ name: "anand" }, (error, user) => {
      if (error) {
        console.log("unable to fetch");
      }
      console.log(user);
    });
    // Find many
    db.collection("users")
      .find({})
      .toArray((error, users) => {
        console.log(users);
      });
  }
);
