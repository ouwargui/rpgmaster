import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {socket} from '../config/socket';
import {useAuth} from '../hooks/useAuth';
import {useGameController} from '../hooks/useGameController';
import {join_room, leave_room} from '../sockets/emitters';
import {
  onConnect,
  onConnectError,
  onDisconnect,
  onJoinedRoom,
  onLeftRoom,
} from '../sockets/listeners';

interface SocketContextData {
  isConnected: boolean;
}

export const SocketContext = createContext({} as SocketContextData);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
  const [isConnected, setIsConnected] = useState(false);
  const {gameRoom} = useGameController();
  const {user} = useAuth();

  useEffect(() => {
    socket.on('connect', () => onConnect(setIsConnected));
    socket.on('disconnect', () => onDisconnect(setIsConnected));
    socket.on('connect_error', onConnectError);

    socket.on('joined_room', onJoinedRoom);
    socket.on('left_room', onLeftRoom);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    if (gameRoom) {
      join_room(socket, gameRoom);
      return;
    }

    leave_room(socket);
  }, [gameRoom]);

  useEffect(() => {
    if (user.user) {
      socket.auth = {user: user.user.uid, token: user?.token};
      socket.connect();
    }
  }, [user]);

  const returnValues = useMemo(() => ({isConnected}), [isConnected]);

  return (
    <SocketContext.Provider value={returnValues}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
