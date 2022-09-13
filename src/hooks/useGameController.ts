import {useContext} from 'react';
import {GameControllerContext} from '../contexts/GameControllerProvider';

export const useGameController = () => useContext(GameControllerContext);
