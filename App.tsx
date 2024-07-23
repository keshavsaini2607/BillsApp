import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RootRouter from './src/router/rootRouter';
import AuthContext from './src/context/AuthContext';
import {
  BillInterface,
  ClientInterface,
  TransactionInterface,
} from './src/utils/Constants';

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#0175FF',
      100: '#0175FF',
      200: '#0175FF',
      300: '#0175FF',
      400: '#0175FF',
      500: '#0175FF', // Updated primary color
      600: '#0175FF',
      700: '#0175FF',
      800: '#0175FF',
      900: '#0175FF',
    },
  },
});

const App = () => {
  const [user, setUser] = useState({});
  const [clients, setClients] = useState<ClientInterface[] | []>([]);
  const [bills, setBills] = useState<BillInterface[] | []>([]);
  const [transactions, setTransactions] = useState<TransactionInterface[] | []>(
    [],
  );
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={customTheme}>
        <AuthContext.Provider
          value={{
            user,
            setUser,
            clients,
            setClients,
            bills,
            setBills,
            transactions,
            setTransactions,
          }}>
          <RootRouter />
        </AuthContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
