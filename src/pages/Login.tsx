import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <View className="flex-1 justify-between">
            <View className="pt-20 justify-start items-center gap-4">
              <Input
                placeholder="Email"
                contentType="emailAddress"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                placeholder="Password"
                contentType="password"
                value={password}
                onChangeText={setPassword}
              />
              <View className="w-full justify-center items-center">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-full h-14 my-4 justify-center items-center bg-[#006E63]"
                >
                  <Text className="text-white">LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text className="text-white">
                    Don&apos;t have an account yet? Click here to sign up.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
