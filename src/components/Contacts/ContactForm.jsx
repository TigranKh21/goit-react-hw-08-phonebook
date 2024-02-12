import { useDispatch, useSelector } from 'react-redux';
import { apiAddContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';

import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;

    const formData = {
      name,
      number,
    };
    const hasDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicateName) {
      alert(`The name ${formData.name} is already in contacts`);
      return;
    }

    const hasDuplicateNumber = contacts.some(
      contact => contact.number === formData.number
    );
    if (hasDuplicateNumber) {
      alert(`The phone number ${formData.number} is already in contacts`);
      return;
    }
    dispatch(apiAddContact(formData));
    e.target.reset();
  };

  return (
    <Box
      bgColor="cyan.800"
      color="white"
      borderRadius={5}
      boxShadow="6px 6px 12px rgb(114, 116, 116)"
    >
      <form onSubmit={handleSubmit}>
        <FormControl p={5}>
          <FormLabel fontFamily="Roboto" fontSize={20}>
            Name
          </FormLabel>
          <Input
            type="text"
            placeholder="Contact name"
            name="name"
            isRequired
            color="black"
            bgColor="white"
          />
          <FormLabel fontFamily="Roboto">Number</FormLabel>
          <Input
            type="tel"
            placeholder="Phone number"
            name="number"
            isRequired
            color="black"
            bgColor="white"
          />
          <Button type="submit" mt={3} size="md" fontFamily="Roboto">
            Add contact
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
