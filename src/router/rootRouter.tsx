import React, {useEffect, useState} from 'react';
import AuthStack from '../../src/router/authStack';
import HomeTabs from './homeTabs';
import auth from '@react-native-firebase/auth';
import {View, ActivityIndicator, Alert} from 'react-native';

const RootRouter = () => {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = user => {
    setUser(user);
    setIsLoggedIn(!!user);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User is logged in:', user);
    } else {
      console.log('No user is logged in');
    }
  }, [user]);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <HomeTabs /> : <AuthStack />;
};

export default RootRouter;
