import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/Home';

const Stack = createStackNavigator();

const StackRouter: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default StackRouter;
