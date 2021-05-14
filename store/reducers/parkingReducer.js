import { actionTypes } from "redux-firestore";
import {
  GET_PARKING_SPOTS,
  ADD_PARKING_SPOT,
  REMOVE_PARKING_SPOT,
  SET_RADIUS,
} from "../actions/types";

const initialState = {
  parkingSpots: [],
  radius: 500,
};

export default parkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARKING_SPOT:
      //console.log(state.parkingSpots);
      return {
        ...state,
      };
      
    case GET_PARKING_SPOTS:
      return {
        ...state,
        parkingSpots: action.payload,
      };
    case SET_RADIUS:
      return {
        ...state,
        radius: action.payload,
      };
    case REMOVE_PARKING_SPOT:
      return {
        parkingSpots: state.parkingSpots.filter((item) => item.key !== key),
      };
    default:
      return state;
  }
  
};
