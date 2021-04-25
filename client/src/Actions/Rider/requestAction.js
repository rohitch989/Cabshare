import axios from "axios";
import {
  GET_REQUESTS,
  ADD_REQUEST,
  DELETE_REQUEST,
  REQUESTS_LOADING, UPDATE_REQUEST
} from "./Type";
import { tokenConfig } from './Riderauth';


export const GetRequests = () => async (dispatch, getState) => {
  try {
    dispatch(setRequestLoading());
    await axios
      .get('/cabshare/api/driver/request', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: GET_REQUESTS,
          payload: res.data,
        })
      }
      )
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const getRequests = () => async (dispatch, getState) => {
  try {
    dispatch(setRequestLoading());
    await axios
      .get(`/cabshare/api/rider/request`, tokenConfig(getState))
      .then((res) => {

        dispatch({
          type: GET_REQUESTS,
          payload: res.data,
        })
      }
      )
      .catch((err) => null);
  } catch (err) {

  }
};

export const addRequest = (newrequest) => async (dispatch) => {
  try {
    await axios
      .post("/cabshare/api/request", newrequest)
      .then((res) =>
        dispatch({
          type: ADD_REQUEST,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`/cabshare/api/request/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_REQUEST,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
export const updateRequest = update => async (dispatch) => {
  try {
    await axios.post('/cabshare/api/request/' + update.id, update)
      .then(res =>
        dispatch({
          type: UPDATE_REQUEST,
          payload: res.data
        }))
      .catch(err => console.log(err));
  }
  catch (err) {
    console.log(err)
  };
};
export const setRequestLoading = () => {
  return {
    type: REQUESTS_LOADING,
  };
};
