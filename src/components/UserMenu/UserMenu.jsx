import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogout } from '../../redux/auth/authSlice';
import {
  selectorIsLoading,
  selectorUserData,
} from '../../redux/auth/authSelectors';
import { Button, Flex, Text } from '@chakra-ui/react';

export const UserMenu = () => {
  const isLoading = useSelector(selectorIsLoading);
  const userData = useSelector(selectorUserData);
  const userEmail = userData?.email ?? 'No user email available to show';
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(apiLogout());
  };
  return (
    <Flex flexDirection="column" alignItems="end">
      <Text fontSize="2xl">{userEmail}</Text>
      <Button
        bg="cyan.700"
        maxW={120}
        mt={3}
        size="md"
        fontFamily="Roboto"
        type="button"
        onClick={handleLogout}
        disabled={isLoading}
      >
        Logout
      </Button>
    </Flex>
  );
};
