/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  Spacer,
  Stack,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    try {
      const {email, password} = formValues;
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in succesfully');
        })
        .catch(err => console.log('error signing up', err));
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <Box padding={4}>
      <Flex mb={10} direction="row" align="center" justify="space-between">
        <></>
        <Heading>Login</Heading>
        <></>
      </Flex>
      <Heading>Hello, Welcome Back👋</Heading>
      <Text color={'gray.600'}>Happy to see you here, please login here.</Text>
      <FormControl mt={10}>
        <Stack space={2}>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              placeholder="Enter your email address"
              onChangeText={text => setFormValues(p => ({...p, email: text}))}
            />
          </Stack>
          <Spacer />
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              onChangeText={text =>
                setFormValues(p => ({...p, password: text}))
              }
              rightElement={
                <Icon
                  name={showPassword ? 'eye' : 'eyeo'}
                  onPress={() => setShowPassword(p => !p)}
                  style={{marginRight: 10}}
                  size={25}
                />
              }
            />
          </Stack>
          <Stack>
            <Flex>
              <Text style={{width: 120, alignSelf: 'flex-end'}}>
                Forgot Password
              </Text>
            </Flex>
          </Stack>
          <Stack mt={5}>
            <Button onPress={handleLogin}>Login</Button>
          </Stack>
        </Stack>
      </FormControl>
      <Stack space={3} mt={10}>
        <Text alignSelf={'center'}>
          Don't have an account?{' '}
          <Text
            color={'blue.700'}
            fontWeight={600}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </Text>
        <Text alignSelf={'center'}>Or Continue With</Text>
        <Divider />
        <Box
          alignSelf={'center'}
          style={{
            borderWidth: 1,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
          }}
          borderColor={'gray.500'}>
          <Icon name="google" size={20} />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginScreen;
