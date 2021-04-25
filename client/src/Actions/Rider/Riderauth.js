import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  Delete_Account,
} from "./Type";
import { returnErrors } from "./Errroraction";

// check token and load rider
export const loadRider = () => async (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  await axios
    .get("/cabshare/api/auth/rider", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      }
    });
};

// Register
export const login = ({ email, password }) => async (dispatch) => {
  // Request body
  const body = JSON.stringify({ email, password });
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    await axios
      .post("/cabshare/api/auth/rider", body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const register = ({
  name,
  email,
  password,
  phone,
  confirmpassword,
}) => async (dispatch) => {
  // Request body
  const body = JSON.stringify({
    name,
    email,
    password,
    phone,
    confirmpassword,
  });
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    await axios
      .post("/cabshare/api/rider", body, config)
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
export const delete_Account = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`/cabshare/api/rider/${id}`)
      .then((res) => {
        dispatch({
          type: Delete_Account,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().riderAuth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token,add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
