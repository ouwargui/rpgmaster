import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface InputProps {
  contentType?: 'emailAddress' | 'password';
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  contentType,
  placeholder,
  value,
  onChangeText,
  ...props
}) => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <View
      className="
        px-2
        w-full
        h-14
        bg-[#091B24]
        border-zinc-800
        border-[1px]
        rounded-md
        justify-start
        items-center
        flex-row
      "
      {...props}
    >
      <TextInput
        className={`h-full text-zinc-300 ${
          contentType === 'password' ? 'w-11/12' : 'w-full'
        }`}
        keyboardAppearance="dark"
        placeholderTextColor="rgb(161, 161, 170)"
        textContentType={contentType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        selectTextOnFocus
        secureTextEntry={contentType === 'password' && !viewPassword}
      />
      {contentType === 'password' && (
        <TouchableOpacity
          activeOpacity={0.6}
          className="flex-1 h-full justify-center items-center"
          onPress={() => setViewPassword(!viewPassword)}
        >
          {!viewPassword ? (
            <Feather name="eye" size={24} color="rgb(161, 161, 170)" />
          ) : (
            <Feather name="eye-off" size={24} color="rgb(161, 161, 170)" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
