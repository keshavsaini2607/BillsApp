/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {Avatar, Box, Flex, Stack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeHeader = () => {
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
              Keshav Saini
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
