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
import {login} from '../services/auth';
import Button from '../components/Button';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handlePressLogin = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handlePressSignup = () => {
    navigation.navigate('Signup' as never);
  };

  const handlePressForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const handlePressLoginAsGuest = () => {
    navigation.navigate('LoginAsGuest' as never);
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
              <TouchableOpacity
                activeOpacity={0.6}
                className="self-end"
                onPress={handlePressForgotPassword}
              >
                <Text className="underline text-white">
                  Forgot your password?
                </Text>
              </TouchableOpacity>
              <View className="w-full justify-center items-center">
                <Button
                  title="LOGIN"
                  disabled={!email || !password}
                  onPress={handlePressLogin}
                  isLoading={isLoading}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handlePressSignup}
                >
                  <Text className="underline text-white">
                    Don&apos;t have an account yet? Click here to sign up.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-full justify-center items-center flex-row gap-2"
              onPress={handlePressLoginAsGuest}
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
