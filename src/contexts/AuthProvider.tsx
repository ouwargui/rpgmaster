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
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as UserContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | false | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        SplashScreen.hideAsync();
      } else {
        setUser(false);
        SplashScreen.hideAsync();
      }
    });

    return unsubscribe;
  }, []);

  const returnValues = useMemo<UserContextData>(
    () => ({user, setUser}),
    [user],
  );

  return (
    <AuthContext.Provider value={returnValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
