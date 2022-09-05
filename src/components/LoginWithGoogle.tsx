import React, {useEffect} from 'react';
import {Button} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import {GoogleAuthProvider} from 'firebase/auth';
import {loginWithCredential} from '../services/auth';

WebBrowser.maybeCompleteAuthSession();

const LoginWithGoogle: React.FC = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.manifest?.extra
      ?.FIREBASE_GOOGLEAUTH_CLIENT_ID as string,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const {id_token} = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      loginWithCredential(credential);
    }
  }, [response]);

  return (
    <Button disabled={!request} title="google" onPress={() => promptAsync()} />
  );
};

export default LoginWithGoogle;
