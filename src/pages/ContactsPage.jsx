import { useSelector } from 'react-redux';
import React from 'react';
import { selectorAuthIsLoggedIn } from '../redux/auth/authSelectors';
import { ContactForm, ContactList, Filter } from 'components';
import { Box, Flex, Heading } from '@chakra-ui/react';

const ContactsPage = () => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  return (
    isLoggedIn && (
      <div>
        <Flex gap={5}>
          <Box flexGrow={1}>
            <Heading
              as="h2"
              size="2xl"
              noOfLines={1}
              color="gray.500"
              textShadow="2px 2px 2px rgb(4, 36, 163)"
            >
              Add new contact:
            </Heading>
            <ContactForm />
          </Box>
          <Box flexGrow={1}>
            <Heading
              as="h2"
              size="2xl"
              noOfLines={1}
              color="gray.500"
              textShadow="2px 2px 2px rgb(4, 36, 163)"
            >
              Filter contact by name:
            </Heading>
            <Filter />
          </Box>
        </Flex>
        <Heading
          as="h2"
          size="2xl"
          noOfLines={1}
          color="gray.500"
          textShadow="2px 2px 2px rgb(4, 36, 163)"
          mt={5}
        >
          List of contacts:
        </Heading>
        <ContactList />
      </div>
    )
  );
};

export default ContactsPage;
