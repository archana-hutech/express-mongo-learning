const express = require("express");
const app = express();
const cors = require("cors");
const route = express.Router();
const companyModel = require("../model/companies");

app.use(cors());

route.post("/add", (req, res) => {
  let info = new companyModel(req.body);
  info
    .save()
    .then((info) => {
      res.status(200).json({ info: "information added successfuly" });
    })
    .catch((err) => {
      res.status(400).send("failed");
    });
});

route.get("/", (req, res) => {
  try {
    companyModel.find(function (error, info, count) {
      if (error) {
        res.send({ eroror: error.message });
      } else {
        res.send({ count: info.length, info: info });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

route.get("/:id", (req, res) => {
  try {
    let id = req.params.id;
    companyModel.findById(id, (error, info) => {
      if (!error) {
        res.json(info);
      } else {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

module.exports = route;
