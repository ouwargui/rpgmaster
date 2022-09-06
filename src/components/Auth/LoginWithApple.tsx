import React, {useEffect, useState} from 'react';
import * as AppleAuth from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import {OAuthProvider} from 'firebase/auth';
import {loginWithCredential} from '../../services/auth';

const LoginWithApple: React.FC = () => {
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);
  const nonce = Math.random().toString(36).substring(2, 10);

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

      await loginWithCredential(credential);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isAppleAuthAvailable && (
        <AppleAuth.AppleAuthenticationButton
          className="w-14 h-14"
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
