import React from 'react';
import {Avatar, Flex, Stack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';
import {StyleSheet} from 'react-native';

const ContactCard = () => {
  return (
    <Flex
      flexDirection={'row'}
      gap={2}
      borderWidth={1}
      borderColor={'gray.200'}
      p={2}
      borderRadius={10}>
      <Avatar>SK</Avatar>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flex={1}>
        <Stack>
          <Text fontWeight={500} fontSize={'md'}>
            SK Clutch Delhi
          </Text>
          <Text fontSize={'xs'}>+917014015981</Text>
        </Stack>
        <Text fontWeight={500} fontSize={'md'}>
          View
        </Text>
      </Flex>
    </Flex>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  transactionIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'transparent',
    backgroundColor: '#FED5D5',
  },
});
