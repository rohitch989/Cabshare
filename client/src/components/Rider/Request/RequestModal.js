import React, { useState, useEffect } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { connect } from "react-redux";
import { costomData } from "../../Rawfn/query";
function RequestModal({ user, request, notification, close }) {
  const [userlocation, setuserlocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setuserlocation({
            ...userlocation,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [userlocation]);
  if (costomData.features.length === 3 && userlocation.latitude !== 0) {
    costomData.features.push({
      type: "Feature",
      properties: {
        title: "Your current location",
        description: "College",
      },
      geometry: {
        coordinates: [userlocation.longitude, userlocation.latitude],
        type: "Point",
      },
    });
  }
  const [viewport, setviewport] = useState({});

  const [rInput, setrInput] = useState({
    name: { id: user._id, name: user.name },
    status: "new",
    requestedto: notification.name,
    noofperson: "",
    pickuppoint: { name: "", location: "" },
    droppoint: { name: "", location: "" },
  });
  const [msg, setmsg] = useState("");
  const mapAccess = {
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  };
  const onPickUpPoint = (viewport, item) => {
    setviewport({ viewport });
    setrInput({
      ...rInput,
      pickuppoint: { name: item.place_name, location: item.center },
    });
  };
  const onDropPoint = (viewport, item) => {
    setviewport({ viewport });
    setrInput({
      ...rInput,
      droppoint: { name: item.place_name, location: item.center },
    });
  };

  const Change = (e) => {
    setrInput({
      ...rInput,
      [e.target.id]: e.target.value,
    });
  };
  const Submit = (e) => {
    e.preventDefault();
    const [
      name,
      status,
      requestedto,
      noofperson,
      pickuppoint,
      droppoint,
    ] = rInput;
    if (
      !name &&
      !status &&
      !requestedto &&
      !noofperson &&
      !pickuppoint &&
      !droppoint
    ) {
      setmsg("Please Enter All The Fields");
      return null;
    }
    const NewREQUEST = {
      name,
      status,
      requestedto,
      noofperson,
      pickuppoint,
      droppoint,
    };
    request(NewREQUEST);
    close();
  };
  function forwardGeocoder(Query) {
    var matchingFeatures = [];
    for (var i = 0; i < costomData.features.length; i++) {
      var feature = costomData.features[i];

      if (
        feature.properties.title.toLowerCase().search(Query.toLowerCase()) !==
        -1
      ) {
        feature["place_name"] = feature.properties.title;
        feature["center"] = feature.geometry.coordinates;

        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }

  return (
    <div>
      <div className="request-box">
        <div className="modal-box">
          <div className="modal-container">
            <form>
              <div className="modal-header">
                <h1>New Request</h1>
                <span
                  onClick={() => {
                    close();
                  }}
                >
                  &times;
                </span>
              </div>

              {msg ? (
                <div>
                  <div className="">{msg}</div>
                  <br />
                </div>
              ) : null}
              <div className="form-group modal-span ">
                <label htmlFor="n" className="form-label">
                  Your Name :
                </label>
                <input
                  type="text"
                  readOnly
                  className="form-control "
                  id="n"
                  value={rInput.name.name}
                  onClick={() => setmsg("")}
                />
              </div>
              <div className="form-group modal-span ">
                <label htmlFor="noofperson" className="form-label">
                  No. of Person :
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="noofperson"
                  onChange={Change}
                  onClick={() => setmsg("")}
                />
              </div>
              <div
                className="form-group form-geocoder"
                onClick={() => setmsg("")}
              >
                <label htmlFor="pickuplocation" className="form-label">
                  PickUp Point :
                </label>
                <Geocoder
                  {...mapAccess}
                  onSelected={onPickUpPoint}
                  hideOnSelect={true}
                  viewport={viewport}
                  queryParams={{ country: "in" }}
                  updateInputOnSelect={true}
                  initialInputValue={"pickuppoint"}
                  localGeocoder={forwardGeocoder}
                />{" "}
              </div>
              <div
                className="form-group form-geocoder"
                onClick={() => setmsg("")}
              >
                <label htmlFor="droplocation" className="form-label">
                  Drop Point :
                </label>

                <Geocoder
                  {...mapAccess}
                  onSelected={onDropPoint}
                  hideOnSelect={true}
                  viewport={viewport}
                  queryParams={{ country: "in" }}
                  updateInputOnSelect={true}
                  initialInputValue={"    droppoint"}
                  localGeocoder={forwardGeocoder}
                />
              </div>
              <button
                type="submit"
                className="request-form-btn"
                onClick={Submit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(RequestModal);
