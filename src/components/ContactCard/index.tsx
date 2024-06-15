import React from 'react';
import {Avatar, Flex, Stack, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {ClientInterface} from '../../utils/Constants';

interface props {
  client: ClientInterface;
}

const ContactCard: React.FC<props> = ({client}) => {
  return (
    <Flex
      flexDirection={'row'}
      gap={2}
      borderWidth={1}
      borderColor={'gray.200'}
      alignItems={'center'}
      p={2}
      borderRadius={10}>
      <Avatar>{client.name.slice(0, 2).toLocaleUpperCase()}</Avatar>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flex={1}>
        <Stack>
          <Text fontWeight={500} fontSize={'md'}>
            {client.name}
          </Text>
          <Text fontSize={'xs'}>+91{client.phone}</Text>
          <Text fontSize={'xs'}>{client.email}</Text>
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
