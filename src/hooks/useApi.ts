import {useContext} from 'react';
import {ApiContext} from '../contexts/ApiProvider';

export const useApi = () => ({
  api: useContext(ApiContext),
});
