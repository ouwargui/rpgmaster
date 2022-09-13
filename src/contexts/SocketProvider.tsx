import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {log} from '../config/logger';
import {socket} from '../config/socket';
import {useAuth} from '../hooks/useAuth';

interface SocketContextData {
  room: string | null;
  setRoom: Dispatch<SetStateAction<string | null>>;
}

export const SocketContext = createContext({} as SocketContextData);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
  const [room, setRoom] = useState<string | null>(null);
  const {user} = useAuth();

  useEffect(() => {
    socket.on('connect', () => log.debug('conectei'));
    socket.on('disconnect', () => log.debug('desconectei'));

    socket.on('user_connected', (data) => {
      log.info('recebi user_connected');
      log.info(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    if (room) {
      log.info('enviei socket join_room');
      socket.emit('join_room', {room, user: user.user});
    }
  }, [room, user]);

  useEffect(() => {
    if (user.token) {
      socket.auth = {token: user.token};
    }
  }, [user.token]);

  const returnValues = useMemo(() => ({room, setRoom}), [room]);

  return (
    <SocketContext.Provider value={returnValues}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
