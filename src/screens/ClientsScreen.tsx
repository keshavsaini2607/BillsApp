import React, {useContext, useEffect, useState} from 'react';
import {Box, FlatList, Flex, Pressable, Skeleton, Text} from 'native-base';
import ContactCard from '../components/ContactCard';
import {getAllDocs} from '../utils/firebase';
import AuthContext from '../context/AuthContext';

const ClientsScreen = ({navigation}: any) => {
  const {user, clients, setClients} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const clientResults: any = await getAllDocs('Clients');
      if (clientResults) {
        const myClients = clientResults.filter(
          (client: any) => client.userId === user.uid,
        );
        setClients(myClients);
      }
    } catch (error) {
      console.log('error fetching clients', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <Box flex={1} background={'white'}>
      <Flex
        p={2}
        mt={5}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text fontSize={'3xl'} fontWeight={600}>
          Clients
        </Text>
        <Pressable onPress={() => navigation.navigate('AddClient')}>
          <Text fontSize={15} fontWeight={500} color={'#0175FF'}>
            Add New +
          </Text>
        </Pressable>
      </Flex>
      <Flex p={2}>
        {loading ? (
          <>
            <Skeleton h="20" mb={2} />
            <Skeleton h="20" mb={2} />
            <Skeleton h="20" mb={2} />
            <Skeleton h="20" mb={2} />
          </>
        ) : (
          <FlatList
            data={clients}
            renderItem={({item}) => <ContactCard client={item} />}
            ItemSeparatorComponent={() => <Box mb={2} />}
            keyExtractor={item => item.id}
          />
        )}
      </Flex>
    </Box>
  );
};

export default ClientsScreen;
