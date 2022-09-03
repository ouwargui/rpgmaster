import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import {useAuth} from '../contexts/AuthProvider';
import Login from '../pages/Login/Login';

const Stack = createStackNavigator();

const StackRouter: React.FC = () => {
  const user = useAuth();

  return (
    <Stack.Navigator>
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
