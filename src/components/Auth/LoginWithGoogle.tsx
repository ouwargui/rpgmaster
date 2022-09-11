import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import {GoogleAuthProvider, OAuthCredential} from 'firebase/auth';
import {loginWithCredential} from '../../services/auth';
import googleLogo from '../../../assets/google-logo.png';
import {RequestUrls} from '../../api';
import {useApi} from '../../hooks/useApi';

WebBrowser.maybeCompleteAuthSession();

const LoginWithGoogle: React.FC = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.manifest?.extra
      ?.FIREBASE_GOOGLEAUTH_CLIENT_ID as string,
  });
  const {api} = useApi();

  const login = useCallback(
    async (credential: OAuthCredential) => {
      const user = await loginWithCredential(credential);
      await api.makeRequest('POST', RequestUrls.CREATE_USER, {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      });
    },
    [api],
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const {id_token} = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      login(credential);
    }
  }, [response, login]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full h-full justify-center items-center"
      onPress={() => promptAsync()}
      disabled={!request}
    >
      <Image
        className="w-1/2 h-1/2"
        source={googleLogo as ImageSourcePropType}
      />
    </TouchableOpacity>
  );
};

export default LoginWithGoogle;
