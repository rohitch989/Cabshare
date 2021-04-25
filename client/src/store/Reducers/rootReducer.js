import { combineReducers } from "redux";
import riderReducer from "./RiderReducer/riderRequest";
import errorReducer from "./DriverReducer/errorReducer";
import driver from "./DriverReducer/driver";
import rider from "./RiderReducer/rider";
import ErrorReducer from "./RiderReducer/errorReducer";
import JourneyR from './RiderReducer/journeyR';
import JourneyAct from "./DriverReducer/JourneyAct";


export default combineReducers({
  riderRequest: riderReducer,
  driverError: errorReducer,
  driverAuth: driver,
  riderAuth: rider,
  riderError: ErrorReducer,
  Notification: JourneyR,
  JourneyD: JourneyAct,
});
