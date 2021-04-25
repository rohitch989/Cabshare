const express = require("express");
const router = express.Router();


const Request = require("../../models/Request");

// Post Request
router.post("/", (req, res) => {
  const newRequest = new Request({
    name: req.body.name,
    requestedto: req.body.requestedto,
    noofperson: req.body.noofperson,
    status: req.body.status,
    pickuppoint: req.body.pickuppoint,
    droppoint: req.body.droppoint,
    Date: req.body.Date,
  });

  newRequest.save().then((Request) => res.json(Request));
});

// Update request
router.post("/:id", async (req, res) => {
  let query = { _id: req.params.id };
  await Request.updateOne(query, {
    status: req.body.status,

    function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.json({ suceess: true });
      }
    },
  });
});

// Delete Request
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Request.findById(id)
    .then((Request) => Request.remove().then(() => res.json({ suceess: true, id })))
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});

module.exports = router;
