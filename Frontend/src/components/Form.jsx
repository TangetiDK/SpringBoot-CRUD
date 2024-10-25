/* eslint-disable no-unused-vars */
import React,{ useState, useEffect } from 'react';
import { Text, useToast, Box, FormControl, FormLabel, Input, Button, InputLeftElement, InputGroup, Table, Thead, Tbody, Tr, Th, Td, TableCaption, HStack, IconButton} from '@chakra-ui/react';
import { CalendarIcon, AtSignIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const Form = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const toast = useToast();
    const [editUser, setEditUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/test/getEmployees');
          setUsers(response.data);
        } catch (error) {
          console.error('There was an error fetching the users!', error);
        }
    };

    const deleteUser = async (id) => {
      console.log("id", id)
        try {
            await axios.delete(`http://localhost:8080/test/deleteEmployee?id=${id}`);
            toast({
            title: 'Success',
            description: 'User deleted successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
            colorScheme: 'white',
            position: 'top-right',
            });
            fetchUsers();
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { name, age };
    
        try {
            await axios.post('http://localhost:8080/test/addEmployee', user);
            toast({
            title: 'Success',
            description: 'User added successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            });
            setName('');
            setAge('');
            fetchUsers();
        } catch (error) {
            console.error('There was an error creating the user!', error);
        }
    };

    const handleUpdate = async () => {
      const updatedUser = { id: editUser.id, name, age };
      
      try {
          await axios.put(`http://localhost:8080/test/updateEmployee`, updatedUser);
          toast({
              title: 'Success',
              description: 'User updated successfully',
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
          });
          fetchUsers();
          onClose();
      } catch (error) {
          console.error('There was an error updating the user!', error);
      }
  };

  const handleCloseModal = () => {
    onClose();
    setEditUser(null);
    setName('');
    setAge('');
  };
    

    return (
        <HStack>
      <Box
            width="400px"
            p="8"
            bg="white"
            boxShadow="2xl"
            borderRadius="lg"
            position="relative"
          >
            <form onSubmit={handleSubmit}>
              <FormControl id="name" mb="4" isRequired>
                <Text fontWeight="bold" mb="6" fontSize="2xl" color='black' align='center'>Employee Form</Text>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AtSignIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="age" mb="4" isRequired>
                <FormLabel>Age</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CalendarIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                mt="4"
                boxShadow="md"
              >
                Submit
              </Button>
            </form>
          </Box>
          <Box
          width="850px"
          p="8"
          bg="white"
          boxShadow="2xl"
          borderRadius="lg"
        //   maxHeight="500px"
          
        >
            <Text fontWeight="bold" mb="6" fontSize="2xl" color='black' align='center'>Employees List</Text>
          <Table variant="striped">
            <TableCaption>List of Employees</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.age}</Td>
                  <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => {
                      setEditUser(user);
                      setName(user.name);
                      setAge(user.age);   
                      onOpen();           
                    }}
                    mr="2"
                  />
                    <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => deleteUser(user.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='2px'/>
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton  onClick={handleCloseModal}/>
            <ModalBody>
              <FormControl id="name" mb="4" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="age" mb="4" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleUpdate}>Update</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </HStack>
    );
}

export default Form;
