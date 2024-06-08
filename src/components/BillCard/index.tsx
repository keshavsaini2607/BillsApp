import React, {useEffect, useState} from 'react';
import {Avatar, Box, Flex, Stack, Text} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';

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

const BillCard = () => {
  const [accentColor, setAccentColor] = useState(BgColors[0]);
  const getRandomBg = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    return BgColors[randomNumber];
  };

  useEffect(() => {
    const color = getRandomBg();
    setAccentColor(color);
  }, []);

  return (
    <Box
      borderWidth={1}
      style={[
        styles.cardContainer,
        {
          backgroundColor: accentColor?.primary,
          borderColor: accentColor?.secondary || '#cdcdcd',
        },
      ]}>
      <Flex flexDirection={'row'} alignItems={'center'} gap={1}>
        <Text style={{height: 20, width: 2, backgroundColor: '#cdcdcd'}}></Text>
        <Avatar size={6}>SK</Avatar>
      </Flex>
      <Stack mt={2}>
        <Text fontSize={'xs'}>No. Of Items:</Text>
        <Text fontWeight={600}>10</Text>
      </Stack>
      <Stack mt={1}>
        <Text fontSize={'xs'}>Total Bill Amount:</Text>
        <Text fontWeight={600}>₹52,000</Text>
      </Stack>
    </Box>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('screen').width / 3,
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    height: '95%',
    // Make sure other border properties do not conflict with borderLeftColor
  },
});
