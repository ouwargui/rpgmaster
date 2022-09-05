import {onAuthStateChanged, User} from 'firebase/auth';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {auth} from '../services/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as User | undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('logado');
        console.log(firebaseUser);
        setUser(firebaseUser);
      } else {
        console.log('deslogado');
        setUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  const returnValues = useMemo(() => user, [user]);

  return (
    <AuthContext.Provider value={returnValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
