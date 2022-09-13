import React, {useEffect, useState} from 'react';
import * as AppleAuth from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import {OAuthProvider} from 'firebase/auth';
import {loginWithCredential} from '../../services/auth';
import {RequestUrls} from '../../api';
import {useApi} from '../../hooks/useApi';
import {log} from '../../config/logger';

const LoginWithApple: React.FC = () => {
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);
  const nonce = Math.random().toString(36).substring(2, 10);
  const {api} = useApi();

  useEffect(() => {
    const setAppleAuthAvailability = async () => {
      const appleAuthAvailability = await AppleAuth.isAvailableAsync();
      setIsAppleAuthAvailable(appleAuthAvailability);
    };

    setAppleAuthAvailability();
  }, []);

  const handleAppleLogin = async () => {
    try {
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
      );

      const {identityToken} = await AppleAuth.signInAsync({
        requestedScopes: [
          AppleAuth.AppleAuthenticationScope.FULL_NAME,
          AppleAuth.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: identityToken!,
        rawNonce: nonce,
      });

      const user = await loginWithCredential(credential);
      await api.makeRequest('POST', RequestUrls.CREATE_USER, {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      });
    } catch (e) {
      log.error(e);
    }
  };

  return (
    <>
      {isAppleAuthAvailable && (
        <AppleAuth.AppleAuthenticationButton
          className="w-full h-full"
          buttonType={AppleAuth.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuth.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={30}
          onPress={handleAppleLogin}
        />
      )}
    </>
  );
};

export default LoginWithApple;
