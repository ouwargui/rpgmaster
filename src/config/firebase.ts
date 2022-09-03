import {FirebaseApp, initializeApp} from 'firebase/app';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.FIREBASE_API_KEY as string,
  authDomain: Constants.manifest?.extra?.FIREBASE_AUTH_DOMAIN as string,
  projectId: Constants.manifest?.extra?.FIREBASE_PROJECTID as string,
  storageBucket: Constants.manifest?.extra?.FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: Constants.manifest?.extra
    ?.FIREBASE_MESSAGING_SENDER_ID as string,
  appId: Constants.manifest?.extra?.FIREBASE_APP_ID as string,
  measurementId: Constants.manifest?.extra?.FIREBASE_MEASUREMENT_ID as string,
};

class Firebase {
  private static FIREBASE_APP: FirebaseApp;

  public static getInstance(): FirebaseApp {
    if (!Firebase.FIREBASE_APP) {
      Firebase.FIREBASE_APP = initializeApp(firebaseConfig);
    }
    return Firebase.FIREBASE_APP;
  }
}

const firebaseApp = Firebase.getInstance();

export {firebaseApp};
