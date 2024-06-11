import React from 'react';
import {Box, Flex, Text} from 'native-base';
import ContactCard from '../components/ContactCard';

const ClientsScreen = () => {
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
        <Text fontSize={15} fontWeight={500} color={'#0175FF'}>
          Add New +
        </Text>
      </Flex>
      <Flex p={2}>
        <ContactCard />
      </Flex>
    </Box>
  );
};

export default ClientsScreen;
