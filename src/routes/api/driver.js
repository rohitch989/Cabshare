const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../../middleware/auth");
const DriverLocation = require("../../models/DriverLocation");
// Driver user Model
const Driver = require("../../models/Driver");
const Request = require("../../models/Request");
const Journey = require("../../models/Journey");

// @route   Post /cabshare/api/driver
// @desc  Register new Driver
// @route   Public
router.post("/", (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);
  // Simple validation
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing Driver
  Driver.findOne({ email })
    .then((user) => {
      if (user)
        return res.status(400).json({ msg: "User already registered !" });

      // Register New Driver
      const newDriver = new Driver({
        name,
        email,
        phone,
        password,
      });
      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDriver.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newDriver.password = hash;
          newDriver.save().then((driver) => {
            jwt.sign(
              { id: driver.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  driver: {
                    id: driver.id,
                    name: driver.name,
                    email: driver.email,
                    phone: driver.phone,
                  },
                });
              }
            );
            const driverId = driver.id;
            const newDriverLocation = new DriverLocation({ driverId });
            newDriverLocation
              .save()
              .then((id) => console.log(id))
              .catch((err) => console.log(err));
          });
        });
      });
    })
    .catch((err) => console.log(err));
});
// getRequest
// /cabshare/api/driver
router.get("/request", auth, (req, res) => {
  const id = req.driver.id;
  Request.find({ "requestedto.id": id })
    .sort({ date: -1 })
    .then((Req) => {
      res.json(Req);
    });
});
// getRequest

router.get("/journey", auth, (req, res) => {
  const id = req.driver.id;
  Journey.find().then((journey) => {
    res.json(journey);
  });
});
// Delete Journey
router.delete("/journey/:id", (req, res) => {
  const id = req.params.id;
  Journey.findById(id)
    .then((journey) => journey.remove().then(() => res.json({ suceess: true, id })))
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});
// /cabshare/api/driver/account/${id}
// Delete Request
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  DriverLocation.find({ "driverId": id }).then(driverlocation => {
    driverlocation.remove().then(() => console.log('location-deleted'))
  }).catch(err => console.log(err))
  Driver.findById(id)
    .then((driver) =>
      driver.remove().then(() => res.json({ suceess: true, id }))
    )
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});

module.exports = router;
