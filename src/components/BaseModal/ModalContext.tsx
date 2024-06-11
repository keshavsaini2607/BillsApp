import {Dispatch, SetStateAction, createContext} from 'react';

interface ModalContextInterface {
  values: any;
  setValues: Dispatch<SetStateAction<{}>>;
}

// Create a context with a default value
const ModalContext = createContext<ModalContextInterface>({
  values: {},
  setValues: () => {},
});

export default ModalContext;
