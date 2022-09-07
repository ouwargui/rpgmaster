import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {signOut} from '../services/auth';

const Home: React.FC = () => {
  const {user} = useAuth();
  const handleSignout = async () => {
    await signOut();
  };
  return (
    <View>
      <Text>{`Olá ${user?.user?.displayName as string}`}</Text>
      <Image
        className="h-14 w-14"
        source={{uri: user?.user?.photoURL as string}}
      />
      <Button title="sign out" onPress={handleSignout} />
    </View>
  );
};

export default Home;
