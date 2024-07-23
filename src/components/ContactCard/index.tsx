import React from 'react';
import {Avatar, Flex, Stack, Text} from 'native-base';
import {Pressable, StyleSheet} from 'react-native';
import {ClientInterface} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/AntDesign';

interface props {
  client: ClientInterface;
  navigation: any;
}

const ContactCard: React.FC<props> = ({client, navigation}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ClientDetails', {clientId: client.id})
      }>
      <Flex
        flexDirection={'row'}
        gap={2}
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
          <Icon name="right" size={20} />
        </Flex>
      </Flex>
    </Pressable>
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
