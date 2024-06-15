import React, {useContext, useEffect, useState} from 'react';
import AuthStack from '../../src/router/authStack';
import HomeTabs from './homeTabs';
import auth from '@react-native-firebase/auth';
import {View, ActivityIndicator} from 'react-native';
import AuthContext from '../context/AuthContext';

const RootRouter = () => {
  const {setUser, user} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    setIsLoggedIn(!!user);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
