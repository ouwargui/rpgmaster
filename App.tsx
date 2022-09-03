import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from 'styled-components/native';
import StackRouter from './src/routes/Stack';
import AuthProvider from './src/contexts/AuthProvider';
import theme from './src/theme/default';

const App: React.FC = () => (
  <AuthProvider>
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <StackRouter />
      </ThemeProvider>
    </NavigationContainer>
  </AuthProvider>
);

export default App;
