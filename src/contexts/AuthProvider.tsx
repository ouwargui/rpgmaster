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

export const AuthContext = createContext(
  {} as {user: User | undefined} | undefined,
);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<{user: User | undefined}>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({user: firebaseUser});
      } else {
        setUser({user: undefined});
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
