import {FETCHING_LOGIN_REQUEST, FETCHING_LOGIN_SUCCESS, FETCHING_LOGIN_FAILURE} from '../actionTypes';
import {FETCHING_NAME_REQUEST, FETCHING_NAME_SUCCESS, FETCHING_NAME_FAILURE} from '../actionTypes';
import {FETCHING_EMAIL_REQUEST, FETCHING_EMAIL_SUCCESS, FETCHING_EMAIL_FAILURE} from '../actionTypes';
import {FETCHING_AVATAR_REQUEST, FETCHING_AVATAR_SUCCESS, FETCHING_AVATAR_FAILURE} from '../actionTypes';


const initialState = {
  isLogging: false,
  error: '',
  user: '',
  token: '',
  hasName: null
};
const initialStateName = {
  name: '',
  error: '',
  isNaming: false
};
const initialStateEmail = {
  email: '',
  error: '',
  isEmail: false
};
const initialStateAvatar = {
  avatar: '',
  error: '',
  isAvatar: false
};
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_LOGIN_REQUEST:
      return {...state, isLogging: true};
    case FETCHING_LOGIN_FAILURE:
      return {...state, isLogging: false, error: action.payload};
    case FETCHING_LOGIN_SUCCESS:
      return {...state, isLogging: false, user: action.payload.user, token: action.payload.token, hasName: action.payload.hasName};
      default:
          return state;
  }
};
// export default loginReducer;
export const nameReducer = (state = initialStateName, action) => {
  switch (action.type) {
    case FETCHING_NAME_REQUEST:
      return {...state, isNaming: true};
    case FETCHING_NAME_FAILURE:
      return {...state, isNaming: false, error: action.payload};
    case FETCHING_NAME_SUCCESS:
      return {...state, isNaming: false, name: action.payload.name};
      default:
          return state;
  }
};
// export default NameReducer;
export const emailReducer = (state = initialStateEmail, action) => {
  switch (action.type) {
    case FETCHING_EMAIL_REQUEST:
      return {...state, isEmail: true};
    case FETCHING_EMAIL_FAILURE:
      return {...state, isEmail: false, error: action.payload};
    case FETCHING_EMAIL_SUCCESS:
      return {...state, isEmail: false, email: action.payload.email};
      default:
          return state;
  }
};
export const avatarReducer = (state = initialStateAvatar, action) => {
  switch (action.type) {
    case FETCHING_AVATAR_REQUEST:
      return {...state, isAvatar: true};
    case FETCHING_AVATAR_FAILURE:
      return {...state, isAvatar: false, error: action.payload};
    case FETCHING_AVATAR_SUCCESS:
      return {...state, isAvatar: false, avatar: action.payload.avatar};
      default:
          return state;
  }
};