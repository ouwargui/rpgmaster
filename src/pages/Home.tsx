import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import PlayerCircle from '../components/PlayerCircle';
import PlayerStatusBar from '../components/PlayerStatusBar';

interface PlayerProps {
  playerName: string;
  playerImage: ImageSourcePropType | null;
}

const Home: React.FC = () => {
  const [player, setPlayer] = useState<PlayerProps>({
    playerImage: null,
    playerName: '',
  });
  const [actual, setActual] = useState(20);
  const {params} = useRoute();

  useEffect(() => {
    setPlayer({...params} as PlayerProps);
  }, [params]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-1/4 flex-row border-b-[1px] border-black">
        <View className="px-3.5 justify-center items-center">
          <View className="w-32 h-32">
            <PlayerCircle isActive image={player.playerImage} />
          </View>
        </View>
        <View className="flex-1 justify-center items-start px-3.5">
          <Text className="text-[#404040] text-lg font-semibold pb-1">
            {player.playerName ?? 'Player 1'}
          </Text>
          <View className="pb-1 w-full">
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
      <View className="mt-4 mb-4 h-28">
        <FlatList
          data={[1, 2, 3, 4, 5]}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View className="h-full pl-4" />}
          ListFooterComponent={() => <View className="h-full pr-4" />}
          ItemSeparatorComponent={() => <View className="h-full px-2" />}
          renderItem={() => (
            <View className="w-20 h-20">
              <PlayerCircle isActive={false} />
              <View className="w-full pb-1 pt-2">
                <PlayerStatusBar
                  status="HP"
                  bgColor="bg-red-200"
                  highlightColor="bg-red-500"
                  max={20}
                  actual={actual}
                />
              </View>
              <View className="w-full">
                <PlayerStatusBar
                  status="MP"
                  bgColor="bg-blue-200"
                  highlightColor="bg-blue-500"
                  max={20}
                  actual={actual}
                />
              </View>
            </View>
          )}
        />
      </View>
      <Button title="-2" onPress={() => setActual(actual - 2)} />
    </SafeAreaView>
  );
};

export default Home;
