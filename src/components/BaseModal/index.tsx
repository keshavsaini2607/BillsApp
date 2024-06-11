import React, {useEffect, useState} from 'react';
import {Modal} from 'native-base';
import ModalContext from './ModalContext';

interface BaseModalInterface {
  isOpen: boolean;
  onClose: (values: any) => void;
  children: React.ReactNode;
  heading: string;
}

const BaseModal: React.FC<BaseModalInterface> = ({
  isOpen,
  onClose,
  children,
  heading,
}) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (values) {
      onClose(values);
    }
  }, [values]);

  return (
    <ModalContext.Provider value={{values, setValues}}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{heading}</Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal.Content>
      </Modal>
    </ModalContext.Provider>
  );
};

export default BaseModal;
