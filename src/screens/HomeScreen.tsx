import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import HomeHeader from '../components/HomeHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';
import BillCard from '../components/BillCard';
import TransactionCard from '../components/TransactionCard';

const HomeScreen = ({navigation}) => {
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
          <Heading fontSize={40}>₹20,021</Heading>
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
        <ScrollView
          horizontal
          flexDirection={'row'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.scrollViewContent}>
          <BillCard />
          <BillCard />
          <BillCard />
          <BillCard />
        </ScrollView>
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
          <Text fontSize={15} fontWeight={500} color={'#0175FF'}>
            Show More
          </Text>{' '}
          <Icon name="chevron-right" size={20} color={'#0175FF'} />
        </Flex>
      </Flex>
      <Stack p={2}>
        <TransactionCard />
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
