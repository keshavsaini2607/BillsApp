import React, {useEffect, useState} from 'react';
import {Avatar, Box, Flex, Pressable, Stack, Text} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import {BillInterface} from '../../utils/Constants';
import {getUser} from '../../utils/firebase';

const BgColors = [
  {
    primary: '#F6F5FC',
    secondary: '#E6E4FA',
  },
  {
    primary: '#F3F4F6',
    secondary: '#DCDFE4',
  },
  {
    primary: '#FFF9F1',
    secondary: '#FFEDD3',
  },
];

interface props {
  bill: BillInterface;
  navigation: any;
}

const BillCard: React.FC<props> = ({navigation, bill}: any) => {
  const [accentColor, setAccentColor] = useState(BgColors[0]);
  const [client, setClient] = useState<any>(null);
  const getRandomBg = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    return BgColors[randomNumber];
  };

  const getClientData = async () => {
    try {
      const res: any = await getUser(bill.client, 'id');
      setClient(res[0]);
    } catch (error) {
      console.log('error getting user', error);
    }
  };

  useEffect(() => {
    const color = getRandomBg();
    setAccentColor(color);
    getClientData();
  }, []);


  return (
    <Pressable
      onPress={() =>
        navigation.navigate('AddBill', {
          client: bill.client,
          orderItems: bill.orderItems,
          billId: bill.billId,
        })
      }
      borderWidth={1}
      style={[
        styles.cardContainer,
        {
          backgroundColor: accentColor?.primary,
          borderColor: accentColor?.secondary || '#cdcdcd',
        },
      ]}>
      <Box>
        <Flex flexDirection={'row'} alignItems={'center'} gap={1}>
          <Text
            style={{height: 20, width: 2, backgroundColor: '#cdcdcd'}}></Text>
          <Avatar size={6}>{client?.name[0]?.toLocaleUpperCase()}</Avatar>
        </Flex>
        <Stack mt={2}>
          <Text fontSize={'xs'}>No. Of Items:</Text>
          <Text fontWeight={600}>{bill.orderItems.length}</Text>
        </Stack>
        <Stack mt={1}>
          <Text fontSize={'xs'}>Total Bill Amount:</Text>
          <Text fontWeight={600}>₹{bill.totalBillAmount}</Text>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('screen').width / 3,
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    height: '100%',
    // Make sure other border properties do not conflict with borderLeftColor
  },
});
