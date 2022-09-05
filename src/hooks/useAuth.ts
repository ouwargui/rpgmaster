import {useContext} from 'react';
import {getAuth} from 'firebase/auth';
import {login, signOut, signUp} from '../services/auth';
import {AuthContext} from '../contexts/AuthProvider';
import {firebaseApp} from '../config/firebase';

export const useAuth = () => ({
  user: useContext(AuthContext),
  login,
  signUp,
  signOut,
  auth: getAuth(firebaseApp),
});
