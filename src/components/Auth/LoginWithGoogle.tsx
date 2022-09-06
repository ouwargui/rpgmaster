import React, {useEffect} from 'react';
import {TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import {GoogleAuthProvider} from 'firebase/auth';
import {loginWithCredential} from '../../services/auth';
import googleLogo from '../../../assets/google-logo.png';

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
    <TouchableOpacity
      activeOpacity={0.7}
      className="shadow-xl shadow-[#00000071] w-14 h-14 bg-zinc-600 rounded-[100px] justify-center items-center"
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
