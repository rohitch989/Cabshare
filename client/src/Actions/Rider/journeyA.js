import axios from "axios";
import { JOURNEY_LOADING, GET_JOURNEYS } from './Type';


export const getJourney = () => async (dispatch) => {
  try {
    dispatch(setJourneyLoading);
    await axios
      .get("/cabshare/api/auth/rider/newJourney")
      .then((res) => {

        dispatch({
          type: GET_JOURNEYS,
          payload: res.data,
        })
      }
      )
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};





export const setJourneyLoading = () => {
  return {
    type: JOURNEY_LOADING,
  };
};

