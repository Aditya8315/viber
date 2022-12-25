import Login from '../components/Login'
import {Center, ChakraProvider, Spinner} from "@chakra-ui/react"
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../firebase"

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  // return <Component {...pageProps} />
  if(loading){
    return(
    <ChakraProvider>
      <Center h="100vh">
      <Spinner size="xl"/>
      </Center>
    </ChakraProvider>
    )
  }
  if(!user){
    return(
      <ChakraProvider>
      <Login/>
    </ChakraProvider>
    )
  }
  return (
    <ChakraProvider>
    <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
