const express = require("express");
const app = express();
const cors = require("cors");
const route = express.Router();
const companyModel = require("../model/companies");
app.use(cors());

route.get("/any", (req, res) => {
  try {
    const { d } = req.query;
    // console.log(req.query);
    let visits = (d?.split(",") || []).map((n) => +n);
    // console.log(visits);
    companyModel.find(
      { dailyvisits: { $in: visits } },
      function (error, info, count) {
        if (error) {
          res.send({ eroror: error.message });
        } else {
          res.send({ count: info.length, info: info });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

route.get("/all", (req, res) => {
  try {
    const { dv } = req.query;
    // console.log(req.query);
    let visit = (dv?.split(",") || []).map((n) => +n);
    // console.log(visits);
    companyModel.find(
      { dailyvisits: { $all: visit } },
      function (error, info, count) {
        if (error) {
          res.send({ eroror: error.message });
        } else {
          res.send({ count: info.length, info: info });
        }
      }
    );
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
