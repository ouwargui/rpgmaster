import {io} from 'socket.io-client';
import Constants from 'expo-constants';

const SOCKET_URL = Constants.manifest?.extra?.SOCKET_URL as string;

if (!SOCKET_URL) {
  throw new Error('SOCKET_URL is not defined');
}

const socket = io(SOCKET_URL);

export {socket};
