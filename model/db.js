const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://127.0.0.1:27017/userdb23",
  { useNewUrlParser: true },
  (err) => {
    // mongoose.connect("mongodb://localhost:27017/testdbcc", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
      console.log("Db connected");
    } else {
      console.log(err);
      console.log("Error while connectin db");
    }
  }
);
