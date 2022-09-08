import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  ImageSourcePropType,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import player1 from '../../assets/player1.png';
import player2 from '../../assets/player2.png';
import PlayerSelectCircle from '../components/PlayerSelectCircle';

interface PlayerCircleData {
  id: string;
  name?: string;
  image?: ImageSourcePropType;
  isActive?: boolean;
  isAddPlayer?: boolean;
}

const DATA: PlayerCircleData[] = [
  {
    id: '1',
    name: 'Batoré Adams',
    isActive: true,
    image: player1 as ImageSourcePropType,
  },
  {
    id: '2',
    name: 'Katniss Hill',
    isActive: false,
    image: player2 as ImageSourcePropType,
  },
  {
    id: '3',
    name: 'Aika AFHSJADSA',
    isActive: false,
    image: player1 as ImageSourcePropType,
  },
  {
    id: '4',
    name: 'Diego Costa',
    isActive: false,
    image: player2 as ImageSourcePropType,
  },
  {
    id: '5',
    name: 'Darwin Núñez',
    isActive: false,
    image: player2 as ImageSourcePropType,
  },
];

const PlayerSelect: React.FC = () => {
  const navigation = useNavigation();
  const [players, setPlayers] = useState<PlayerCircleData[]>([]);
  const {top, bottom} = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const allPlayers = [...DATA, {id: '6', isAddPlayer: true}];
    setPlayers(allPlayers);
  }, []);

  const renderHeader = () => (
    <View className="justify-center items-center pt-10">
      <Text className="text-[#404040] text-2xl font-semibold mb-10">
        Escolha seu personagem
      </Text>
    </View>
  );

  const renderItem: ListRenderItem<PlayerCircleData> = ({item}) => (
    <PlayerSelectCircle
      image={item.image}
      gameActive={item.isActive}
      name={item.name}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Menu' as never,
              params: {
                screen: 'Home',
                params: {playerName: item.name, playerImage: item.image},
              },
            },
          ],
        })
      }
    />
  );

  const renderFooter = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="self-center flex-row gap-2 justify-center items-center"
    >
      <Text className="text-[#404040] text-2xl font-semibold">
        Quero mestrar
      </Text>
      <Feather name="arrow-right-circle" size={24} color="#404040" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: top,
          paddingBottom: bottom,
        }}
        data={players}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PlayerSelect;
