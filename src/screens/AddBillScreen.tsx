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
  Select,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import BaseModal from '../components/BaseModal';
import AddItem from '../components/Modals/AddItem';
import AuthContext from '../context/AuthContext';
import {FlatList} from 'react-native';

interface FormValues {
  client: string;
  orderItems: any[];
}

const AddBillScreen = ({navigation}: any) => {
  const {user} = useContext(AuthContext);
  console.log({user});
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

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Flex
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderWidth={1}
      p={2}
      borderColor={'gray.300'}
      borderRadius={5}
      mb={2}>
      <Stack>
        <Flex
          width={'full'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
            <Icon name="shoppingcart" size={20} />
            <Stack>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                Name of item
              </Text>
              <Text fontSize={'xs'}>{item?.itemName}</Text>
            </Stack>
          </Flex>
          <Icon name="right" size={20} />
        </Flex>
        <Flex
          width={'90%'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={2}>
          <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
            <MatIcon name="numbers" size={20} />
            <Stack>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                Number of items
              </Text>
              <Text fontSize={'xs'}>{item?.itemQuantity}</Text>
            </Stack>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
            <MatIcon name="price-check" size={20} />
            <Stack>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                Price per item
              </Text>
              <Text fontSize={'xs'}>{item?.itemPrice}</Text>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );

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
      <FormControl flex={1}>
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
        <Stack mt={3} flex={1}>
          <FormControl.Label>Order Items</FormControl.Label>
          <FlatList
            data={formValues.orderItems}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 40}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </Stack>
        <Button>Save Order</Button>
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
