import React, {ReactNode} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import FloatingActionItem from './FloatingActionItem';

interface FloatingActionButtonProps {
  children: ReactNode;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
}) => {
  const isOpen = useSharedValue(false);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isOpen.value ? '45deg' : '0deg'),
      },
    ],
  }));

  const handleToggleMenu = () => {
    isOpen.value = !isOpen.value;
    Haptics.selectionAsync();
  };

  return (
    <View className="absolute justify-center items-center">
      {React.Children.map(children, (child, index) => (
        <FloatingActionItem index={index + 1} isOpen={isOpen}>
          {child}
        </FloatingActionItem>
      ))}
      <Animated.View
        style={[buttonStyle]}
        className="absolute w-14 h-14 rounded-[100px] items-center justify-center shadow-xl shadow-[#00000071] bg-zinc-600"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="absolute w-full h-full justify-center items-center"
          onPress={handleToggleMenu}
        >
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default FloatingActionButton;
