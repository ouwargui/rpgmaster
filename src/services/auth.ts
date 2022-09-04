import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signOut as logout,
  signInAnonymously,
} from 'firebase/auth';
import {firebaseApp} from '../config/firebase';

export const auth = getAuth(firebaseApp);

export const signUp = async (email: string, password: string) => {
  await setPersistence(auth, inMemoryPersistence);
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};

export const login = async (email: string, password: string) => {
  await setPersistence(auth, inMemoryPersistence);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};

export const loginAnonymously = async () => {
  await setPersistence(auth, inMemoryPersistence);
  const userCredential = await signInAnonymously(auth);

  return userCredential.user;
};

export const signOut = async () => {
  await logout(auth);
};
