import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {getFirestore} from '@react-native-firebase/firestore';
import {useToast} from 'native-base';
import AuthContext from '../context/AuthContext';
import {getAllDocs} from '../utils/firebase';

const AddClientScreen = ({navigation}: any) => {
  const {user, setClients} = useContext(AuthContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const submitForm = async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      await db
        .collection('Clients')
        .add({...formValues, userId: user?.uid})
        .then(async (res: any) => {
          if (res) {
            toast.show({
              title: 'Saved Client Information',
              placement: 'bottom',
            });
            setFormValues({
              name: '',
              email: '',
              phone: '',
              address: '',
            });
            setLoading(false);
            const clientResults: any = await getAllDocs('Clients');
            if (clientResults) {
              const myClients = clientResults.filter(
                (client: any) => client.userId === user.uid,
              );
              setClients(myClients);
              navigation.navigate('Clients');
              console.log({clients});
            }
          }
        });
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} flex={1} background={'white'}>
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
          <FormControl.Label>Name</FormControl.Label>
          <Input
            placeholder="Name of the client"
            isRequired
            onChangeText={text => setFormValues(p => ({...p, name: text}))}
          />
        </Stack>
        <Stack>
          <FormControl.Label>Phone Number</FormControl.Label>
          <Input
            placeholder="Phone number"
            onChangeText={text => setFormValues(p => ({...p, phone: text}))}
          />
        </Stack>
        <Stack>
          <FormControl.Label>Email Address</FormControl.Label>
          <Input
            placeholder="Email address"
            onChangeText={text => setFormValues(p => ({...p, email: text}))}
          />
        </Stack>
        <Stack>
          <FormControl.Label>Address</FormControl.Label>
          <Input
            placeholder="Address"
            onChangeText={text => setFormValues(p => ({...p, address: text}))}
          />
        </Stack>
        <Button mt={4} onPress={submitForm} isLoading={loading}>
          Save Client
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddClientScreen;
