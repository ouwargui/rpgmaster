import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Input from '../components/Input';
import {login} from '../services/auth';
import Button from '../components/Button';
import FloatingActionButton from '../components/FloatingActionButton/FloatingActionButton';
import LoginWithGoogle from '../components/Auth/LoginWithGoogle';
import LoginWithApple from '../components/Auth/LoginWithApple';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {bottom} = useSafeAreaInsets();

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

  return (
    <View className="flex-1 bg-[#404040]">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <View className="w-full h-2/6 justify-center items-center">
            <Image
              className="w-[128px] top-[10px] h-[128px]"
              source={{uri: 'https://i.imgur.com/beLyDnp.png'}}
            />
          </View>
          <View className="flex-1 p-5 rounded-t-[35px] justify-between h-3/5 bg-white">
            <View className="pt-5 justify-start items-center gap-4">
              <Text className="text-[#404040] text-2xl font-semibold mb-2.5">
                Bem vindo à Taverna!
              </Text>
              <Input
                placeholder="Login"
                contentType="emailAddress"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                placeholder="Senha"
                contentType="password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                className="self-end"
                onPress={handlePressForgotPassword}
              >
                <Text className="underline text-[#404040]">
                  Esqueci minha senha.
                </Text>
              </TouchableOpacity>
              <View className="w-full justify-evenly items-center flex-row">
                <Button
                  title="Entrar na taverna"
                  disabled={!email || !password}
                  onPress={handlePressLogin}
                  isLoading={isLoading}
                />
                <View>
                  <FloatingActionButton>
                    <LoginWithGoogle />
                    {Platform.OS === 'ios' && <LoginWithApple />}
                  </FloatingActionButton>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{marginBottom: bottom}}
              className="rounded-[100px] border-[1px] border-[#eee] bg-[#fff] h-[36px] w-40 shadow-md
                shadow-[#00000071] bottom-[10px] self-center flex justify-center items-center flex-row"
              activeOpacity={0.6}
              onPress={handlePressSignup}
            >
              <Image
                className="w-[30px] h-[30px]"
                source={{uri: 'https://i.imgur.com/IYYKyQt.png'}}
              />
              <Text className="text-[#404040] font-semibold text-[14px]">
                Novo Taverneiro
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;
