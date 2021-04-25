const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const journeySchema = new Schema(
  {
    name: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Driver" },
      name: { type: String, required: true, ref: "Driver" }
    },
    distance: { type: String, required: true }, duration: { type: String, required: true },
    guest: {
      type: String,
      required: "Driver is Required",
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
    ReturnJourney: {
      persons: [
        {
          name: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
            name: { type: String, ref: 'Rider' }
          },
          status: { type: String },
          pickuppoint: {
            name: { type: String },
            location: { type: [Number] },
            time: { type: String },
          },
          droppoint: {
            name: { type: String, required: true },
            location: { type: [Number], required: true },
          },
          Date: { type: Date, default: Date.now }
        }
      ]
    }

  },
  { timestamps: true }
);
module.exports = Journey = mongoose.model("Journey", journeySchema);
