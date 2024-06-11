import {Text} from 'react-native';
import React from 'react';
import {Box, Button} from 'native-base';
import auth from '@react-native-firebase/auth';

const SettingsScreen = () => {
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
    <Box p={2}>
      <Text>SettingsScreen</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};

export default SettingsScreen;
