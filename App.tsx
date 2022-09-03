import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import StackRouter from './src/routes/Stack';
import AuthProvider from './src/contexts/AuthProvider';

const App: React.FC = () => (
  <AuthProvider>
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackRouter />
    </NavigationContainer>
  </AuthProvider>
);

export default App;
