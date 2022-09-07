import React, {ReactNode} from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface FloatingActionButtonProps {
  index: number;
  children: ReactNode;
  isOpen: SharedValue<boolean>;
  bgColor?: string;
}

const FloatingActionItem: React.FC<FloatingActionButtonProps> = ({
  index,
  children,
  isOpen,
  bgColor,
}) => {
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{translateY: withTiming(isOpen.value ? -60 * index : 0)}],
    opacity: withTiming(isOpen.value ? 1 : 0),
  }));

  return (
    <Animated.View
      style={[buttonStyle]}
      className={`absolute w-12 h-12 rounded-[100px] items-center justify-center shadow-xl shadow-[#00000071] bg-[${
        bgColor ?? '#fff'
      }]`}
    >
      {children}
    </Animated.View>
  );
};

export default FloatingActionItem;
