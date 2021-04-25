const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const riderauth = require("../../../middleware/riderauth");

const Request = require("../../models/Request");
// Rider user Model
const Rider = require("../../models/Rider");

// @route   Post api/Rider
// @desc  Register new Rider
// /cabshare/api/rider
// @route   Public
router.post("/", (req, res) => {
  const { name, email, password, phone, confirmpassword } = req.body;
  console.log(req.body);
  // Simple validation
  if (!name || !email || !password || !phone || !confirmpassword) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (password !== confirmpassword) {
    return res.status(400).json({ msg: "Password didn`t match !" });
  }

  // Check for existing Rider
  Rider.findOne({ email })
    .then((user) => {
      if (user)
        return res.status(400).json({ msg: "User already registered !" });

      // Register New Rider
      const newRider = new Rider({
        name,
        email,
        phone,
        password,
      });
      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newRider.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newRider.password = hash;
          newRider.save().then((user) => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  rider: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                  },
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => console.log(err));
});
// getRequest
router.get("/request", riderauth, (req, res) => {
  const id = req.rider.id;
  Request.find({ "name.id": id })
    .sort({ date: -1 })
    .then((Req) => {
      res.json(Req);
    });
});
// /cabshare/api/rider/account/${id}
// Delete Request
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Rider.findById(id)
    .then((rider) => rider.remove().then(() => res.json({ suceess: true, id })))
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});

module.exports = router;
