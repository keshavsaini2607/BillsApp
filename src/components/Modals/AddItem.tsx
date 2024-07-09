import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, FormControl, Input, Stack} from 'native-base';
import ModalContext from '../BaseModal/ModalContext';
import {BillItem} from '../../utils/Constants';

interface props {
  item: BillItem | null;
}

const AddItem: React.FC<props> = ({item}) => {
  const {setValues} = useContext(ModalContext);
  const [formValues, setFormValues] = useState({
    itemName: '',
    itemPrice: '',
    itemQuantity: '',
  });

  useEffect(() => {
    if (item) {
      setFormValues({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemQuantity: item.itemQuantity,
      });
    }
  }, [item]);

  const handleSubmit = () => {
    setValues(formValues);
  };
  return (
    <Box>
      <FormControl>
        <Stack>
          <FormControl.Label>Item Name</FormControl.Label>
          <Input
            type="text"
            placeholder="Name of the item/good"
            defaultValue={formValues.itemName}
            onChangeText={text => setFormValues(p => ({...p, itemName: text}))}
          />
        </Stack>
        <Stack>
          <FormControl.Label>Quantity</FormControl.Label>
          <Input
            type="text"
            placeholder="Number of the item/good"
            defaultValue={formValues.itemQuantity}
            onChangeText={text =>
              setFormValues(p => ({...p, itemQuantity: text}))
            }
          />
        </Stack>
        <Stack>
          <FormControl.Label>Price Per Piece</FormControl.Label>
          <Input
            type="text"
            defaultValue={formValues.itemPrice}
            placeholder="Price of the item/good"
            onChangeText={text => setFormValues(p => ({...p, itemPrice: text}))}
          />
        </Stack>
        <Stack mt={2}>
          <Button onPress={handleSubmit}>
            {item ? 'Update Item' : 'Save Item'}
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default AddItem;
