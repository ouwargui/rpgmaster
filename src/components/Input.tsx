import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {FieldError} from 'react-hook-form';

interface InputProps {
  contentType?: 'emailAddress' | 'password';
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  errors?: FieldError;
}

const Input: React.FC<InputProps> = ({
  contentType,
  placeholder,
  value,
  onChangeText,
  onBlur,
  errors,
  ...props
}) => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <View>
      <View
        className={`
          px-2
          w-full
          h-14
          bg-[#fff]
          border-[#c7c7c7b8]
          rounded-[11px]
          justify-start
          items-center
          flex-row
          shadow-md
          shadow-[#00000071]
          ${errors ? 'border-[#ff0000] border' : ''}
        `}
        {...props}
      >
        <TextInput
          className={`h-full text-zinc-500 ${
            contentType === 'password' ? 'w-11/12' : 'w-full'
          }`}
          keyboardAppearance="dark"
          placeholderTextColor="rgb(161, 161, 170)"
          textContentType={contentType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
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
              <Feather
                name="eye"
                size={24}
                color={`${errors ? '#ff0000' : 'rgb(161, 161, 170)'}`}
              />
            ) : (
              <Feather
                name="eye-off"
                size={24}
                color={`${errors ? '#ff0000' : 'rgb(161, 161, 170)'}`}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errors && (
        <Text className="px-4 pt-2 text-[#ff0000] text-sm">
          {errors.message ?? ''}
        </Text>
      )}
    </View>
  );
};

export default Input;
