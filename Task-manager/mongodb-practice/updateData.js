//618600e3ca911017b2c28d29
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

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

    const updateRecord = db.collection("users").updateOne(
      {
        _id: new ObjectID("618600e3ca911017b2c28d29"),
      },
      {
        $set: {
          name: "Hari Prasad",
        },
      }
    );

    updateRecord
      .then((result) => {
        console.log(result);
      })
      .catch(() => {
        console.log(error);
      });
  }
);
