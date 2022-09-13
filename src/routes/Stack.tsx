import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../hooks/useAuth';
import Auth from '../pages/Auth';
import ForgotPassword from '../pages/ForgotPassword';
import PlayerSelect from '../pages/PlayerSelect';
import TabRouter from './Tab';

const Stack = createNativeStackNavigator();

const StackRouter: React.FC = () => {
  const {user} = useAuth();

  if (!user.user && user.user !== false) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user.user === false && (
        <>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
      {user.user && (
        <>
          <Stack.Screen name="PlayerSelect" component={PlayerSelect} />
          <Stack.Screen name="Menu" component={TabRouter} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackRouter;
