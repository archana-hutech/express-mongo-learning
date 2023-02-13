const express = require("express");
const app = express();
const cors = require("cors");
const route = express.Router();
const userModel = require("../model/user");
const { count } = require("../model/user");
app.use(cors());

route.post("/add", (req, res) => {
  let info = new userModel(req.body);
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
    const { q = null, limit = null, from = 0 } = req.query;
    whereConditions = {};
    if (q) {
      whereConditions = {
        name: {
          $regex: q,
        },
      };
    }
    userModel
      .find(whereConditions, function (error, info, count) {
        if (error) {
          res.send({ eroror: error.message });
        } else {
          res.send({ count: info.length, info: info });
        }
      })
      .skip(req.query.offset)
      .limit(req.query.limit);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//getById
route.get("/:id", (req, res) => {
  try {
    let id = req.params.id;
    userModel.findById(id, (error, info) => {
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

//update by id
route.put("/update/:id", (req, res) => {
  let id = req.params.id;
  userModel.findById(id, (err, data) => {
    if (!data) {
      res.status(404).send("data not found");
    } else {
      data.name = req.body.name;
      data.email = req.body.email;
      data.age = req.body.age;
      data
        .save()
        .then((userModel) => {
          res.json("updated sucessfully");
        })
        .catch((err) => {
          res.status(400).send("update failed");
        });
    }
  });
});

//delete by id
route.delete("/delete/:id", (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send();
      }
      res.send("deleted sucessfully");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = route;
