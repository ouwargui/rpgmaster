import React, {createContext, ReactNode, useEffect} from 'react';
import {log} from '../config/logger';

const GameControllerContext = createContext(null);

interface GameControllerProviderProps {
  children: ReactNode;
}

const GameControllerProvider: React.FC<GameControllerProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    log.debug('teste');
  }, []);

  return (
    <GameControllerContext.Provider value={null}>
      {children}
    </GameControllerContext.Provider>
  );
};

export default GameControllerProvider;
