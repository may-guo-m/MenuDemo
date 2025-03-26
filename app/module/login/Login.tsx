import { useAction } from '@wonder/core-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { loginActions } from '.';
import { withSafeArea } from '../../component/SafeAreaHOC';

const Login = withSafeArea(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsButtonEnabled(text.length > 0);
  };

  const login = useAction(loginActions.login, email, password);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.accountText}>Don't have an account?</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Button
        title="Log in"
        onPress={() => login()}
        disabled={!isButtonEnabled}
        color={isButtonEnabled ? '#008000' : '#ccc'}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 15,
  },
});

export default Login;
