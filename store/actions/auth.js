import AsyncStorage from '@react-native-community/async-storage';
import {
  FETCHING_LOGIN_REQUEST,
  FETCHING_LOGIN_SUCCESS,
  FETCHING_LOGIN_FAILURE,
} from '../actionTypes';
import {
  FETCHING_NAME_REQUEST,
  FETCHING_NAME_SUCCESS,
  FETCHING_NAME_FAILURE,
} from '../actionTypes';

import {FETCHING_EMAIL_REQUEST, FETCHING_EMAIL_SUCCESS, FETCHING_EMAIL_FAILURE} from '../actionTypes';
import {FETCHING_AVATAR_REQUEST, FETCHING_AVATAR_SUCCESS, FETCHING_AVATAR_FAILURE} from '../actionTypes';
export const fetchingLoginRequest = () => ({
  type: FETCHING_LOGIN_REQUEST,
});
export const fetchingLoginSuccess = json => ({
  type: FETCHING_LOGIN_SUCCESS,
  payload: json,
});
export const fetchingLoginFailure = error => ({
  type: FETCHING_LOGIN_FAILURE,
  payload: error,
});
export const fetchingNameRequest = () => ({
  type: FETCHING_NAME_REQUEST,
});
export const fetchingNameSuccess = json => ({
  type: FETCHING_NAME_SUCCESS,
  payload: json,
});
export const fetchingNameFailure = error => ({
  type: FETCHING_NAME_FAILURE,
  payload: error,
});
export const fetchingEmailRequest = () => ({
  type: FETCHING_EMAIL_REQUEST,
});
export const fetchingEmailSuccess = json => ({
  type: FETCHING_EMAIL_SUCCESS,
  payload: json,
});
export const fetchingEmailFailure = error => ({
  type: FETCHING_EMAIL_FAILURE,
  payload: error,
});
export const fetchingAvatarRequest = () => ({
  type: FETCHING_AVATAR_REQUEST,
});
export const fetchingAvatarSuccess = json => ({
  type: FETCHING_AVATAR_SUCCESS,
  payload: json,
});
export const fetchingAvatarFailure = error => ({
  type: FETCHING_AVATAR_FAILURE,
  payload: error,
});

export const authStoreToken =  (token, user) => {
  return async dispatch => {
  try {
    if(token, user) {
      console.log(token,user)
    await AsyncStorage.setItem('@UserStore:token', JSON.stringify(token));
    await AsyncStorage.setItem('@UserStore:user', JSON.stringify(user));
    }
    
  } catch (error) {
    console.log(error);
  }
}
};
export const authStoreName=  (name) => {
  return async dispatch => {
  try {
    console.log(name + 'trying to set name')
    await AsyncStorage.setItem('@UserStore:name', JSON.stringify(name));
  } catch (error) {
    console.log(error);
  }
}
};
export const login = user => {
  return async dispatch => {
    dispatch(fetchingLoginRequest());
    try {
      let response = await fetch('http://13.126.12.242/api/auth/mobile/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: user.phoneNumber,
          uid: user.uid,
        }),
      });
      console.log(response)
      let json = await response.json();
      console.log(json);
      dispatch(fetchingLoginSuccess(json));
    } catch (error) {
      console.log(error);
      dispatch(fetchingLoginFailure(error));
    }
  };
};

export const addName = (name, token) => {
  console.log(name,token)
  return async dispatch => {
    dispatch(fetchingNameRequest());
    try {
      let response = await fetch('http://13.126.12.242/api/mobile/update/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(token)
        },
        body: JSON.stringify({
          name: name
        }),
      });
      console.log(response)
      let json = await response.json();

      dispatch(fetchingNameSuccess(json));
    } catch (error) {
      console.log(error);
      dispatch(fetchingNameFailure(error));
    }
  };
};
export const addEmail = (email, token) => {
  return async dispatch => {
    dispatch(fetchingEmailRequest());
    try {
      let response = await fetch('http://13.126.12.242/api/mobile/update/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(token)
        },
        body: JSON.stringify({
          name: name
        }),
      });
      console.log(response)
      let json = await response.json();

      dispatch(fetchingEmailSuccess(json));
    } catch (error) {
      console.log(error);
      dispatch(fetchingEmailFailure(error));
    }
  };
};
export const addAvatar = (image, token) => {
  return async dispatch => {
    dispatch(fetchingAvatarRequest());
    try {
      let response = await fetch('http://13.126.12.242/api/mobile/update/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(token)
        },
        body: JSON.stringify({
          name: name
        }),
      });
      console.log(response)
      let json = await response.json();

      dispatch(fetchingAvatarSuccess(json));
    } catch (error) {
      console.log(error);
      dispatch(fetchingAvatarFailure(error));
    }
  };
};
