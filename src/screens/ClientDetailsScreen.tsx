import {
  Avatar,
  Box,
  FlatList,
  Flex,
  HStack,
  Heading,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthContext from '../context/AuthContext';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BillInterface} from '../utils/Constants';
import BillCard from '../components/BillCard';

const ClientDetailsScreen = ({navigation, route}: any) => {
  const {clientId} = route.params;
  const {clients, bills} = useContext(AuthContext);
  const [clientDetails, setClientDetails] = useState<any>();
  const [clientOrders, setClientOrders] = useState<BillInterface[] | any[]>([]);
  console.log({clientDetails})

  useEffect(() => {
    if (clients && clientId) {
      const client = clients.find(client => client.id === clientId);
      setClientDetails(client);
      const clientBill = bills?.filter(bill => bill.client === clientId);
      setClientOrders(clientBill);
    }
  }, [clients, clientId, bills]);

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
        <Heading>Client Details</Heading>
        <Text></Text>
      </Flex>
      <Flex direction="row" gap={2} alignItems={'center'}>
        <Avatar>
          {`${clientDetails?.name?.split('')[0]}${
            clientDetails?.name?.split('')[1]
          }`}
        </Avatar>
        <Stack>
          <Text>{clientDetails?.name}</Text>
          <Text>{clientDetails?.email}</Text>
          <Text>Balance Amount: INR {clientDetails?.amountBalance}</Text>
        </Stack>
      </Flex>
      <TouchableOpacity style={styles.flexRow}>
        <HStack alignItems={'center'}>
          <Icon name="phone" size={20} style={styles.roundBorder} />
          <Text style={styles.ml}>{clientDetails?.phone}</Text>
        </HStack>
        <Text color={'primary.400'}>Make a call</Text>
      </TouchableOpacity>
      <Text fontSize={18} mb={2} textTransform={'capitalize'}>
        {clientDetails?.name?.split(' ')[0]}'s bills({clientOrders?.length})
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} paddingBottom={200}>
        <Flex flexWrap="wrap" direction="row" gap={4}>
          {clientOrders &&
            clientOrders?.map((bill, idx) => (
              <Box key={idx} mr={2} style={{height: 140}}>
                <BillCard bill={bill} navigation={navigation} />
              </Box>
            ))}
        </Flex>
      </ScrollView>
    </Box>
  );
};

export default ClientDetailsScreen;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#cdcdcd',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  ml: {
    marginLeft: 5,
  },
  roundBorder: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 50,
    padding: 4,
  },
});
