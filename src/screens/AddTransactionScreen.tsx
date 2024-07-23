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
  useToast,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import AuthContext from '../context/AuthContext';
import {getAllDocs, getUser, saveForm, updateForm} from '../utils/firebase';
import uuid from 'react-native-uuid';
import moment from 'moment';

export enum TabTypes {
  'BillPayment' = 'Bill Payment',
  'Spendings' = 'Spendings',
}

const paymentModes = ['Cash', 'Bank', 'UPI'];

const AddTransactionScreen = ({navigation}: any) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {clients, setTransactions} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.BillPayment);

  const [formValues, setFormValues] = useState({
    client: '',
    mode: '',
    amountReceived: '',
    amountSent: '',
    reasonOfPayment: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const clientDetails: any = await getUser(formValues.client, 'id');
      const body = {
        id: uuid.v4(),
        ...formValues,
        typeOfTransaction: activeTab,
        dateOfPayment: moment.now(),
      };

      const response: any = await saveForm('Transactions', body);
      if (response) {
        toast.show({
          title: 'Transaction Saved',
        });
        if (activeTab === TabTypes.BillPayment) {
          const trxnAmount = parseInt(formValues.amountReceived, 10);
          const balanceAmount: number =
            clientDetails[0].amountBalance - trxnAmount;

          if (!isNaN(balanceAmount)) {
            await updateForm(
              'Clients',
              {
                amountBalance: balanceAmount,
              },
              formValues.client,
              'id',
            );
          }
        }
        const res: any[] = await getAllDocs('Transactions');
        if (response) {
          setTransactions(res);
        }
        navigation.goBack();
      }
    } catch (error) {
      console.log('error saving transaction', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
              accessibilityLabel="Select Client"
              placeholder="Select Client"
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
              bg: '#cdcdcd',
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
            keyboardType="numeric"
            value={formValues.amountReceived}
            onChangeText={text =>
              setFormValues(p => ({...p, amountReceived: text}))
            }
            placeholder="Amount received in INR"
          />
        </Stack>
      )}
      {activeTab === TabTypes.Spendings && (
        <Stack>
          <FormControl.Label>Amount Spent</FormControl.Label>
          <Input
            value={formValues.amountSent}
            onChangeText={text =>
              setFormValues(p => ({...p, amountSent: text}))
            }
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
            onChangeText={text =>
              setFormValues(p => ({...p, reasonOfPayment: text}))
            }
          />
        </Stack>
      )}
      <Stack
        position={'absolute'}
        bottom={5}
        width={'full'}
        alignSelf={'center'}>
        <Button isLoading={loading} onPress={handleSubmit}>
          Save Transaction
        </Button>
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
    backgroundColor: '#0175FF',
  },
});
