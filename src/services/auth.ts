import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signOut as logout,
  signInWithCredential,
  AuthCredential,
  User,
  updateProfile,
} from 'firebase/auth';
import {firebaseApp} from '../config/firebase';

export const auth = getAuth(firebaseApp);

export const signUp = async (email: string, password: string, name: string) => {
  await setPersistence(auth, inMemoryPersistence);
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredential.user, {displayName: name});

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

export const signOut = async () => {
  await logout(auth);
};

export const loginWithCredential = async (credential: AuthCredential) => {
  await setPersistence(auth, inMemoryPersistence);
  const userCredential = await signInWithCredential(auth, credential);

  return userCredential.user;
};

export const updateUser = async (
  user: User,
  data: {displayName?: string; photoUrl?: string},
) => {
  await updateProfile(user, data);
  await auth.updateCurrentUser(user);
};
