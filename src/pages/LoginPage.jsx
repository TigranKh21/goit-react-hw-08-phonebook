import { useDispatch, useSelector } from 'react-redux';
import { apiLogin } from '../redux/auth/authSlice';
import { selectorIsLoading } from '../redux/auth/authSelectors';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const LoginPage = () => {
  const isLoading = useSelector(selectorIsLoading);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;

    const formData = {
      email,
      password,
    };
    console.log(formData);
    dispatch(apiLogin(formData));
    e.target.reset();
  };

  return (
    <Box
      bgColor="cyan.800"
      color="white"
      borderRadius={5}
      boxShadow="6px 6px 12px rgb(114, 116, 116)"
      p={5}
      maxW={500}
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="example@example.com"
            bgColor="white"
            isRequired
            mb={2}
          />

          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="******"
            bgColor="white"
            color="black"
            minLength={7}
            isRequired
          />
          <Button
            type="submit"
            disabled={isLoading}
            bg="cyan.700"
            maxW={120}
            mt={3}
            size="md"
            fontFamily="Roboto"
          >
            Sign In
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginPage;
