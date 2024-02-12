import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { apiDeleteContact, apiGetContacts } from '../../redux/contactsSlice';
import { getContacts, getFiltering, getStatus } from '../../redux/selectors';

import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterData = useSelector(getFiltering);
  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const searchData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterData.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(apiDeleteContact(id));
  };

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  return (
    <SimpleGrid spacing={5} minChildWidth={300} ml={5} mr={5}>
      {Array.isArray(contacts) &&
        searchData.map(contact => (
          <li key={contact.id}>
            <Box
              boxShadow="6px 6px 12px rgb(114, 116, 116)"
              background="grey"
              color="white"
              maxW={500}
              borderRadius={5}
              p={5}
              bgColor="cyan.800"
              mt={5}
            >
              <Flex justify="space-between">
                <Text fontSize={20}>
                  {contact.name} <br />
                  <a href="tel:{contact.number}">{contact.number}</a>
                </Text>
                <Button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                  size="md"
                  fontFamily="Roboto"
                  bg="cyan.200"
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          </li>
        ))}
    </SimpleGrid>
  );
};
