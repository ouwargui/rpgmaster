import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

interface GameControllerContextData {
  gameRoom: string;
  setGameRoom: Dispatch<SetStateAction<string>>;
}

export const GameControllerContext = createContext(
  {} as GameControllerContextData,
);

interface GameControllerProviderProps {
  children: ReactNode;
}

const GameControllerProvider: React.FC<GameControllerProviderProps> = ({
  children,
}) => {
  const [gameRoom, setGameRoom] = useState('');

  const returnValues = useMemo(
    () => ({gameRoom, setGameRoom}),
    [gameRoom, setGameRoom],
  );

  return (
    <GameControllerContext.Provider value={returnValues}>
      {children}
    </GameControllerContext.Provider>
  );
};

export default GameControllerProvider;
