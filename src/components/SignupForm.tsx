import React, {useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Input from './Input';
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

const SignupForm: React.FC<SignupFormProps> = ({
  handleAnimationState,
  handleSignup,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePressSignup = async () => {
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
      <View className="flex-1 w-full mb-8">
        <View className="w-full mb-4">
          <Input placeholder="Nome" value={name} onChangeText={setName} />
        </View>
        <View className="w-full mb-4">
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            contentType="emailAddress"
          />
        </View>
        <View className="w-full mb-4">
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            contentType="password"
          />
        </View>
        <View className="w-full mb-4">
          <Input
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            contentType="password"
          />
        </View>
      </View>
      <View className="w-full justify-evenly items-center flex-row">
        <Button
          title="Continuar"
          disabled={
            !name || !email || !password || password !== confirmPassword
          }
          isLoading={isLoading}
          onPress={handlePressSignup}
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
