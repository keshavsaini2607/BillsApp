import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  Flex,
  FormControl,
  Heading,
  Input,
  Pressable,
  Select,
  Stack,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import AuthContext from '../context/AuthContext';

export enum TabTypes {
  'BillPayment' = 'Bill Payment',
  'Spendings' = 'Spendings',
}

const paymentModes = ['Cash', 'Bank', 'UPI'];

const AddTransactionScreen = ({navigation}: any) => {
  const {clients} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.BillPayment);

  const [formValues, setFormValues] = useState({
    client: '',
    mode: '',
    amountReceived: '',
    amountSent: '',
    reasonOfPayment: '',
  });

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
        <Heading>New Transaction</Heading>
        <Text></Text>
      </Flex>
      <FormControl.Label>Type of Transaction</FormControl.Label>
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
      {activeTab === TabTypes.BillPayment && (
        <Stack>
          <FormControl.Label>Select Client</FormControl.Label>
          <Box>
            <Select
              selectedValue={formValues.client}
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                setFormValues(p => ({...p, client: itemValue}))
              }>
              {clients.map(client => (
                <Select.Item
                  key={client.id}
                  label={client.name}
                  value={client.id}
                />
              ))}
            </Select>
          </Box>
        </Stack>
      )}
      <Stack>
        <FormControl.Label>Mode Of Payment</FormControl.Label>
        <Box>
          <Select
            selectedValue={formValues.mode}
            accessibilityLabel="Mode of payment"
            placeholder="Mode of payment"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue =>
              setFormValues(p => ({...p, mode: itemValue}))
            }>
            {paymentModes.map(mode => (
              <Select.Item key={mode} label={mode} value={mode} />
            ))}
          </Select>
        </Box>
      </Stack>
      {activeTab === TabTypes.BillPayment && (
        <Stack>
          <FormControl.Label>Amount Received</FormControl.Label>
          <Input
            value={formValues.amountReceived}
            placeholder="Amount received in INR"
          />
        </Stack>
      )}
      {activeTab === TabTypes.Spendings && (
        <Stack>
          <FormControl.Label>Amount Spent</FormControl.Label>
          <Input
            value={formValues.amountSent}
            placeholder="Amount received in INR"
          />
        </Stack>
      )}
      {activeTab === TabTypes.Spendings && (
        <Stack>
          <FormControl.Label>Reason of payment</FormControl.Label>
          <Input
            value={formValues.reasonOfPayment}
            placeholder="Reason for payment"
          />
        </Stack>
      )}
      <Stack
        position={'absolute'}
        bottom={5}
        width={'full'}
        alignSelf={'center'}>
        <Button>Save Transaction</Button>
      </Stack>
    </Box>
  );
};

export default AddTransactionScreen;

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
