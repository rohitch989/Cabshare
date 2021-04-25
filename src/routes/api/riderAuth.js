const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const riderauth = require('../../../middleware/riderauth');

// Rider Rider Model
const Rider = require('../../models/Rider');

// @route   Get api/auth
// @desc Authenticate the Rider
// @route   Public 
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' });
  }
  // Check for existing Rider
  Rider.findOne({ email })
    .then(rider => {
      if (!rider) return res.status(400).json({ msg: 'rider Does not Exist !' });

      // Validate password
      bcrypt.compare(password, rider.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
          jwt.sign(
            { id: rider.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                rider: {
                  _id: rider.id,
                  name: rider.name,
                  email: rider.email,
                  phone: rider.phone
                }
              });
            }
          );
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

// @route   Get api/auth/Rider
// @desc Authenticate the Rider
// @route  Public
router.get('/', riderauth, (req, res) => {
  const id = req.rider.id;
  Rider.findById(id)
    .select('-password')
    .then(rider => {
      res.json(rider)
    }).catch(err => {
      res.json(err)
    });
});


module.exports = router;