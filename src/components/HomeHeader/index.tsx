/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Flex, Stack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../context/AuthContext';
import {getCurrentUser} from '../../utils/firebase';

const HomeHeader = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      (async () => {
        const res: any = await getCurrentUser(user?.uid, 'id');
        if (res) {
          console.log({res});
          setLoggedInUser(res[0]);
        }
      })();
    }
  }, [user]);
  return (
    <View>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
          <Avatar>KS</Avatar>
          <Stack>
            <Text fontSize={12} color={'gray.900'}>
              Good Morning
            </Text>
            <Text fontSize={16} fontWeight={600}>
              {loggedInUser?.name}
            </Text>
          </Stack>
        </Flex>
        <Box
          borderWidth={1}
          style={{
            borderWidth: 1,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
          }}
          borderColor={'gray.400'}>
          <Icon name="notifications-outline" size={25} color={'#000'} />
        </Box>
      </Flex>
    </View>
  );
};

export default HomeHeader;
