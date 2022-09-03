import {onAuthStateChanged, User} from 'firebase/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {auth} from '../services/auth';

const AuthContext = createContext({} as User | undefined);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('logado');
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
