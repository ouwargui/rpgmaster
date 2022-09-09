import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Image,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {login, signUp} from '../services/auth';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const animatedFormValue = useSharedValue(0);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleAnimationState = () => {
    const screen60percentage = (Dimensions.get('screen').height * 70) / 100;
    animatedFormValue.value = withTiming(
      screen60percentage,
      {duration: 200},
      () => {
        animatedFormValue.value = withTiming(0, {duration: 200});
        runOnJS(setIsLogin)(!isLogin);
      },
    );
  };

  const animatedFormStyle = useAnimatedStyle(() => ({
    transform: [{translateY: animatedFormValue.value}],
  }));

  const handlePressForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const handlePressLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (e) {
      Alert.alert('Erro', 'E-mail ou senha inválidos');
    }
  };

  const handlePressSignup = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      await signUp(email, password);
    } catch (e) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar a sua conta');
    }
  };

  return (
    <View className="flex-1 bg-[#404040]">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="w-full h-2/6 justify-center items-center">
            <Image
              className="w-[128px] top-[10px] h-[128px]"
              source={{uri: 'https://i.imgur.com/beLyDnp.png'}}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.ScrollView
          style={[animatedFormStyle, {paddingBottom: bottom}]}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          className="flex-1 p-5 rounded-t-[35px] h-3/5 bg-white"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="never"
        >
          {isLogin ? (
            <LoginForm
              handlePressForgotPassword={handlePressForgotPassword}
              handleLogin={handlePressLogin}
              handleAnimationState={handleAnimationState}
            />
          ) : (
            <SignupForm
              handleSignup={handlePressSignup}
              handleAnimationState={handleAnimationState}
            />
          )}
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
