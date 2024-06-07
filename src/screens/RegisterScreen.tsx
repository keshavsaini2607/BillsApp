import React, { useState } from 'react'
import { Box, Button, Divider, Flex, FormControl, Heading, Input, Stack, Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'

const RegisterScreen = ({navigation}: any) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Box padding={4}>
            <Flex mb={10} direction='row' align='center' justify='space-between'>
                <Flex style={{ borderWidth: 1, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 40 }} borderColor={'gray.500'}>
                    <Icon
                        name="left"
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
                </Flex>
                <Heading>Register</Heading>
                <Text></Text>
            </Flex>
            <Heading>Hello There👋</Heading>
            <Text color={'gray.600'}>Start managing your funds more systematically.</Text>
            <FormControl mt={10}>
                <Stack space={2}>
                    <Stack>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                            type='text'
                            placeholder='Enter your full name'
                        />
                    </Stack>
                    <Stack>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            type='text'
                            placeholder='Enter your email address'
                        />
                    </Stack>
                    <Stack>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter your password'

                            rightElement={<Icon name={showPassword ? 'eye' : 'eyeo'} onPress={() => setShowPassword(p => !p)} style={{ marginRight: 10 }} size={25} />}
                        />
                    </Stack>
                    <Text fontSize={'xs'} color={'gray.500'}>Choose a strong password which is atleast 8 character long, contains a special character and a number</Text>
                    <Stack mt={5}>
                        <Button>Register</Button>
                    </Stack>
                </Stack>
            </FormControl>
            <Stack space={3} mt={10}>
                <Text alignSelf={'center'}>Already Registered? <Text color={'blue.700'} fontWeight={600}>Login</Text></Text>
                <Text alignSelf={'center'}>Or Continue With</Text>
                <Divider />
                <Box alignSelf={'center'} style={{ borderWidth: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 40 }} borderColor={'gray.500'}>
                    <Icon name="google" size={20} />
                </Box>
            </Stack>
        </Box>
    )
}

export default RegisterScreen