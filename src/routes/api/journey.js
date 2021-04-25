const express = require("express");
const router = express.Router();
const config = require("config");
const nodemailer = require("nodemailer");
const Journey = require("../../models/Journey");
const Rider = require("../../models/Rider");

// /cabshare/api/
router.get("/auth/rider/newJourney", (req, res) => {
  Journey.find().then((journey) => {
    res.status(200).json(journey);
  });
});




router.post("/auth/driver/:id/newJourneyD", (req, res) => {
  const {
    name,
    guest,
    pickuppoint,
    droppoint,
    Date,
    duration,
    distance,
  } = req.body;
  const newJourney = new Journey({
    name,
    guest,
    duration,
    distance,
    pickuppoint,
    droppoint,
    Date,
  });
  newJourney.save().then((journey) => res.json(journey));
});

router.post("/auth/driver/:id/returnJourney", async (req, res) => {
  const { name, pickuppoint, droppoint, status, Date, id } = req.body;
  const person = { name, pickuppoint, droppoint, status, Date };
  let query = { _id: id };
  await Request.updateOne(query, {
    $push: { ReturnJourney: person },
  })
    .then(() => {
      console.log("return success!");
    })
    .catch((err) => console.log(err));
});

router.post("/rider/querySearch/:id", (req, res) => {
  const { name, email, todate, fromdate } = req.body;
  var from = new Date(fromdate);
  var to = new Date(todate);
  console.log(req.body);
  Journey.find({ createdAt: { $gte: from, $lt: to } })
    .then(async (journey) => {
      const html =
        journey.length !== 0
          ? journey.map((journey) => {
            return `<div >
        <h4 style="color:red">Dear, </h4>  
        <h4 style="color:red padding-left:5px;"> ${name} </h4>
<h1 style="color:powderblue;text-align:center;justify-content:center;">This Mail is in Response of your Query Search on CabShare :-</h1>
<hr/>

<h3> Your Search Result :- </h3>
<h5>Driver   <strong> ${journey.name.name}</strong> </h5>
<h4>Going to Drop Our Guest  </h4>
<h4>Mr. <strong>${journey.guest}</strong></h4>
<div> At ${journey.droppoint.name} </div>
<br/>

<h3>On Other Side of The Journey:- </h3> 

<div>${journey.ReturnJourney.person === undefined
                ? `<div> No Person had travelled in during the return Journey of Nits Cab </div>`
                : journey.ReturnJourney.person.map((person) => {
                  const t = Rider.findById(person.name.id)
                    .then((t) => {
                      return `<div>
              <h5>Person name - ${t.name.name}</h5>
              <h5>Email Id - ${t.email}</h5>
              <h5> Phone Number - ${t.phone}</h5>
              </div>`;
                    })
                    .catch((err) => {
                      return `<div></div>`;
                    });
                  return (
                    `<div style="text-align:left;justify-content:left;">` +
                    t +
                    ` <h5>Pickuppoint - ${person.pickuppoint.name}</h5>
              <h5>Droppoint  - ${person.droppoint.name}</h5><h5>Date  - ${person.Date}</h5> </div>`
                  );
                })
              }</div>
       </div>`;
          })
          : "No Matching Dates found";

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.get("Email_Id"),
          pass: config.get("Password"),
        },
        tls: { rejectUnauthorized: false },
      });
      var mailOptions = {
        from: `CabShare <${config.get("Email_Id")}>`,
        to: email,
        subject: "CabShare search Result",

        html: html.toString(),
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json({ msg: "Error Not Found" });
          console.log(error);
        } else {
          res.json({ msg: "success" });
          console.log("Email sent: " + info.response);
        }
      });
    })
    .catch((err) => {
      res.json({ msg: "Error Not Found" });
      console.log(err);
    });
});

module.exports = router;
