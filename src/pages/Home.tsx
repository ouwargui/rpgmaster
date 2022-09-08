import React, {useState} from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import PlayerCircle from '../components/PlayerCircle';
import PlayerStatusBar from '../components/PlayerStatusBar';
import {useAuth} from '../hooks/useAuth';
import {signOut} from '../services/auth';

const Home: React.FC = () => {
  const {user} = useAuth();
  const [actual, setActual] = useState(20);
  const handleSignout = async () => {
    await signOut();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1/4 flex-row">
        <View className="px-3.5 justify-center items-center">
          <View className="w-32 h-32">
            <PlayerCircle isActive image={user?.user?.photoURL} />
          </View>
        </View>
        <View className="flex-1 justify-center items-start px-3.5">
          <Text className="text-[#404040] text-lg font-semibold pb-4">
            {user?.user?.displayName ?? 'Player 1'}
          </Text>
          <View className="pb-4 w-full">
            <PlayerStatusBar
              status="HP"
              bgColor="bg-red-200"
              highlightColor="bg-red-500"
              max={20}
              actual={actual}
              large
            />
          </View>
          <View className="w-full">
            <PlayerStatusBar
              bgColor="bg-blue-200"
              highlightColor="bg-blue-500"
              status="MP"
              max={20}
              actual={actual}
              large
            />
          </View>
        </View>
      </View>
      <Button title="-2 hp" onPress={() => setActual(actual - 2)} />
    </SafeAreaView>
  );
};

export default Home;
