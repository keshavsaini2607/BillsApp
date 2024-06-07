import React, { useState } from 'react'
import { Box, Button, Divider, Flex, FormControl, Heading, Input, Spacer, Stack, Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box padding={4}>
      <Flex mb={10} direction='row' align='center' justify='space-between'>
        <Box style={{ borderWidth: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 40 }} borderColor={'gray.500'}>
          <Icon
            name="left"
            size={20}
          />
        </Box>
        <Heading>Login</Heading>
        <Text></Text>
      </Flex>
      <Heading>Hello, Welcome Back👋</Heading>
      <Text color={'gray.600'}>Happy to see you here, please login here.</Text>
      <FormControl mt={10}>
        <Stack space={2}>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type='text'
              placeholder='Enter your email address'
            />
          </Stack>
          <Spacer />
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder='Enter your password'

              rightElement={<Icon name={showPassword ? 'eye' : 'eyeo'} onPress={() => setShowPassword(p => !p)} style={{ marginRight: 10 }} size={25} />}
            />
          </Stack>
          <Stack>
            <Flex>
              <Text style={{ width: 120, alignSelf: 'flex-end' }}>Forgot Password</Text>
            </Flex>
          </Stack>
          <Stack mt={5}>
            <Button>Login</Button>
          </Stack>
        </Stack>
      </FormControl>
      <Stack space={3} mt={10}>
        <Text alignSelf={'center'}>Don't have an account? <Text color={'blue.700'} fontWeight={600}>Register</Text></Text>
        <Text alignSelf={'center'}>Or Continue With</Text>
        <Divider />
        <Box alignSelf={'center'} style={{ borderWidth: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 40 }} borderColor={'gray.500'}>
          <Icon name="google" size={20} />        
        </Box>
      </Stack>
    </Box>
  )
}

export default LoginScreen