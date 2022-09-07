import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import StackRouter from './src/routes/Stack';
import AuthProvider from './src/contexts/AuthProvider';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => (
  <AuthProvider>
    <NavigationContainer>
      <StatusBar style="light" />
      <StackRouter />
    </NavigationContainer>
  </AuthProvider>
);

export default App;
