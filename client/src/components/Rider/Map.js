import React, { useState, useEffect } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import satelite from "../img/night.jpeg";
import street from "../img/normal.png";
import { costomData } from "../Rawfn/query";
import carMarker from "../img/carMarker.png";
import "./Map.css";
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  Marker,
  Popup,
} from "react-map-gl";
import {
  scaleControlStyle,
  fullscreenControlStyle,
  locateUser,
  navStyle,
  sat,
  queryParams,
} from "../Rawfn/MapStyle";

const Map = ({ location }) => {
  const [m, setm] = useState({ marker: "", latitude: 0, longitude: 0 });
  const [userlocation, setuserlocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 22.5726,
    longitude: 88.3639,
    zoom: 6,
  });
  const [map, setmap] = useState({
    map: "street",
    style: "mapbox://styles/mapbox/streets-v11",
  });
  const [state, setstate] = useState({ showPopup: true });

  const onSelected = (viewport, item) => {
    setm({
      marker: "show",
      latitude: item.center[1],
      longitude: item.center[0],
    });
    setViewport(viewport);
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

  const geo = "geolocation" in navigator ? true : false;
  useEffect(() => {
    if (geo) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setuserlocation({
            ...userlocation,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setViewport({
            ...viewport,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 8,
          });
        },
        (err) => null,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [setuserlocation, userlocation, geo, viewport]);
  const click = () => {
    if (map.map === "street")
      setmap({
        ...map,
        map: "night",
        style: "mapbox://styles/mapbox/dark-v10",
      });
    else {
      setmap({
        ...map,
        map: "street",
        style: "mapbox://styles/mapbox/streets-v11",
      });
    }
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle={map.style}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextviewport) => {
        setViewport(nextviewport);
      }}
    >
      {location ? (
        <Marker
          latitude={location.location.latitude}
          longitude={location.location.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img src={carMarker} alt="" width="50px" height="30px" />
        </Marker>
      ) : null}
      {state.showPopup && location ? (
        <Popup
          latitude={location.location.latitude}
          longitude={location.location.longitude}
          closeButton={true}
          offsetTop={-20}
          offsetLeft={-10}
          closeOnClick={false}
          onClose={() => setstate({ showPopup: false })}
          anchor="bottom"
        >
          <div>Driver is here</div>
        </Popup>
      ) : null}

      <div style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>

      {m.marker === "show" ? (
        <Marker
          latitude={m.latitude}
          longitude={m.longitude}
          offsetLeft={-20}
          offsetTop={-50}
        >
          <i class="fas fa-map-marker"></i>{" "}
        </Marker>
      ) : null}

      <div style={navStyle}>
        <NavigationControl />
      </div>

      <div style={scaleControlStyle}>
        <ScaleControl />
      </div>

      {map.map === "street" ? (
        <div className="text-secondary" style={sat}>
          <img
            alt=""
            src={satelite}
            width="40px"
            height="40px"
            onClick={click}
          />{" "}
          Night View
        </div>
      ) : (
          <div className="text-white" style={sat}>
            <img alt="" src={street} width="40px" height="40px" onClick={click} />{" "}
          Street View
          </div>
        )}

      <GeolocateControl
        style={locateUser}
        {...location}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />

      <div className="map-geocoder">
        <Geocoder
          transitionDuration={2000}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onSelected={onSelected}
          viewport={viewport}
          hideOnSelect={true}
          queryParams={queryParams}
          updateInputOnSelect={true}
          initialInputValue={"    s e a r c h"}
          localGeocoder={forwardGeocoder}
        />
      </div>

      <Marker
        latitude={userlocation.latitude}
        longitude={userlocation.longitude}
        offsetLeft={-10}
      >
        <div className="point-2">
          <div className="point-1">
            <div className="point"></div>
          </div>
        </div>
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
