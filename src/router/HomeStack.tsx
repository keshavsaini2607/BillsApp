import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddBillScreen from '../screens/AddBillScreen';
import AddClientScreen from '../screens/AddClientScreen';
import TransactionScreen from '../screens/TransactionScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import ClientDetailsScreen from '../screens/ClientDetailsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddBill" component={AddBillScreen} />
      <Stack.Screen name="AddClient" component={AddClientScreen} />
      <Stack.Screen name="Transaction" component={TransactionScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="ClientDetails" component={ClientDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
