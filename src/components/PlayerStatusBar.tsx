import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface PlayerStatusBarProps {
  actual: number;
  max: number;
  status: string;
  bgColor: string;
  highlightColor: string;
  large?: boolean;
}

const PlayerStatusBar: React.FC<PlayerStatusBarProps> = ({
  actual,
  max,
  bgColor,
  highlightColor,
  status,
  large,
}) => {
  const [width, setWidth] = useState(0);
  const lineAnimatedValue = useSharedValue(0);

  const lineAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: withTiming(lineAnimatedValue.value, {duration: 500})},
    ],
  }));

  useEffect(() => {
    lineAnimatedValue.value = -width + (width * actual) / max;
  }, [width, lineAnimatedValue, actual, max]);

  return (
    <View className="w-full">
      {large && <Text>{`${status}: ${actual}/${max}`}</Text>}
      <View
        className={`w-full ${large ? 'h-5' : 'h-2'} ${bgColor} overflow-hidden`}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          className={`absolute h-full w-full ${highlightColor}`}
          style={[lineAnimatedStyle]}
        />
      </View>
    </View>
  );
};

export default PlayerStatusBar;
