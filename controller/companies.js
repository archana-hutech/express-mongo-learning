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
    const {
      q = null, //search by name
      c = null, //search by city-name
      cty = null, //search all city
      ct = null, //search any one city
      s = null, //search by state-name
      p = null, //search by pincode
      t = null, //search by city field inside an object
      st = null, //search by state field inside an object
    } = req.query;
    //         console.log(req.query);
    let query = {};
    if (q) {
      query = {
        relationships: { $elemMatch: { "person.first_name": q } },
      };
    }
    // array field
    //all
    if (c) {
      query = {
        City: { $all: c?.split(",") },
      };
    }
    //any
    if (cty) {
      query = {
        City: { $in: cty?.split(",") },
      };
    }

    //object inside array
    if (ct) {
      query = {
        Address: { $elemMatch: { city: ct } },
      };
    }

    if (s) {
      query = {
        Address: { $elemMatch: { state: s } },
      };
    }

    if (p) {
      query = {
        Address: { $elemMatch: { pin: p } },
      };
    }

    if (t) {
      query = {
        "Address.city": { $all: t?.split(",") },
      };
    }

    if (st) {
      query = {
        Address: { $elemMatch: { state: { $in: st?.split(",") } } },
      };
    }

    companyModel.find(query, function (error, info, count) {
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

// route.get("/", (req, res) => {
//   try {
//     companyModel
//       .aggregate([
//         {
//           $match: {
//             // relationships: { $elemMatch: { "person.first_name": "kumari" } },
//             // City: { $all: ["bangalore", "chennai"] },
//           },
//         },
//       ])
//       .then((response) => {
//         res.json({
//           response,
//         });
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       sucess: false,
//       message: "internal server error",
//       error: error.message,
//     });
//   }
// });

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
