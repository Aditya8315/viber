import { Avatar, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useRouter } from 'next/router';
import {useCollectionData,useDocumentData} from "react-firebase-hooks/firestore"
import { collection, query ,orderBy,doc} from 'firebase/firestore';
import {db,auth} from "../../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import getOtherEmail from '../../utils/getOtherEmail';
import Topbar from '../../components/Topbar';
import Bottombar from '../../components/Bottombar';
import { useRef, useEffect } from "react";
import Head from 'next/head';


function Chat() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { id } = router.query;
    const q= query(collection(db,`chats/${id}/messages`),orderBy("timestamp"));
    const [messages] = useCollectionData(q);
    const [chat] = useDocumentData(doc(db,"chats",id))
    const bottomOfChat = useRef();

    const getMessages = () =>
    messages?.map(msg => {
      const sender = msg.sender === user.email;
      return (
        <Flex key={Math.random()} alignSelf={sender ? "flex-end" : "flex-start"} bg={sender ? "cyan.500" : "red.100"} w="fit-content" minWidth="100px" borderRadius="lg" borderTopLeftRadius={!sender?"0px":"lg"} borderTopRightRadius={sender?"0px":"lg"} p={3} m={1}>
          <Text>{msg.text}</Text>
        </Flex>
      )
    })

    
  return (
    <Flex h="100vh" >
         <Head><title>Viber/Chat</title></Head>
        <Sidebar/>
        <Flex  flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users,user)}/>
        <Flex flex={1} direction="column" pt={4} mx={5} overflowX="scroll" sx={{scrollbarWidth: "none"}}>
            {getMessages()}
            <div ref={bottomOfChat}></div>
        </Flex>
        <Bottombar id={id} user={user} />
        </Flex>
    </Flex>
  )
}

export default Chat