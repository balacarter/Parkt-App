import {
  ADD_PARKING_SPOT,
  GET_PARKING_SPOTS,
  REMOVE_PARKING_SPOT,
  SET_RADIUS,
} from "./types";
import firebase from "firebase";



export const addParkingSpot = (parkingSpot) => {
  return (dispatch, getState) => {
    firebase
    .database()
    .ref('parkingSpots/' + parkingSpot.key)
    .set({
      key: parkingSpot.key,
      coordinates: parkingSpot.coordinates
    })
    .then(dispatch({type: ADD_PARKING_SPOT, payload: parkingSpot}));
  }
};

export const getParkingSpots = () => {
  return (dispatch) => {
    firebase
    .database()
    .ref('parkingSpots/')
    .on('value', (snapshot) => {
      const data = snapshot.val();
      dispatch({type: GET_PARKING_SPOTS, payload: data});
    });
  }
};

export const setRadius = (radius) => {
  return (dispatch) => {
    dispatch({type: SET_RADIUS, payload: radius});
  }
};

export const removeParkingSpot = (key) => ({
  type: REMOVE_PARKING_SPOT,
  key: key,
});

