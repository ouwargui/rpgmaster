import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Container} from './Login.styles';

const Login: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
};

export default Login;
