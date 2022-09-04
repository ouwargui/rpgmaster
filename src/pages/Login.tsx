import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Input from '../components/Input';
import {login, loginAnonymously} from '../services/auth';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handlePressLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

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
                  className={`w-full h-14 my-4 justify-center items-center ${
                    !email || !password ? 'bg-zinc-600' : 'bg-[#006E63]'
                  }`}
                  onPress={handlePressLogin}
                  disabled={!email || !password}
                >
                  <Text className="text-white font-bold">LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text className="text-white">
                    Don&apos;t have an account yet? Click here to sign up.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-full justify-center items-center flex-row gap-2"
              onPress={() => loginAnonymously()}
            >
              <Text className="text-white text-lg">Continue as a guest</Text>
              <Feather name="arrow-right-circle" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
