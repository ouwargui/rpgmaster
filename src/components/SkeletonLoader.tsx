import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonLoaderProps {
  rounded?: boolean;
  width: number;
}

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  rounded = true,
  width = 150,
}) => {
  const animatedLgValue = useSharedValue(0);
  const animatedLgStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(animatedLgValue.value, [0, 1], [-width, width]),
      },
    ],
  }));

  useEffect(() => {
    animatedLgValue.value = withRepeat(
      withTiming(1, {duration: 1000}),
      Infinity,
    );
  }, [animatedLgValue]);

  return (
    <View
      className={`w-full h-full bg-[#a0a0a0] items-center justify-center overflow-hidden ${
        rounded ? 'rounded-[100px]' : ''
      }`}
      style={StyleSheet.absoluteFill}
    >
      <AnimatedLG
        colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[StyleSheet.absoluteFill, animatedLgStyle]}
      />
    </View>
  );
};

export default SkeletonLoader;
