import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  isLoading,
  onPress,
  title,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className={`w-60 rounded-[100px] shadow-xl
    shadow-[#00000071] h-14 my-4 justify-center items-center ${
      disabled ? 'bg-zinc-600' : 'bg-[#404040]'
    }`}
    onPress={onPress}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text className="text-white font-bold">{title}</Text>
    )}
  </TouchableOpacity>
);

export default Button;
