import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {login, signOut} from '../services/auth';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    try {
      await login(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <View>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleCadastro} />
      <Button title="sign out" onPress={handleSignout} />
    </View>
  );
};

export default Signup;
