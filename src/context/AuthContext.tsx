import {Dispatch, SetStateAction, createContext} from 'react';

interface AuthContextInterface {
  user: any;
  setUser: Dispatch<SetStateAction<{}>>;
}

// Create a context with a default value
const AuthContext = createContext<AuthContextInterface>({
  user: {},
  setUser: () => {},
});

export default AuthContext;
