import React from 'react';
import { useSelector } from 'react-redux';
import { selectorAuthIsLoggedIn } from '../../redux/auth/authSelectors';
import { Navigation, UserMenu } from 'components';
import { Box, Flex, Heading } from '@chakra-ui/react';

export const SharedLoyaut = ({ children }) => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <Flex as="header" justify="space-between" p={5}>
          <Heading
            as="h1"
            size="4xl"
            noOfLines={1}
            pl={5}
            color="gray.500"
            textShadow="2px 2px 2px rgb(4, 36, 163)"
          >
            Phonebook
          </Heading>
          <UserMenu />
        </Flex>
      ) : (
        <Flex as="header" justify="start" flexDirection="column">
          <Heading
            as="h1"
            size="4xl"
            noOfLines={1}
            pl={5}
            color="gray.500"
            textShadow="2px 2px 2px rgb(4, 36, 163)"
          >
            Phonebook
          </Heading>
          <Navigation />
        </Flex>
      )}
      <Box as="main" p={5}>
        {children}
      </Box>
    </>
  );
};
