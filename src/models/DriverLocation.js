const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DriverLocationSchema = new Schema(
  {
    name: {
      type: String
    },
    driverId: {
      type: String,
      required: true,
    },
    coordinate: {
      type: [Number],
    },
    socketId: {
      type: String,
    },
    Date: {
      type: String,
      default: Date.now,
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);
module.exports = DriverLocation = mongoose.model(
  "DriverLocation",
  DriverLocationSchema
);
