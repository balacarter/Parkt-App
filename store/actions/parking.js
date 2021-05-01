import {
  ADD_PARKING_SPOT,
  GET_PARKING_SPOTS,
  REMOVE_PARKING_SPOT,
} from "./types";

export const addParkingSpot = (parkingSpot) => ({
  type: ADD_PARKING_SPOT,
  data: parkingSpot,
});

export const removeParkingSpot = (key) => ({
  type: REMOVE_PARKING_SPOT,
  key: key,
});
