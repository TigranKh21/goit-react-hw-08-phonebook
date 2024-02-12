import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorAuthIsLoggedIn } from '../../redux/auth/authSelectors';
import { Flex, Tab, Tabs, Text } from '@chakra-ui/react';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  return isLoggedIn ? (
    <nav>
      <NavLink to="/contacts"></NavLink>
    </nav>
  ) : (
    <nav>
      <Tabs>
        <Flex justify="start">
          <Tab
            as={NavLink}
            _selected={{
              textDecoration: 'underline',
              color: 'cyan.800',
            }}
            to="/register"
          >
            <Text fontSize="2xl">SignUp</Text>
          </Tab>
          <Tab
            as={NavLink}
            _selected={{ textDecoration: 'underline', color: 'cyan.800' }}
            to="/login"
          >
            <Text fontSize="2xl">Login</Text>
          </Tab>
        </Flex>
      </Tabs>
    </nav>
  );
};
