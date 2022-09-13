import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';

const Tab = createBottomTabNavigator();

const TabRouter: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="ForgotPassword" component={ForgotPassword} />
  </Tab.Navigator>
);

export default TabRouter;
