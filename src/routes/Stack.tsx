import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import {useAuth} from '../hooks/useAuth';
import Login from '../pages/Login';
import PlayerSelect from '../pages/PlayerSelect';
import TabRouter from './Tab';

const Stack = createNativeStackNavigator();

const StackRouter: React.FC = () => {
  const {user} = useAuth();

  if (!user) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user.user ? (
        <>
          <Stack.Screen name="PlayerSelect" component={PlayerSelect} />
          <Stack.Screen name="Menu" component={TabRouter} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackRouter;
