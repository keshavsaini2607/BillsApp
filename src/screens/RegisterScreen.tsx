import React, {useState} from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    const {email, password, name} = formValues;
    if (email && password) {
      try {
        const {user} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        if (name) {
          const db = getFirestore();

          await db.collection('Users').add({
            email: user.email,
            id: user.uid,
            name: name,
          });
          console.log('User added to Firestore');
        } else {
          console.log('Name is required to add user to Firestore.');
        }
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else {
          console.error(error);
        }
      }
    } else {
      console.log('Email and password are required.');
    }
  };

  return (
    <Box padding={4}>
      <Flex mb={10} direction="row" align="center" justify="space-between">
        <Flex
          style={{
            borderWidth: 1,
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
          }}
          borderColor={'gray.500'}>
          <Icon name="left" size={20} onPress={() => navigation.goBack()} />
        </Flex>
        <Heading>Register</Heading>
        <Text></Text>
      </Flex>
      <Heading>Hello There👋</Heading>
      <Text color={'gray.600'}>
        Start managing your funds more systematically.
      </Text>
      <FormControl mt={10}>
        <Stack space={2}>
          <Stack>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              onChangeText={text => setFormValues(p => ({...p, name: text}))}
              value={formValues.name}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              placeholder="Enter your email address"
              onChangeText={text => setFormValues(p => ({...p, email: text}))}
              value={formValues.email}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              onChangeText={text =>
                setFormValues(p => ({...p, password: text}))
              }
              value={formValues.password}
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
          <Text fontSize={'xs'} color={'gray.500'}>
            Choose a strong password which is at least 8 characters long,
            contains a special character and a number
          </Text>
          <Stack mt={5}>
            <Button onPress={handleSignup}>Register</Button>
          </Stack>
        </Stack>
      </FormControl>
      <Stack space={3} mt={10}>
        <Text alignSelf={'center'}>
          Already Registered?{' '}
          <Text
            color={'blue.700'}
            fontWeight={600}
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
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

export default RegisterScreen;
