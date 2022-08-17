import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import React, {useState} from 'react'
import Axios from 'axios';
import { useAuthContext} from '../../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';

 const Login  = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  // const {login, error, isLoading} = useLogin()
  const { dispatch } = useAuthContext()

  const handleSubmit = (e:any) => {
    e.preventDefault();
    Axios
      .post("api/users/login", {
        email,
        password,
      })
      .then((token:any) => {
        console.log(token.data);
        localStorage.setItem("user", JSON.stringify(token.data));
        navigate('/')
        setPassword("");
        // update the auth context
        dispatch({type: 'LOGIN', payload: token.data, payload2:email})
      })
      .catch((error) => {
        if(error.response.status  == 400){
          setError("Email not exist")
        }
        if(error.response.status  == 401){
          
          setError("Wrong Password")
        }
        });
        setPassword("");
      };

  return (
    // <Flex
    //   minH={'100vh'}
    //   align={'center'}
    //   justify={'center'}
    //   bg={useColorModeValue('gray.50', 'gray.800')}>
    //   <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    //     <Stack align={'center'}>
    //       <Heading fontSize={'4xl'}>Sign in to your account</Heading>
    //       <Text fontSize={'lg'} color={'gray.600'}>
    //         to explore all amazing features ✌️
    //       </Text>
    //     </Stack>

    //     <Box as='form' onSubmit={handleSubmit}
    //       rounded={'lg'}
    //       bg={useColorModeValue('white', 'gray.700')}
    //       boxShadow={'lg'}
    //       p={8}>
    //       <Stack spacing={4}>
            
    //         <FormControl id="email">
    //           <FormLabel>Email address</FormLabel>
    //           <Input  
    //            type="email" 
    //            onChange={e => setEmail(e.target.value)} 
    //            value={email} 
    //            />
    //         </FormControl>

    //         <FormControl id="password">
    //           <FormLabel>Password</FormLabel>
    //           <Input 
    //           type="password" 
    //           onChange={e => setPassword(e.target.value)} 
    //           value={password} 
    //           autoComplete="on"
    //           />
    //         </FormControl>

    //         <Stack spacing={20}>
              
    //           <Button
    //             disabled={isLoading}
    //             bg={'blue.400'}
    //             color={'white'}
    //             _hover={{
    //               bg: 'blue.500',
    //             }}>
    //             Log in
    //           </Button>
    //         </Stack>

    //         {error && <div className="error">{error}</div>}
            
    //         <Text align={'center'}>
    //             Not Registered yet? <Link color={'blue.400'} to="/register"> <Box as='span' color={"blue.400"}>Sign Up</Box> </Link>
    //           </Text>
    //       </Stack>
    //     </Box>

    //   </Stack>
    // </Flex>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minH={'40vh'}>
          <Stack align={'center'}>
           <Heading fontSize={'4xl'}>Sign in to your account</Heading>
           <Text fontSize={'lg'} color={'gray.600'}>
             to explore all amazing features ✌️
           </Text>
         </Stack>
         <Stack spacing={4}>
    <Box as='form' 
    minH={'40vh'}
    rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          onSubmit={handleSubmit}
    className="login" >
     <Box as='h3'
     m={1}
     >Log In</Box>
        
     <label>Email address:</label>
     <input 
       type="email" 
       onChange={e => setEmail(e.target.value)} 
       value={email} 
     />
     <label>Password:</label>
     <input 
       type="password" 
       onChange={e => setPassword(e.target.value)} 
       value={password} 
       autoComplete="on"
     />

     <button 
     
     >Log In</button>
     {!(error=="") && <div className="error">{error}</div>}
   </Box>
   </Stack>
   </Stack>
  );
}
export default Login