import React, { useEffect } from "react";
import io from "socket.io-client";
import querystring from "querystring";

let socket;
const Dmonitor = ({ loc, rider }) => {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  useEffect(() => {
    const { name, id } = querystring.parse(loc.search.slice(1));
    socket = io(ENDPOINT);
    const geo = "geolocation" in navigator ? true : false;
    if (geo) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          const location = { latitude, longitude };
          const date = new Date().toString();
          socket.emit("driverlocation", { location, id, name, date }, () => { });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
    socket.emit("disconnect", () => {
      console.log("diconnected");
    });
  }, [ENDPOINT, loc.search]);

  useEffect(() => {
    socket.on("RiderLocation", ({ name, location, id }) => {
      if (location) {
        rider(location, name);
      }
    }
    );
  }, [rider]);
  return <div></div>;
}

export default Dmonitor;