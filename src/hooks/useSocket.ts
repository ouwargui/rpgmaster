import {useContext} from 'react';
import {SocketContext} from '../contexts/SocketProvider';

export const useSocket = () => useContext(SocketContext);
