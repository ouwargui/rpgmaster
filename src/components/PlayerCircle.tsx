import React from 'react';
import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface PlayerCircleProps {
  name?: string;
  gameActive?: boolean;
  image?: ImageSourcePropType;
  onPress?: () => void;
  isAddPlayer?: boolean;
}

const PlayerCircle: React.FC<PlayerCircleProps> = ({
  name,
  gameActive,
  image,
  onPress,
  isAddPlayer,
}) => (
  <View className="flex-1 justify-center items-center mb-10">
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`w-32 h-32 rounded-[100px] mb-2 border-4 justify-center items-center ${
        gameActive ? 'border-green-500' : 'border-zinc-900'
      }`}
    >
      {image && !isAddPlayer ? (
        <Image className="w-full h-full rounded-[100px]" source={image} />
      ) : (
        <View className="w-full h-full rounded-[100px] bg-zinc-600 justify-center items-center">
          <Feather name="plus" size={40} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
    <Text className="text-[#404040] text-lg font-semibold">
      {name ?? 'Adicionar'}
    </Text>
  </View>
);

export default PlayerCircle;
