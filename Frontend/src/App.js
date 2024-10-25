/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
// import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import { Box } from '@chakra-ui/react';
function App() {
  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)" h="100vh" display='flex' justifyContent='center' alignItems='center'>
      <Form />
    </Box>
  );
}

export default App;
