import { ChatIcon } from "@chakra-ui/icons";
import { Box ,Button,Center,Stack} from "@chakra-ui/react";
import Head from "next/head";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {auth} from "../firebase"


export default function Login(){
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <>
        <Head>
            <title> Login </title>
        </Head>
        <Center h="100vh">
            <Stack align="center" bgColor="gray.600" p={16} rounded="md">

        <Box bgGradient='linear(to-tr, #7928CA, #FF0080)' w="fit-content" p={5} rounded="3xl" boxShadow="md">
        <ChatIcon w="100px" h="100px" color="white"/>
        </Box>
        <Button boxShadow="md" onClick={()=>signInWithGoogle("",{prompt:"select_account"})}> SIgn In with Google</Button>
            </Stack>

        </Center>
        </>
    )
}