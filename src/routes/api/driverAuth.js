const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../../middleware/auth");


// Driver driver Model
const Driver = require("../../models/Driver");

// @route   Get /cabshare/api/auth/driver
// @desc Authenticate the driver
// @route   Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing Driver
  Driver.findOne({ email })
    .then((driver) => {
      if (!driver)
        return res.status(400).json({ msg: "User Does not Exist !" });

      // Validate password
      bcrypt
        .compare(password, driver.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });
          jwt.sign(
            { id: driver.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                driver: {
                  _id: driver.id,
                  name: driver.name,
                  email: driver.email,
                  phone: driver.phone,
                },
              });
            }
          );
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
});

// @route   Get /cabshare/api/auth/driver
// @desc Authenticate the driver
// @route  Public
router.get("/", auth, (req, res) => {

  Driver.findById(req.driver.id)
    .select("-password")
    .then((driver) => {
      res.json(driver);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
