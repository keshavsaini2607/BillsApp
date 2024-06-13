import {Dispatch, SetStateAction, createContext} from 'react';
import {ClientInterface} from '../utils/Constants';

interface AuthContextInterface {
  user: any;
  setUser: Dispatch<SetStateAction<{}>>;
  clients: ClientInterface[];
  setClients: Dispatch<SetStateAction<[] | ClientInterface[]>>;
}

// Create a context with a default value
const AuthContext = createContext<AuthContextInterface>({
  user: {},
  setUser: () => {},
  clients: [],
  setClients: () => {},
});

export default AuthContext;
