import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  Flex,
  FormControl,
  Heading,
  Stack,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Select} from 'native-base';
import BaseModal from '../components/BaseModal';
import AddItem from '../components/Modals/AddItem';
import AuthContext from '../context/AuthContext';

interface FormValues {
  client: string;
  orderItems: any[];
}

const AddBillScreen = ({navigation}: any) => {
  const {user} = useContext(AuthContext);
  console.log({user})
  const [formValues, setFormValues] = useState<FormValues>({
    client: '',
    orderItems: [],
  });
  const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
    console.log('Updated orderItems:', formValues.orderItems);
  }, [formValues.orderItems]);

  const handleModalClose = (values: any) => {
    if (values && Object.keys(values).length > 0) {
      setFormValues(prevFormValues => ({
        ...prevFormValues,
        orderItems: [...(prevFormValues.orderItems || []), values],
      }));
    }
    setShowAddItem(false);
    console.log('values===>', values);
  };

  return (
    <Box flex={1} background={'white'} p={4}>
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
        <Heading>Add New Bill</Heading>
        <Text></Text>
      </Flex>
      <FormControl>
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
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </Box>
        </Stack>
        <Stack mt={3}>
          <Button variant={'subtle'} onPress={() => setShowAddItem(true)}>
            Add Item +
          </Button>
        </Stack>
        <Stack mt={3}>
          <FormControl.Label>Order Items</FormControl.Label>
          <Flex gap={4}>
            {formValues?.orderItems?.map((orderItem, idx) => (
              <Flex
                key={idx}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                borderWidth={1}
                p={2}
                borderColor={'gray.300'}
                borderRadius={5}>
                <Text fontSize={'lg'}>{orderItem?.itemName}</Text>
                <Flex>
                  <Text fontSize={'xs'} color={'gray.400'}>
                    (Price Per Piece * Number of Items)
                  </Text>
                  <Flex flexDirection={'row'}>
                    <Text>{orderItem?.itemPrice}</Text>*
                    <Text>{orderItem?.itemQuantity}</Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Stack>
      </FormControl>
      <BaseModal
        isOpen={showAddItem}
        onClose={handleModalClose}
        heading="Add Order Item">
        <AddItem />
      </BaseModal>
    </Box>
  );
};

export default AddBillScreen;
