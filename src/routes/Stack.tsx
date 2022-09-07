import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import {useAuth} from '../hooks/useAuth';
import Login from '../pages/Login';

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
        headerStyle: {
          backgroundColor: '#00141A',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      }}
    >
      {user.user ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackRouter;
