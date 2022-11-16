const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
const connection = {
  isConnected: false,
};

exports.connect = () => {
  if (connection.isConnected) {
    return;
  }

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      console.log("Connected to Database");
      connection.isConnected = db.connections[0].readyState;
    })
    .catch((error) => {
      console.log("Database Connection Error");
      console.log(error);
      process.exit(1);
    });
};
