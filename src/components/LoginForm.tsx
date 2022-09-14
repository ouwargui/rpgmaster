import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import LoginWithApple from './Auth/LoginWithApple';
import LoginWithGoogle from './Auth/LoginWithGoogle';
import Button from './Button';
import ControlledInput from './ControlledInput';
import FloatingActionButton from './FloatingActionButton/FloatingActionButton';

interface LoginFormProps {
  handlePressForgotPassword: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleAnimationState: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
});

const LoginForm: React.FC<LoginFormProps> = ({
  handlePressForgotPassword,
  handleLogin,
  handleAnimationState,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const handlePressLogin = async ({email, password}: LoginData) => {
    setIsLoading(true);
    await handleLogin(email, password);
    setIsLoading(false);
  };

  return (
    <>
      <View className="pt-5 justify-start items-center gap-4 mb-8">
        <Text className="text-[#404040] text-2xl font-semibold mb-2.5">
          Bem vindo à Taverna!
        </Text>
        <ControlledInput
          name="email"
          contentType="emailAddress"
          placeholder="E-mail"
          control={control}
          errors={errors.email}
        />
        <ControlledInput
          name="password"
          placeholder="Senha"
          contentType="password"
          control={control}
          errors={errors.password}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          className="self-end"
          onPress={handlePressForgotPassword}
        >
          <Text className="underline text-[#404040]">Esqueci minha senha.</Text>
        </TouchableOpacity>
        <View className="w-full justify-evenly items-center flex-row">
          <Button
            title="Entrar na taverna"
            onPress={handleSubmit(handlePressLogin)}
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
        className="rounded-[100px] border-[1px] border-[#eee] bg-[#fff] h-[36px] w-40 shadow-md
                shadow-[#00000071] bottom-[10px] self-center flex justify-center items-center flex-row"
        activeOpacity={0.6}
        onPress={handleAnimationState}
      >
        <Image
          className="w-[30px] h-[30px]"
          source={{uri: 'https://i.imgur.com/IYYKyQt.png'}}
        />
        <Text className="text-[#404040] font-semibold text-[14px]">
          Novo Taverneiro
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;
