import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  Flex,
  Heading,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import HomeHeader from '../components/HomeHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RefreshControl, StyleSheet} from 'react-native';
import BillCard from '../components/BillCard';
import TransactionCard from '../components/TransactionCard';
import AuthContext from '../context/AuthContext';
import {getAllDocs, getUserDocs} from '../utils/firebase';

const HomeScreen = ({navigation}: any) => {
  const {setClients, user, setBills, bills, transactions, setTransactions} =
    useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const fetchData = async () => {
    try {
      const clients: any = await getUserDocs('Clients', user.uid);
      if (clients) {
        setClients(clients);
      }
    } catch (error) {
      console.log('error fetching data', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response: any[] = await getAllDocs('Transactions');
      if (response) {
        setTransactions(response);
      }
    } catch (error) {
      console.log('error fetching bills', error);
    }
  };

  const fetchBills = async () => {
    try {
      console.log('fetching bills')
      const res: any = await getUserDocs('Bills', user.uid);
      setBills(res);
    } catch (error) {
      console.log('error fetching bills', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBills();
    fetchTransactions();
  }, [refreshing]);

  return (
    <Box padding={3} backgroundColor={'white'} flex={1}>
      <HomeHeader />
      <Flex
        mt={10}
        p={2}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Stack>
          <Text color={'gray.400'}>Your Balance This Month</Text>
          <Heading fontSize={40}>----</Heading>
        </Stack>
        <Stack>
          <Icon
            name="add-circle"
            color={'#0175FF'}
            size={50}
            style={style.shadowButton}
          />
        </Stack>
      </Flex>
      <Flex
        p={2}
        mt={5}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text fontSize={18} fontWeight={500}>
          Bills This Month
        </Text>
        <Pressable onPress={() => navigation.navigate('AddBill')}>
          <Text fontSize={15} fontWeight={500} color={'#0175FF'}>
            Add New +
          </Text>
        </Pressable>
      </Flex>
      <Stack>
        <FlatList
          data={bills}
          renderItem={({item}) => (
            <BillCard bill={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <Box mr={2} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.billId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Stack>
      <Flex
        p={2}
        mt={5}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text fontSize={18} fontWeight={500}>
          Transaction history
        </Text>
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Pressable onPress={() => navigation.navigate('Transaction')}>
            <Text fontSize={15} fontWeight={500} color={'#0175FF'}>
              Show More
            </Text>
          </Pressable>{' '}
          <Icon name="chevron-right" size={20} color={'#0175FF'} />
        </Flex>
      </Flex>
      <Stack p={2}>
        <FlatList
          data={transactions}
          renderItem={({item}) => <TransactionCard transaction={item} />}
          ItemSeparatorComponent={() => <Box mb={2} />}
          keyExtractor={item => item.id.toString()}
        />
      </Stack>
    </Box>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  shadowButton: {
    shadowColor: '#cdcdcd',
    elevation: 20,
  },
  scrollViewContent: {
    alignItems: 'center', // Ensure items are centered vertically
    paddingHorizontal: 10,
    gap: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
