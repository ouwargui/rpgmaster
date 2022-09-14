import {Dispatch, SetStateAction} from 'react';
import {log} from '../../config/logger';
import {onJoinedRoomData, OnLeftRoomData} from './models';

const onConnect = (setIsConnected: Dispatch<SetStateAction<boolean>>) => {
  log.debug('Connected to socket');
  setIsConnected(true);
};

const onDisconnect = (setIsConnected: Dispatch<SetStateAction<boolean>>) => {
  log.debug('Disconnected from socket');
  setIsConnected(false);
};

const onConnectError = (error: Error) => {
  if (error.message === 'Not authorized') {
    log.error('Not authorized to connect to socket');
  }
};

const onJoinedRoom = (data: onJoinedRoomData) => {
  log.debug(data);
  log.debug(`${data.user} joined room ${data.room}`);
};

const onLeftRoom = (data: OnLeftRoomData) => {
  log.debug(`${data.user} left room ${data.room}`);
};

export {onConnect, onDisconnect, onConnectError, onJoinedRoom, onLeftRoom};
