import React from 'react';
import {View, Text, Button} from 'react-native';
import {signOut} from '../../services/auth';

const Home: React.FC = () => {
  const handleSignout = async () => {
    await signOut();
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="sign out" onPress={handleSignout} />
    </View>
  );
};

export default Home;
