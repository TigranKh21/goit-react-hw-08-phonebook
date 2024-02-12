import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from '../../redux/contactsSlice';
import { getFiltering } from '../../redux/selectors';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterData = useSelector(getFiltering);

  const handleFindChange = e => {
    const value = e.target.value;
    dispatch(filterContact(value));
  };

  return (
    <FormControl
      maxW="100%"
      p={5}
      bgColor="cyan.800"
      color="white"
      borderRadius={5}
      boxShadow="6px 6px 12px rgb(114, 116, 116)"
    >
      <FormLabel fontFamily="Roboto" fontSize={20}>
        Find contact by name
      </FormLabel>
      <Input
        type="text"
        placeholder="search..."
        name="filter"
        value={filterData}
        onChange={handleFindChange}
        color="black"
        bgColor="white"
      />
    </FormControl>
  );
};
