import React, { useState, useEffect } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  navStyle,
  fullscreenControlStyle,
  locateUser,
  scaleControlStyle, sat,
  queryParams,
} from "../../Rawfn/MapStyle";
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  ScaleControl, Popup,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import carMarker from '../../img/carMarker.png';
import { costomData } from '../../Rawfn/query';
import satelite from '../../img/night.jpeg';
import street from '../../img/normal.png';
import './map.css'

function Map(props) {
  const [map, setmap] = useState({ map: 'street', style: 'mapbox://styles/mapbox/streets-v11' });
  const [m, setm] = useState({ marker: 'show', latitude: 0, longitude: 0 });
  const [userlocation, setuserlocation] = useState({ latitude: 0, longitude: 0 });
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 22.5726,
    longitude: 88.3639,
    zoom: 8,
  });
  const { Show, coords } = props;
  const [state, setstate] = useState({ showPopup: true });

  const click = () => {
    if (map.map === 'street')
      setmap({ ...map, map: 'night', style: 'mapbox://styles/mapbox/dark-v10' });
    else {
      setmap({ ...map, map: 'street', style: 'mapbox://styles/mapbox/streets-v11' });

    }
  }
  const geo = 'geolocation' in navigator ? true : false;

  useEffect(() => {
    if (geo) {
      navigator.geolocation.getCurrentPosition(pos => {
        setuserlocation({ ...userlocation, latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setViewport({ ...viewport, latitude: pos.coords.latitude, longitude: pos.coords.longitude, zoom: 8 })

      }, err => null, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
  }, [userlocation, geo, viewport])
  const onSelected = (viewport, item) => {
    setm({ marker: 'show', latitude: item.center[1], longitude: item.center[0] })

    setViewport(viewport);
  };
  if (costomData.features.length === 3 && userlocation.latitude !== 0) {
    costomData.features.push({
      'type': 'Feature',
      'properties': {
        'title': 'Your current location',
        'description':
          'College'
      },
      'geometry': {
        'coordinates': [userlocation.longitude, userlocation.latitude],
        'type': 'Point'
      }
    });
  }

  function forwardGeocoder(Query) {
    var matchingFeatures = [];
    for (var i = 0; i < costomData.features.length; i++) {
      var feature = costomData.features[i];

      if (
        feature.properties.title
          .toLowerCase()
          .search(Query.toLowerCase()) !== -1
      ) {

        feature['place_name'] = feature.properties.title;
        feature['center'] = feature.geometry.coordinates;

        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }

  return (

    <ReactMapGL
      {...viewport}
      mapStyle={map.style}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextviewport) => {
        setViewport(nextviewport);
      }}
    >
      {coords ?
        <Marker latitude={coords.location.latitude} longitude={coords.location.longitude} offsetLeft={-20} offsetTop={-10}>
          <div className='point-2'>
            <div className='pulse-red'>
              <div className='point'></div>
            </div>
          </div>
        </Marker> : null}

      <div style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>

      {state.showPopup && coords ? <Popup
        latitude={coords.location.latitude}
        longitude={coords.location.longitude}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setstate({ showPopup: false })}
        anchor="top" >
        <div> {coords.user}</div>
      </Popup> : null}

      <div style={navStyle}>
        <NavigationControl />
      </div>

      {m.marker === 'show' ? <Marker latitude={m.latitude} longitude={m.longitude} offsetLeft={-20} offsetTop={-10}>
        <i className="fas fa-map-marker"></i>      </Marker> : null}

      <div style={scaleControlStyle}>

        <ScaleControl />{" "}
      </div>
      {map.map === 'street' ? <div className='text-secondary' style={sat}><img alt='' src={satelite} width='40px' height='40px' onClick={click} /> Night View</div> :

        <div className='text-white' style={sat}><img alt='' src={street} width='40px' height='40px' onClick={click} /> Street View</div>}
      <GeolocateControl
        style={locateUser}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />

      {geo ? <Marker latitude={userlocation.latitude} longitude={userlocation.longitude} offsetLeft={-10}>


        <div className='point-2'>
          <div className='point-1'>
            <div className='point'>
              <img src={carMarker} alt='' width='50px' height='30px' />
            </div>
          </div>
        </div>
      </Marker> : null}


      {Show ? <div>
        <Marker
          latitude={Show.pickuppoint.location[1]}
          longitude={Show.pickuppoint.location[0]}
          offsetLeft={-12}
          offsetTop={-34}
        >
          <i class="fas fa-map-marker"></i>        </Marker>

        <Marker
          latitude={Show.droppoint.location[1]}
          longitude={Show.droppoint.location[0]}
          offsetLeft={-12}
          offsetTop={-34}
        >
          <i class="fas fa-map-marker"></i>        </Marker>
      </div> : null}

      <div>
        {" "}
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
      {/* nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}


      {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}
    </ReactMapGL>

  );
}

export default Map;
