import React, {useContext} from 'react';
import {Flex, Stack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';
import {StyleSheet} from 'react-native';
import {TransactionInterface} from '../../utils/Constants';
import AuthContext from '../../context/AuthContext';
import moment from 'moment';

interface props {
  transaction: TransactionInterface;
}

const TransactionCard: React.FC<props> = ({transaction}) => {
  const {clients} = useContext(AuthContext);
  const getClientName = (clientId: string) => {
    return clients.find(val => val.id === clientId)?.name;
  };
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
            {getClientName(transaction?.client) || transaction?.reasonOfPayment}
          </Text>
          <Text fontSize={'xs'}>
            {moment(transaction?.dateOfPayment).format('DD/MM/YYYY')}
          </Text>
        </Stack>
        <Stack alignItems={'center'}>
          <Text
            fontWeight={500}
            fontSize={'md'}
            style={transaction?.amountReceived ? styles.credit : styles.debit}>
            ₹{transaction?.amountReceived || transaction?.amountSent}
          </Text>
          <Text>{transaction?.mode}</Text>
        </Stack>
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
  debit: {
    color: 'red',
  },
  credit: {
    color: 'green',
  },
});
