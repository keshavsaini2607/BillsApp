import {Dispatch, SetStateAction, createContext} from 'react';
import {
  BillInterface,
  ClientInterface,
  TransactionInterface,
} from '../utils/Constants';

interface AuthContextInterface {
  user: any;
  setUser: Dispatch<SetStateAction<{}>>;
  clients: ClientInterface[];
  setClients: Dispatch<SetStateAction<[] | ClientInterface[]>>;
  setBills: Dispatch<SetStateAction<[] | BillInterface[]>>;
  bills: BillInterface[];
  transactions: TransactionInterface[];
  setTransactions: Dispatch<SetStateAction<[] | TransactionInterface[]>>;
}

// Create a context with a default value
const AuthContext = createContext<AuthContextInterface>({
  user: {},
  setUser: () => {},
  clients: [],
  setClients: () => {},
  setBills: () => {},
  bills: [],
  transactions: [],
  setTransactions: () => {},
});

export default AuthContext;
