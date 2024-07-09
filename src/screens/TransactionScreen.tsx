import React, {useContext, useEffect, useState} from 'react';
import {
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  Pressable,
  FlatList,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Fab} from 'native-base';
import {TabTypes} from './AddTransactionScreen';
import {StyleSheet} from 'react-native';
import {getAllDocs} from '../utils/firebase';
import AuthContext from '../context/AuthContext';
import {TransactionInterface} from '../utils/Constants';
import TransactionCard from '../components/TransactionCard';

const TransactionScreen = ({navigation}: any) => {
  const {transactions} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.BillPayment);
  const [transactionList, setTransactionList] = useState<
    TransactionInterface[] | []
  >([]);

  useEffect(() => {
    if (activeTab) {
      const filter = transactions.filter(
        obj => obj.typeOfTransaction === activeTab,
      );

      setTransactionList(filter);
    }
  }, [activeTab, transactions]);

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
        <Heading>Transaction Records</Heading>
        <Text></Text>
      </Flex>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Pressable
          style={[
            styles.billTab,
            activeTab === TabTypes.BillPayment && styles.activeTab,
          ]}
          onPress={() => setActiveTab(TabTypes.BillPayment)}>
          <Text
            color={activeTab === TabTypes.BillPayment ? 'white' : 'gray.500'}>
            Bill Payment
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.billTab,
            activeTab === TabTypes.Spendings && styles.activeTab,
          ]}
          onPress={() => setActiveTab(TabTypes.Spendings)}>
          <Text color={activeTab === TabTypes.Spendings ? 'white' : 'gray.500'}>
            Spendings
          </Text>
        </Pressable>
      </Stack>
      <Stack mt={4}>
        <FlatList
          data={transactionList}
          renderItem={({item}) => <TransactionCard transaction={item} />}
          ItemSeparatorComponent={() => <Box mb={2} />}
          keyExtractor={item => item.id.toString()}
        />
      </Stack>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={() => navigation.navigate('AddTransaction')}
        icon={<Icon color="white" name="plus" size={20} />}
      />
    </Box>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  billTab: {
    width: '45%',
    backgroundColor: '#A3D8FF',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    fontWeight: 700,
  },
  activeTab: {
    backgroundColor: '#008DDA',
  },
});
