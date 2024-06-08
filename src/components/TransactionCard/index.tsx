import React from 'react';
import {Flex, Stack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';
import {StyleSheet} from 'react-native';

const TransactionCard = () => {
  return (
    <Flex
      flexDirection={'row'}
      gap={2}
      borderWidth={1}
      borderColor={'gray.200'}
      p={2}
      borderRadius={10}>
      <Stack borderWidth={1} style={styles.transactionIcon}>
        <Icon name="money-symbol" size={30} />
      </Stack>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flex={1}>
        <Stack>
          <Text fontWeight={500} fontSize={'md'}>
            Transport
          </Text>
          <Text fontSize={'xs'}>Sunday 8th June, 2024</Text>
        </Stack>
        <Text fontWeight={500} fontSize={'md'}>
          ₹990
        </Text>
      </Flex>
    </Flex>
  );
};

export default TransactionCard;

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
