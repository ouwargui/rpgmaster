import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import StackRouter from './src/routes/Stack';
import AuthProvider from './src/contexts/AuthProvider';
import ApiProvider from './src/contexts/ApiProvider';
import GameControllerProvider from './src/contexts/GameControllerProvider';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => (
  <AuthProvider>
    <ApiProvider>
      <GameControllerProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <StackRouter />
        </NavigationContainer>
      </GameControllerProvider>
    </ApiProvider>
  </AuthProvider>
);

export default App;
