
import {GOT_MESSAGES, GOT_NEW_MESSAGE } from '../actionTypes';
import socket from '../socket';

export const gotMessages = messages => ({ type: GOT_MESSAGES, messages });
export const gotNewMessage = message => ({ type: GOT_NEW_MESSAGE, message });
socket.on('priorMessages', messages => {
    dispatch(gotMessages(messages));
  });

  socket.on('incomingMessage', message => {
    console.log(message)
    dispatch(gotNewMessage(message));
  });
  
  socket.on('test', user => {
    console.log(user)
    return async dispatch => {
    dispatch(gotNewUser(user));
    }
  });
  export const openChat = msg => {
    try {
    socket.emit('join', msg )
      
    } catch (error) {
      console.log(error)
    }
    
  };
  export const sendMessage = (phone, message) => {
    return async dispatch => {
      dispatch(gotNewMessage(message));
    socket.emit('message', phone);
    }
  };
  