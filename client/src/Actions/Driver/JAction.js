import axios from "axios";
import {
  JOURNEY_LOADING,
  GET_JOURNEYS, UPDATE_JOURNEY,
  ADD_JOURNEY,
  JOURNEY_FAIL, DELETE_JOURNEY

} from "./Type";
import { returnErrors } from "./errorAction";
import { tokenConfig } from './authAction'

export const getJourney = () => async (dispatch, getstate) => {
  try {
    dispatch(setJourneyLoading);
    await axios
      .get("/cabshare/api/driver/journey", tokenConfig(getstate))
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
// DELETE JOurney

export const deleteJourney = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`/cabshare/api/driver/journey/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_JOURNEY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
// /auth/driver/:id/returnJourney
export const addjourney = ({
  name,
  guest,
  droppoint,
  pickuppoint,
  Date, duration, distance
}) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name, guest, droppoint, pickuppoint, Date, duration, distance });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios
      .post("/cabshare/api/auth/driver/" + name.id + "/newJourneyD", body, config)
      .then((res) =>
        dispatch({
          type: ADD_JOURNEY,
          payload: res.data,
        })
      )

      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "JOURNEY_FAIL")
        );
        dispatch({
          type: JOURNEY_FAIL,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// /auth/driver/:id/returnJourney
export const updatejourney = ({
  name,
  droppoint,
  pickuppoint,
  Date, status, id
}) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name, droppoint, pickuppoint, Date, id, status });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios
      .post(`/cabshare/auth/driver/${id}/returnJourney`, body, config)
      .then((res) =>
        dispatch({
          type: UPDATE_JOURNEY,
          payload: res.data,
        })
      )

      .catch((err) => {

      });
  } catch (err) {
    console.log(err);
  }
};

export const setJourneyLoading = () => {
  return {
    type: JOURNEY_LOADING,
  };
};

