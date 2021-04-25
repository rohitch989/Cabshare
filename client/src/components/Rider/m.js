import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import querystring from "querystring";
let socket;

export default function M({ driver, request, loc }) {
  const [locat, setlocat] = useState({ name: "", latitude: 0, longitude: "" });
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    socket = io(ENDPOINT);
    const { name, id } = querystring.parse(loc.search.slice(1));

    const geo = "geolocation" in navigator ? true : false;
    if (geo && request.length !== 0) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          const location = { latitude, longitude };
          socket.emit("riderlocation", { location, name, id }, () => { });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [request, ENDPOINT, loc.search]);

  useEffect(() => {
    socket.on("DriverLocation", ({ name, location, id, date }, callback) => {
      console.log(location)
      if (location) {
        setlocat({ name, location, id, date });
      }
    });
    socket.emit("disconect", () => {
      console.log("disconnect");
    });
  }, [setlocat, locat]);
  useEffect(() => {
    if (locat.name !== "") {
      driver(locat);
    }
  }, [driver, locat]);
  return (
    <div className="driver-status">
      {locat.name !== "" ? (
        <div>
          {" "}
          <div className="status">
            <label className="status-label">Driver :</label>
            <div className="status-span">
              <span className="green"></span>
              <h1>Online</h1>
            </div>
          </div>
          <h1 className="driver-name">{locat.name}</h1>
        </div>
      ) : (
          <div className="status">
            <label className="status-label">Driver:</label>
            <div className="status-span">
              <span className="red"></span>
              <h1>Offline</h1>
            </div>
          </div>
        )}
    </div>
  );
}
