import io from 'socket.io-client';
const socket = io('http://13.127.117.128/');
socket.connect();
export default socket;
//13.127.117.128