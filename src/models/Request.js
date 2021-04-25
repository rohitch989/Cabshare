const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const request = new Schema(
  {
    name: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Rider" },
      name: { type: String, required: true, ref: "Rider" }
    },
    requestedto: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Driver" },
      name: { type: String, required: true, ref: "Driver" }
    },
    noofperson: { type: Number, min: 1, max: 5, required: true },
    status: {
      type: String,
      required: "status is required",
    },
    pickuppoint: {
      name: { type: String, required: true },
      location: { type: [Number], required: true },
    },
    droppoint: {
      name: { type: String, required: true },
      location: { type: [Number], required: true },
    },

    Date: {
      type: String,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = Request = mongoose.model("request", request);
