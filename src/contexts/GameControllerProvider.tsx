import React, {createContext, ReactNode, useEffect} from 'react';
import {socket} from '../config/socket';

const GameControllerContext = createContext(null);

interface GameControllerProviderProps {
  children: ReactNode;
}

const GameControllerProvider: React.FC<GameControllerProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    socket.on('connect', () => console.log('conectei'));
  }, []);

  return (
    <GameControllerContext.Provider value={null}>
      {children}
    </GameControllerContext.Provider>
  );
};

export default GameControllerProvider;
