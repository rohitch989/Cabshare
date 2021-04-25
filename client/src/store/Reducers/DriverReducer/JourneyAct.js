import { GET_JOURNEYS, JOURNEY_LOADING, ADD_JOURNEY, DELETE_JOURNEY } from '../../../Actions/Driver/Type';
const initialjourney = {
  journey: [],
  loading: false
};
export default function (state = initialjourney, action) {
  switch (action.type) {

    case GET_JOURNEYS:
      return {
        ...state,
        journey: action.payload,
        loading: false
      }
    case ADD_JOURNEY:
      return {
        ...state,
        journey: [action.payload, ...state.journey]
      }
    case DELETE_JOURNEY:
      return {
        ...state,
        journey: state.journey.filter(journey => journey._id !== action.payload.id)
      }
    case JOURNEY_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}