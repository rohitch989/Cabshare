import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Map from "./Map";
import { GetRequests } from "../../../Actions/Rider/requestAction";
import Request from "./Request/Requestlist";
import Pastrequest from "./Request/PastRequest";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OnREQ from "./Request/Ongoingreq";
import { formatDate } from "../../Rawfn/function";
import { loadDriver } from "../../../Actions/Driver/authAction";
import Dmonitor from "../Dmonitor";
import profile from "../../img/profile-img.png";
import NewJourney from "../Journey/NewJourney";
import { logout, delete_Account } from "../../../Actions/Driver/authAction";
import OldJourney from "../Journey/Old_Journey";
import SearchFrom from '../Journey/SearchForm';
// Function
const DriverInfo = (props) => {
  // UseState
  const [toggled, toggle] = useState(false);
  const [newtog, tog] = useState(false);
  const [pastOn, pastOf] = useState(false);
  const [coords, setcoords] = useState();
  const [Show, setShow] = useState();
  const [modal, setmodal] = useState({ show: false, old: false, search: false });
  const [old, setold] = useState(false);
  const [classList, setclassList] = useState({ left: '', right: '' })

  const rider = (m) => {
    setcoords(m);
  };


  const { request } = props.Request;
  const {
    loadDriver,
    GetRequests,
    isAuthenticated,
    user,
    location,
    delete_Account,
    logout,
  } = props;
  useEffect(() => {
    // loading Driver
    loadDriver();
    // Getting Request
    GetRequests();
  }, [loadDriver, GetRequests]);

  //Getting request from newRequest to get his pickuppoint and drop point
  const show = (request) => {
    setShow(request);
  };
  const close = () => {
    setmodal({ show: false, old: false, noold: false });

  };
  // PastReq
  const pastReq =
    request &&
    request.filter((req) => formatDate(req.Date) !== formatDate(new Date()));

  // Ongoing Request
  const OnReq =
    request &&
    request.filter(
      (req) =>
        req.status === "accept" &&
        formatDate(req.Date) === formatDate(new Date())
    );

  // New Request
  const newReq =
    request &&
    request.filter(
      (req) =>
        formatDate(req.Date) === formatDate(new Date()) && req.status === "new"
    );

  // When Authenticated
  if (isAuthenticated) {
    return (
      <div>
        {modal.search ? <SearchFrom user={user} close={close} /> : null}

        {modal.show ? (
          <NewJourney
            user={user}
            Authenticated={isAuthenticated}
            close={close}
          />
        ) : null}


        <div className={"Riderinfo  " + classList.left + "" + classList.right}>

          <div className="strip-border"></div>
          <div className="rider-strip "></div>
          <a className="logo-driver" href="/cabshare">
            <span>c</span>
            <span>a</span>
            <span>b</span>
            <span>S</span>
            <span>h</span>
            <span>a</span>
            <span>r</span>
            <span>e</span>
          </a>

          {/* Left Side Bar */}
          <section className="left-sidebar">
            <div className="personal-section">
              <h1 className="personal-header">Your Detail</h1>
              <div
                className="left-close"
                onClick={() => {
                  setclassList({ left: "Riderinfo" });
                }}
              >
                <i className="fas fa-times"></i>
              </div>
              <div>
                <div className="name">
                  <img src={profile} className="profile" alt="" />
                  <h1>{user.name}</h1>
                </div>
                <div className="id">
                  <label className="id-label">Email :</label>
                  <div className="id-email">{user.email}</div>
                </div>
                <div className="status">
                  <label className="status-label">Status :</label>
                  <div className="status-span">
                    <span className="green"></span>
                    <h1>Online</h1>
                  </div>
                </div>
                <Dmonitor loc={location} rider={rider} />
                <div className="Date-span">
                  <label className="Date-label">Date :</label>
                  <div className="date">{formatDate(new Date())}</div>
                </div>
                <div className="request-btn">
                  <button
                    onClick={() => {
                      setmodal({ show: true });
                    }}
                  >
                    <i className="fas fa-plus"></i>New Journey
                </button>
                </div>
                <div className="search-btn">
                  <button
                    onClick={() => {
                      setold((old) => !old);
                      toggle((toggled) => false);
                      pastOf((pastOn) => false);
                      tog((newtog) => false);
                    }}
                  >
                    Old_Journey
                </button>
                </div>

                <div className="log">
                  <button className="log-button" onClick={() => logout()}>
                    LogOut
                </button>
                </div>
                <div className="log">
                  <button
                    className="del-button"
                    onClick={() => {
                      delete_Account(user._id);
                    }}
                  >
                    Delete Account
                </button>
                </div>
              </div>
            </div>
          </section>
          {/* Central Portion */}
          <section className="Map">
            <Map
              Show={Show}
              onDoubleClick={() => setShow(undefined)}
              className="p-0"
              coords={coords}
            />{" "}
          </section>
          {/* Right Side Bar */}
          <section className="right-sidebar">
            <div className="right-section driver-right">
              <div
                className="right-close"
                onClick={() => {
                  setclassList({ left: "Riderinfo" });
                }}
              >
                <i className="fas fa-times"></i>
              </div>
              <div>
                <div className="request">
                  <h1 className="request-header">Your Request</h1>
                  <div className="request-On">
                    <div>
                      <h1
                        onClick={() => {
                          toggle((toggled) => !toggled);
                          pastOf((pastOn) => false);
                          tog((newtog) => false);
                          setold(old => false)

                        }}
                      >
                        On Going
                    </h1>
                      {toggled ? (
                        <div id="scrollbar">
                          <div className="scrollbar-item">
                            <OnREQ onGoing={OnReq} />
                          </div>
                        </div>
                      ) : null}

                    </div>
                    <div className="new-request">
                      <h1
                        onClick={() => {
                          tog((newtog) => !newtog);
                          pastOf((pastOn) => false);
                          setold(old => false)

                          toggle((toggled) => false);
                        }}
                      >
                        New Request
                      </h1>
                      {newtog ? (
                        <div id="scrollbar">
                          <div className="scrollbar-item">
                            <Request newreq={newReq} show={show} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="past-request">
                      <h1
                        onClick={() => {
                          pastOf((pastOn) => !pastOn);
                          tog((newtog) => false);
                          toggle((toggled) => false);
                          setold(old => false)
                        }}
                      >
                        Past Request
                      </h1>
                      {pastOn ? (
                        <div id="scrollbar">
                          <div className="scrollbar-item">
                            <Pastrequest pastReq={pastReq} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {old ? <h1 className='old'>Your Previous Ride</h1> : null}


                </div>


                <div id="scrollbar">
                  <div className="scrollbar-item">

                    {old ? <OldJourney /> : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="map-footer">
            <div className="footer-grid">
              <div
                onClick={() => {
                  setclassList({ left: '', right: 'right' })

                }}
              >
                Your Request
              </div>
              <div onClick={() => {
                setmodal({ show: true });
              }}>
                <i className="fas fa-plus"></i>     NewJourney
            </div>
              <div onClick={() => {
                setmodal({ ...modal, search: true });
              }}>
                <i className="fas fa-search-plus"></i> Search
              </div>
              <div
                onClick={() => {
                  setclassList({ left: 'left', right: '' })
                }}
              >
                <i className="fas fa-user-alt"></i> About
              </div>
            </div>
          </section>
        </div></div>
    );
  } else {
    // When Driver is not Authenticated
    return <Redirect to="/cabshare/driver" />;
  }
};

// PropTypes
DriverInfo.propTypes = {
  Request: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

// Map State To Props
const mapStateToProps = (state) => ({
  isAuthenticated: state.driverAuth.isAuthenticated,
  user: state.driverAuth.driver,
  Request: state.riderRequest,
});
export default connect(mapStateToProps, {
  loadDriver,
  GetRequests,
  logout,
  delete_Account,
})(DriverInfo);
