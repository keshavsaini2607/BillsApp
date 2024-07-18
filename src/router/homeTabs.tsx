import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ClientsScreen from '../screens/ClientsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeStack from './HomeStack';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Clients') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? '#0175FF' : '#cdcdcd'}
            />
          );
        },
        tabBarActiveTintColor: '#0175FF',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Clients" component={ClientsScreen} />
      <Tab.Screen name="Reports" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
