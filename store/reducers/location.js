
import {GOT_LOCATIONS, GOT_NEW_LOCATION } from '../actionTypes';

const locationReducer = (state = [], action) => {
  switch (action.type) {
  case GOT_LOCATIONS:
    return action.locations ? action.locations : [];
  case GOT_NEW_LOCATION:
    return [action.location, ...state];
  default:
    return state;
  }
};
export default locationReducer;
