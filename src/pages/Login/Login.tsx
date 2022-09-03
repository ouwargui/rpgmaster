import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';

const Login: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-[#00141A]">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 p-5">
          <View className="w-full h-1/5 justify-center items-center">
            <Text className="text-white text-4xl">RPG MASTER</Text>
          </View>
          <View className="flex-1 pt-20 justify-start items-center flex-col gap-4">
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgb(161, 161, 170)"
              className="text-zinc-300 p-2 w-full h-14 bg-[#091B24] border-zinc-800 border-[1px]"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgb(161, 161, 170)"
              className="text-zinc-300 p-2 w-full h-14 bg-[#091B24] border-zinc-800 border-[1px]"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
