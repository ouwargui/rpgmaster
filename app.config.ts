import 'dotenv/config';
import {ExpoConfig, ConfigContext} from '@expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'ouwargui',
  name: 'Taverna: RPG Helper',
  slug: 'taverna-rpg-helper',
  scheme: 'com.taverna.tavernarpghelper',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.taverna.tavernarpghelper',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.taverna.tavernarpghelper',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: '4baad125-fa08-4159-8f89-e8d96296a555',
    },
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
    IOS_CLIENT_ID: process.env.IOS_CLIENT_ID,
    SOCKET_URL: process.env.SOCKET_URL,
    API_URL: process.env.API_URL,
  },
});
