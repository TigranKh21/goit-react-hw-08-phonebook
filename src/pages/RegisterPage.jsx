import { useDispatch, useSelector } from 'react-redux';
import { apiRegistration } from '../redux/auth/authSlice';
import { selectorIsLoading } from '../redux/auth/authSelectors';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const RegisterPage = () => {
  const isLoading = useSelector(selectorIsLoading);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;

    const formData = {
      name,
      email,
      password,
    };
    console.log(formData);
    dispatch(apiRegistration(formData));
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
          <FormLabel>
            Name:
            <Input
              type="text"
              name="userName"
              placeholder="Name"
              minLength={2}
              isRequired
              bgColor="white"
              color="black"
            />
          </FormLabel>
          <FormLabel>
            Email:
            <Input
              type="email"
              name="email"
              placeholder="example@example.com"
              isRequired
              bgColor="white"
              color="black"
            />
          </FormLabel>
          <FormLabel>
            Password:
            <Input
              type="password"
              name="password"
              placeholder="******"
              minLength={7}
              isRequired
              bgColor="white"
              color="black"
            />
          </FormLabel>
          <Button
            type="submit"
            disabled={isLoading}
            bg="cyan.700"
            maxW={120}
            mt={3}
            size="md"
            fontFamily="Roboto"
          >
            Register
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default RegisterPage;
