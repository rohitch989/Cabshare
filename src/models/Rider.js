const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RiderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now }
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);
module.exports = Rider = mongoose.model('Rider', RiderSchema);
