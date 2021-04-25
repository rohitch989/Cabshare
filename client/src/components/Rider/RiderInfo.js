import React, { useState, useEffect } from "react";
import "./RiderMap.css";
import Map from "./Map";
import { Redirect } from "react-router-dom";
import { formatDate } from "../Rawfn/function";
import PastReq from "./Request/pastReq";
import OnREQ from "./Request/OngoingReq";
import RequestM from "./Request/RequestModal";
import NewRequestList from "./Request/newRequestList";
import { connect } from "react-redux";
import NOinvitation from './noNotification';
import {
  loadRider,
  logout,
  delete_Account,
} from "../../Actions/Rider/Riderauth";
import { getJourney } from "../../Actions/Rider/journeyA";
import profile from "../img/profile-img.png";
import {
  getRequests,
  deleteRequest,
  addRequest,
} from "../../Actions/Rider/requestAction";
import Notification from "./notification";
import M from "./m";
import PropTypes from "prop-types";
import SearchFrom from "./SearchFrom";
import "./riderResponse.css";

// Function
const RiderInfo = ({ loadRider, getRequests, getJourney, location, deleteRequest, Request, addRequest, isAuthenticated, user, notification, logout, delete_Account }) => {
  const [modal, setmodal] = useState({
    show: false,
    search: false,
    bell: { show: false, bell: false },
  });
  const [loc, setloc] = useState();
  const [toggled, toggle] = useState(false);
  const [newtog, tog] = useState(false);
  const [pastOn, pastOf] = useState(false);
  const [classList, setclassList] = useState({ left: '', right: '' })
  const [no, sayno] = useState(false);
  const [hi, sethi] = useState(false);
  useEffect(() => {
    // Loading Rider
    loadRider();
    // Get Request
    getRequests();
    // Get Journey
    getJourney();
  }, [loadRider, getJourney, getRequests]);
  const close = () => {
    setmodal({
      show: false,
      search: false,
      bell: { show: false, bell: false },
    });
    sethi(h1 => false)
  };

  const driver = (m) => {
    if (m.name !== "") {
      setloc(m);
    }
  };

  const { request } = Request;

  // pastReq
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
  // Delete Request
  const Del = async (id) => {
    await deleteRequest(id);
  };
  const newRequest = async (newRequest) => {
    if (newRequest) {
      await addRequest(newRequest);
    }
  };
  // props
  // If Authenticated
  if (isAuthenticated) {
    // Ensuring notification send on current date
    const notif =
      notification &&
      notification.filter(
        (noti) => formatDate(noti.Date) === formatDate(new Date())
      );
    const not =
      notif.length !== 0 ? (
        <div>
          <div className="request-btn">
            <button
              onClick={() => {
                setmodal({ ...modal, bell: { show: true, bell: "" } });
              }}
            >
              <i className="fas fa-plus"></i>Request
            </button>
          </div>
        </div>
      ) : (
          <div className="request-btn">
            <button
              className="request-btn-tooltip"
              data-tooltip="No Notification till Now"
              onClick={() => {
                setmodal({ ...modal, bell: { show: false, bell: "" } });
              }}
            >
              <i className="fas fa-minus"></i>Request
          </button>
          </div>
        );
    return (
      <div>
        {hi ? (<NOinvitation close={close} />) : null}

        {modal.bell.show ? (
          <Notification close={close} notification={modal.bell.bell} />
        ) : null}
        {modal.search ? <SearchFrom user={user} close={close} /> : null}
        {modal.show ? (
          <RequestM
            user={user}
            notification={notification}
            request={newRequest}
            close={close}
          />
        ) : null}
        <div className={"Riderinfo  " + classList.left + "" + classList.right}>
          <div className="rider-strip"></div>
          <div className="strip-border"></div>
          <a className="logo-rider" href="/cabshare">
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
                <div className="Date-span">
                  <label className="Date-label">Date :</label>
                  <div className="date">{formatDate(new Date())}</div>
                </div>
                {not}
                <div className="search-btn">
                  <button
                    onClick={() => {
                      setmodal({ ...modal, search: true });
                    }}
                  >
                    <i className="fas fa-search-plus"></i>
                    Search
                  </button>
                </div>
                <div className="log">
                  <button
                    className="log-button"
                    onClick={() => {
                      logout();
                    }}
                  >
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
            <Map location={loc} />
          </section>
          {/* Right Side Bar */}
          <section className="right-sidebar">
            <div className="right-section">
              <div
                className="right-close"
                onClick={() => {
                  setclassList({ left: "Riderinfo" });
                }}
              >
                <i className="fas fa-times"></i>
              </div>
              <div>
                <M driver={driver} request={OnReq} loc={location} />
                <div className="notif-btn">
                  <h1>
                    Notification{" "}
                    {notif.length !== 0 ? (
                      <i
                        className="far fa-bell"
                        onClick={() => {
                          sayno((no) => true);
                          pastOf((pastOn) => false);
                          tog((newtog) => false);
                          toggle((toggled) => false);
                        }}
                      ></i>
                    ) : (
                        <i
                          className="far fa-bell-slash"
                          onClick={() => sayno((no) => false)}
                        ></i>
                      )}
                  </h1>
                </div>
                {no ? (
                  <div id="scrollbar">
                    <div className="scrollbar-item">
                      {notif.map((bell) => {
                        return (
                          <div key={bell._id}>
                            <h1
                              className="notif-heading"
                              onClick={() =>
                                setmodal({
                                  ...modal,
                                  bell: { show: true, bell: bell },
                                })
                              }
                            >
                              notification at time {bell.Date.slice(16, 24)}
                            </h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                <div className="request">
                  <h1 className="request-header">Your Request</h1>
                  <div className="request-On">
                    <h1
                      onClick={() => {
                        toggle((toggled) => !toggled);
                        pastOf((pastOn) => false);
                        tog((newtog) => false);
                        sayno((no) => false);
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

                    <div className="new-request">
                      <h1
                        onClick={() => {
                          tog((newtog) => !newtog);
                          pastOf((pastOn) => false);
                          sayno((no) => false);
                          toggle((toggled) => false);
                        }}
                      >
                        New Request
                      </h1>
                      {newtog ? (
                        <div id="scrollbar">
                          <div className="scrollbar-item">
                            <NewRequestList Delete={Del} newrequest={newReq} />
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
                          sayno((no) => false);
                        }}
                      >
                        Past Request
                      </h1>
                      {pastOn ? (
                        <div id="scrollbar">
                          <div className="scrollbar-item">
                            <PastReq Delete={Del} pastReq={pastReq} />
                          </div>
                        </div>
                      ) : null}
                    </div>
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
                setmodal({ ...modal, search: true });
              }}>
                <i className="fas fa-search-plus"></i> Search
              </div>
              <div className='footer-notification'>

                {notif.length !== 0 ? (
                  <div> Notification <i
                    className="far fa-bell"
                    onClick={() => {
                      sayno((no) => true);
                      pastOf((pastOn) => false);
                      tog((newtog) => false);
                      toggle((toggled) => false);
                    }}
                  ></i></div>
                ) : (
                    <div onClick={() => {
                      sayno((no) => false);
                      sethi(hi => true)
                    }}> Notification
                      <i
                        className="far fa-bell-slash"

                      ></i>
                    </div>
                  )}
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
        </div>
      </div>
    );
  } else {
    // When rider is not authenticated
    return <Redirect to="/cabshare" />;
  }
};
// Proptypes
RiderInfo.propTypes = {
  getRequests: PropTypes.func.isRequired,
  Request: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};
// Map State To Props
const mapStateToProps = (state) => ({
  Request: state.riderRequest,
  isAuthenticated: state.riderAuth.isAuthenticated,
  user: state.riderAuth.rider,
  notification: state.Notification.journey,
});

export default connect(mapStateToProps, {
  getRequests,
  deleteRequest,
  addRequest,
  loadRider,
  getJourney,
  delete_Account,
  logout,
})(RiderInfo);
