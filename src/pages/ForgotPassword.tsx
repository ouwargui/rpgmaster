import React from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import {useGameController} from '../hooks/useGameController';
import {useSocket} from '../hooks/useSocket';

const ForgotPassword: React.FC = () => {
  const {setGameRoom, gameRoom} = useGameController();
  const {isConnected} = useSocket();

  return (
    <SafeAreaView>
      <Button
        title="entrar na sala 1234"
        onPress={() => {
          setGameRoom(gameRoom === '1234' ? '4321' : '1234');
        }}
      />
      <Text>{gameRoom}</Text>
      <Text>{isConnected ? 'true' : 'false'}</Text>
    </SafeAreaView>
  );
};

export default ForgotPassword;
