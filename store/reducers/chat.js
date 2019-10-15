
import {GOT_MESSAGES, GOT_NEW_MESSAGE } from '../actionTypes';

const messageReducer = (state = [], action) => {
  switch (action.type) {
  case GOT_MESSAGES:
    return action.messages ? action.messages : [];
  case GOT_NEW_MESSAGE:
    console.log('herrererererere', action.message)
    return [action.message, ...state];
  default:
    return state;
  }
};
export default messageReducer;
