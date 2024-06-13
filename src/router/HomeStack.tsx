import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddBillScreen from '../screens/AddBillScreen';
import AddClientScreen from '../screens/AddClientScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddBill" component={AddBillScreen} />
      <Stack.Screen name="AddClient" component={AddClientScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
