import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import {useAuth} from '../contexts/AuthProvider';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

const StackRouter: React.FC = () => {
  const user = useAuth();

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
      {user ? (
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
