import React from 'react';
import {Avatar, Box, Flex, Heading, Stack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {Pressable} from 'react-native';

const SettingsScreen = ({navigation}: any) => {
  const handleLogout = () => {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      console.log('error logging out', error);
    }
  };
  return (
    <Box p={4} background={'white'} flex={1}>
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
        <Heading>Settings</Heading>
        <Text></Text>
      </Flex>
      <Flex direction="row" gap={5}>
        <Stack>
          <Avatar>KS</Avatar>
          <Text>Keshav</Text>
        </Stack>
        {/* <Flex alignItems={'center'}>
          <Avatar>+</Avatar>
          <Text>Add Profile</Text>
        </Flex> */}
      </Flex>
      <Stack mt={5}>
        <Flex direction="row" gap={3} p={2} alignItems={'center'}>
          <FaIcon name="language" size={40} />
          <Stack>
            <Text fontSize={'lg'}>Change Language</Text>
            <Text>Change your default app language</Text>
          </Stack>
        </Flex>
      </Stack>
      <Flex position={'absolute'} bottom={10} left={'50%'}>
        <Pressable onPress={handleLogout}>
          <Text fontWeight={'bold'} fontSize={'md'} color={'gray.600'}>
            Logout
          </Text>
        </Pressable>
      </Flex>
    </Box>
  );
};

export default SettingsScreen;
