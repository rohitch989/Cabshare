import { GET_REQUESTS, ADD_REQUEST, DELETE_REQUEST, REQUESTS_LOADING, UPDATE_REQUEST } from '../../../Actions/Rider/Type';
const initialRequest = {
  request: [],
  loading: false
};
export default function (state = initialRequest, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        request: action.payload,
        loading: false
      }
    case ADD_REQUEST:
      return {
        ...state,
        request: [action.payload, ...state.request]
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        request: state.request.map(req => req._id === action.payload.id ? { ...req, status: action.payload.status } : req)
      }
    case DELETE_REQUEST:
      return {
        ...state,
        request: state.request.filter(request => request._id !== action.payload.id)
      }
    case REQUESTS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}