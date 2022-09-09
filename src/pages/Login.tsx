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
import {login} from '../services/auth';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {bottom} = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const animatedFormValue = useSharedValue(0);

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

  const handlePressForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const animatedFormStyle = useAnimatedStyle(() => ({
    transform: [{translateY: animatedFormValue.value}],
  }));

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
              email={email}
              setEmail={setEmail}
              handlePressForgotPassword={handlePressForgotPassword}
              handlePressLogin={handlePressLogin}
              handlePressSignup={handlePressSignup}
              isLoading={isLoading}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <SignupForm goBack={handlePressSignup} />
          )}
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
