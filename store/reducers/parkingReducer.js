import {
  GET_PARKING_SPOTS,
  ADD_PARKING_SPOT,
  REMOVE_PARKING_SPOT,
} from "../actions/types";

const initialState = {
  parkingSpots: [],
};

export default parking = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARKING_SPOT:
      //console.warn(action);
      return {
        ...state,
        parkingSpots: state.parkingSpots.concat({
          key: Math.random(),
          location: action.data,
        }),
      };
    case GET_PARKING_SPOTS:
      return;
    case REMOVE_PARKING_SPOT:
      return {
        parkingSpots: state.parkingSpots.filter((item) => item.key !== key),
      };
    default:
      return state;
  }
};
