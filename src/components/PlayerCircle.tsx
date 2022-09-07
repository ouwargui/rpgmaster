import React from 'react';
import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';

interface PlayerCircleProps {
  name: string;
  isActive: boolean;
  image: ImageSourcePropType;
}

const PlayerCircle: React.FC<PlayerCircleProps> = ({name, isActive, image}) => {
  console.log('a');

  return (
    <View className="flex-1 justify-center items-center mb-10">
      <TouchableOpacity
        activeOpacity={0.7}
        className={`w-32 h-32 rounded-[100px] mb-2 border-4 ${
          isActive ? 'border-green-600' : 'border-zinc-600'
        }`}
      >
        <Image className="w-full h-full rounded-[100px]" source={image} />
      </TouchableOpacity>
      <Text className="text-[#404040] text-lg font-semibold">{name}</Text>
    </View>
  );
};

export default PlayerCircle;
