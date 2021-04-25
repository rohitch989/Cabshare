import React, { useState, useEffect } from 'react';
import { dis } from '../../Rawfn/function';
import { connect } from 'react-redux';
import Geocoder from "react-mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { addjourney } from '../../../Actions/Driver/JAction';
import './journey.css';
import { costomData } from '../../Rawfn/query'
const NewJourney = ({ user, addjourney, Authenticated, close }) => {
  const [d, set] = useState({
    distance: '', duration: '',
  })
  const [input, setinput] = useState({
    name: { name: user.name, id: user._id },
    guest: '',
    droppoint: { name: '', location: '' },
    pickuppoint: { name: '', location: '' },
    Date: new Date()
  });
  const [msg, setmsg] = useState('');
  const [display, setdisplay] = useState({
    display: 'none'
  });
  const [viewport, setviewport] = useState({});

  const Change = (e) => {
    e.preventDefault();
    setinput({
      ...input,
      [e.target.id]: e.target.value
    });

  }

  const onPickUpPoint = (viewport, item) => {
    setviewport({ viewport });
    setinput({
      ...input,
      pickuppoint: { name: item.place_name, location: item.center },
    });

  };
  const onDropPoint = (viewport, item) => {
    setinput({
      ...input,
      droppoint: { name: item.place_name, location: item.center },
    });
    if (input.pickuppoint.name === '' && input.droppoint.name === '') {
      setmsg('Please Enter All The Fields ')
      return null;
    }
    setviewport({ viewport });
    dis(input.pickuppoint.location, item.center).then(data => {
      set({ distance: data.distance, duration: data.duration })
    });

  };


  const handleClick = (e) => {
    if (display.display === 'none') { setdisplay({ display: 'block' }); } else {
      setdisplay({ display: 'none' });
      setinput({ ...input, name: { name: user.name, id: user._id } });
    }
  }

  const Submit = async (e) => {
    e.preventDefault();
    const { name, guest, pickuppoint, droppoint, Date } = input;
    const { distance, duration } = d;
    if (!guest || pickuppoint.name === '' || droppoint.name === '') {
      setmsg('Please Enter All The Fields ')
      return null;
    }

    handleClick();
    if (distance) {
      const journey = { name, guest, pickuppoint, droppoint, Date, distance, duration };
      console.log(journey)
      await addjourney(journey);
      close();
    }

  }
  const [userlocation, setuserlocation] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setuserlocation({ ...userlocation, latitude: pos.coords.latitude, longitude: pos.coords.longitude });

      }, err => console.log(err), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
  }, [userlocation])
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

  if (Authenticated) {

    return (<div>
      <div className='request-box'>
        <div className='modal-box'>
          <div className='modal-container'>
            <form>
              <div className='modal-header'>
                <h1>Create New Ride</h1>
                <span onClick={() => { close() }}>&times;</span>
              </div>

              {msg ? (
                <div>
                  <div className="msg" style={{ backgroundColor: 'green' }}>{msg}</div>
                  <br />
                </div>
              ) : null}
              <div className="form-group modal-span ">
                <label htmlFor="date" className='form-label'>Date :</label>
                <input
                  type="text" readOnly
                  className="form-control "
                  id="date" value={new Date().toString()} onClick={() => setmsg('')}
                />
              </div>
              <div className="form-group modal-span ">
                <label htmlFor="name" className='form-label'>Your Name :</label>
                <input
                  type="text"
                  className="form-control" readOnly
                  id="name" value={user.name} onClick={() => setmsg('')}

                />
              </div>
              <div className="form-group modal-span ">
                <label htmlFor="guest" className='form-label'>Guest_Name :</label>
                <input
                  type="text"
                  className="form-control"
                  id="guest" placeholder="Guest_Name" onChange={Change} onClick={() => setmsg('')}

                />
              </div>
              <div className="form-group form-geocoder" onClick={() => setmsg('')}>
                <label htmlFor="pickuplocation" className='form-label'>PickUp Point :</label>

                <div className='pickuppoint-journey'>
                  <div className="journey-pickuppoint-1" onClick={() => { setmsg(''); }}>
                    <Geocoder

                      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                      onSelected={onPickUpPoint}
                      hideOnSelect={true}
                      viewport={viewport}
                      queryParams={{ country: "in" }}
                      updateInputOnSelect={true}
                      initialInputValue={"pickuppoint"}
                      localGeocoder={forwardGeocoder}

                    />

                  </div>

                </div>
              </div>
              <div className="form-group form-geocoder" onClick={() => setmsg('')}>
                <label htmlFor="droplocation" className='form-label'>Drop Point :</label>
                <div onClick={() => setmsg('')}>
                  <Geocoder
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onSelected={onDropPoint}
                    hideOnSelect={true}
                    viewport={viewport}
                    queryParams={{ country: "in" }}
                    updateInputOnSelect={true}
                    initialInputValue={"    droppoint"}
                    localGeocoder={forwardGeocoder}
                  />
                </div>
              </div>

              <div > <button
                type="submit"
                className="request-form-btn" onClick={Submit}
              >
                Submit
</button>
              </div></form>
          </div>
        </div>

      </div>
    </div>
    )
  } else {
    return (
      <div>
        You are not Authenticated
      </div>
    )

  }
}
const mapStateToProps = (state) => ({
  Authenticated: state.driverAuth.isAuthenticated,
  user: state.driverAuth.driver,
});
export default connect(mapStateToProps, { addjourney })(NewJourney);
