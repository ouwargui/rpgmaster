import axios from 'axios';
import React, {createContext, ReactNode, useCallback, useMemo} from 'react';
import {Alert} from 'react-native';
import {apiClient, RequestMethods, RequestUrls} from '../api';
import {log} from '../config/logger';
import {useAuth} from '../hooks/useAuth';

export const ApiContext = createContext(
  {} as {
    makeRequest: <T extends Record<string, unknown>>(
      method: RequestMethods,
      url: RequestUrls,
      body?: Record<string, unknown>,
    ) => Promise<T | void>;
  },
);

interface ApiProviderProps {
  children: ReactNode;
}

const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
  const {signOut, user} = useAuth();

  const makeRequest = useCallback(
    async <T extends Record<string, unknown>>(
      method: RequestMethods,
      url: RequestUrls,
      body?: Record<string, unknown>,
    ): Promise<T | void> => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      };

      try {
        const response = await apiClient({
          method,
          url,
          data: body,
          headers,
        });

        return response.data as T;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const err = error;

          if (err.response?.status === 401) {
            return Alert.alert('Erro', 'Sessão expirada', [
              {text: 'OK', onPress: signOut},
            ]);
          }
        }

        log.error(error);

        return Alert.alert(
          'Erro',
          'Ocorreu um erro, tente novamente mais tarde',
        );
      }
    },
    [user, signOut],
  );

  const returnValues = useMemo(() => ({makeRequest}), [makeRequest]);

  return (
    <ApiContext.Provider value={returnValues}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
