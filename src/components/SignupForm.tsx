import React, {useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import ControlledInput from './ControlledInput';
import Button from './Button';
import FloatingActionButton from './FloatingActionButton/FloatingActionButton';
import LoginWithGoogle from './Auth/LoginWithGoogle';
import LoginWithApple from './Auth/LoginWithApple';

interface SignupFormProps {
  handleAnimationState: () => void;
  handleSignup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const scheme = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatório'),
  confirmPassword: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
});

const SignupForm: React.FC<SignupFormProps> = ({
  handleAnimationState,
  handleSignup,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>({
    resolver: yupResolver(scheme),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePressSignup = async ({name, email, password}: SignupFormData) => {
    setIsLoading(true);
    await handleSignup(name, email, password);
    setIsLoading(false);
  };

  return (
    <View className="pt-5 justify-start items-center gap-4">
      <View className="flex-row w-full mb-2.5 justify-center">
        <TouchableOpacity
          activeOpacity={0.4}
          className="mr-auto"
          onPress={handleAnimationState}
        >
          <Feather name="arrow-left" size={32} color="#404040" />
        </TouchableOpacity>
        <Text className="mr-auto text-[#404040] text-2xl font-semibold">
          Novo Taverneiro
        </Text>
      </View>
      <View className="flex-1 w-full">
        <View className="w-full mb-4">
          <ControlledInput
            control={control}
            name="name"
            placeholder="Nome"
            errors={errors.name}
          />
        </View>
        <View className="w-full mb-4">
          <ControlledInput
            control={control}
            name="email"
            placeholder="E-mail"
            contentType="emailAddress"
            errors={errors.email}
          />
        </View>
        <View className="w-full mb-4">
          <ControlledInput
            control={control}
            name="password"
            placeholder="Senha"
            contentType="password"
            errors={errors.password}
          />
        </View>
        <View className="w-full mb-4">
          <ControlledInput
            control={control}
            name="confirmPassword"
            placeholder="Confirme a sua senha"
            contentType="password"
            errors={errors.confirmPassword}
          />
        </View>
      </View>
      <View className="w-full justify-evenly items-center flex-row">
        <Button
          title="Continuar"
          isLoading={isLoading}
          onPress={handleSubmit(handlePressSignup)}
        />
        <View>
          <FloatingActionButton>
            <LoginWithGoogle />
            {Platform.OS === 'ios' && <LoginWithApple />}
          </FloatingActionButton>
        </View>
      </View>
    </View>
  );
};

export default SignupForm;
