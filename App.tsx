import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {ColorMode, NativeBaseProvider, StorageManager} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootRouter from './src/router/rootRouter';
import AuthContext from './src/context/AuthContext';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

const App = () => {
  const [user, setUser] = useState({});
  return (
    <NavigationContainer>
      <NativeBaseProvider colorModeManager={colorModeManager}>
        <AuthContext.Provider value={{user, setUser}}>
          <RootRouter />
        </AuthContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
