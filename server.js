const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const config = require("config");
const socketio = require("socket.io");
const DriverLocation = require("./src/models/DriverLocation");
const app = express();
const path = require("path");


app.use(express.json());

// DB Config
const db = config.get("mongoURI");
app.use(express.json({ extended: true }));
// Connect to MongoDb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDb connected..."))
  .catch((err) => console.log(err));

process.env.NODE_ENV = "production";
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: config.get("Origin"),
  })
);

// Use Routes-----
app.use("/cabshare/api", require("./src/routes/api/journey"));
app.use("/cabshare/api/request", require("./src/routes/api/request"));
app.use("/cabshare/api/driver", require("./src/routes/api/driver"));
app.use("/cabshare/api/rider", require("./src/routes/api/rider"));
app.use("/cabshare/api/auth/driver", require("./src/routes/api/driverAuth"));
app.use("/cabshare/api/auth/rider", require("./src/routes/api/riderAuth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

// Socket Connection

const port = process.env.PORT || 1337;
const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const io = socketio.listen(server);

io.on("connection", (socket) => {
  console.log("connection");
  socket.on(
    "driverlocation",
    async ({ location, name, id, date }, callback) => {
      let query = { driverId: id };
      let coordinate = [location.latitude, location.longitude];
      await DriverLocation.updateOne(query, {
        name,
        coordinate,
        socketId: socket.id,
        Date: date,
      });
      if (location) {
        io.emit("DriverLocation", { name, location, id, date });
      }
      callback();
    }
  );

  socket.on("riderlocation", ({ location, name, id }, callback) => {
    if (location) {
      io.emit("RiderLocation", { name, location, id });
      callback();
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnect!");
  });
});
