import {onAuthStateChanged, User} from 'firebase/auth';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {auth} from '../services/auth';

interface UserContextData {
  user: User | false | undefined;
  setUser: Dispatch<SetStateAction<User | false | undefined>>;
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as UserContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | false | undefined>();
  const [token, setToken] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        firebaseUser.getIdToken().then((idToken) => {
          setToken(idToken);
        });
        SplashScreen.hideAsync();
      } else {
        setUser(false);
        setToken('');
        SplashScreen.hideAsync();
      }
    });

    return unsubscribe;
  }, []);

  const returnValues = useMemo<UserContextData>(
    () => ({user, setUser, token}),
    [user, token],
  );

  return (
    <AuthContext.Provider value={returnValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
