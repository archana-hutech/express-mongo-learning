const express = require("express");
const app = express();
const dbModel = require("./model/db");
const userRoutes = require("./controller/user");
const companyRoutes = require("./controller/companies");
const visitRoutes = require("./controller/visit");

app.get("/", (req, res) => {
  res.send("welcome to simplelearn");
});

app.use(express.json());

app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/visit", visitRoutes);

app.listen(3888, () => {
  console.log("listening to port 3888");
});
