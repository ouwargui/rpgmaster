import React from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import {useSocket} from '../hooks/useSocket';

const ForgotPassword: React.FC = () => {
  const {room, setRoom} = useSocket();

  return (
    <SafeAreaView>
      <Button
        title="entrar na sala 1234"
        onPress={() => {
          setRoom('1234');
        }}
      />
      <Text>{room}</Text>
    </SafeAreaView>
  );
};

export default ForgotPassword;
