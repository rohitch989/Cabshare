import { GET_JOURNEYS, JOURNEY_LOADING } from '../../../Actions/Rider/Type';
const initialjourney = {
  journey: [],
  loading: false
};
export default function (state = initialjourney, action) {
  switch (action.type) {
    case JOURNEY_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_JOURNEYS:
      return {
        ...state,
        journey: action.payload,
        loading: false
      }
    default:
      return state;
  }
}