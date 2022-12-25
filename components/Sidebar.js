import { UnlockIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
// import { ArrowLeftIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth,db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "@firebase/firestore";
import getOtherEmail from "../utils/getOtherEmail";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  }
  function isValidEmail(email) {
    // Check for empty string
    if (email === '') {
      alert("Email is Not Valid");
      return false;
    }
    // Check for the @ symbol
    if (!email.includes('@')) {
      alert("Email is Not Valid");
      return false;
    }
  
    // Split the string into two parts: the part before the @ symbol, and the part after it
    const parts = email.split('@');
  
    // Check that there are exactly two parts
    if (parts.length !== 2) {
      alert("Email is Not Valid");
      return false;
    }
  
    // Check that the part before the @ symbol is not empty
    if (parts[0] === '') {
      alert("Email is Not Valid");
      return false;
    }
  
    // Check that the part after the @ symbol is not empty
    if (parts[1] === '') {
      alert("Email is Not Valid");
      return false;
    }
  
    // Check that the part after the @ symbol contains at least one period (.)
    if (!parts[1].includes('.')) {
      alert("Email is Not Valid");
      return false;
    }
  
    // If all checks pass, the email is valid
    return true;
  }
  const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && (input != user.email) && isValidEmail(input)) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] })
    }
  }

  const chatList = () => {
    return (
      chats?.filter(chat => chat.users.includes(user.email))
      .map(
        chat => 
          <Flex key={Math.random()} p={3} align="center" _hover={{bg: "gray.100", cursor: "pointer"}} onClick={() => redirect(chat.id)}>
            <Avatar src="" marginEnd={3} />
            <Text>{getOtherEmail(chat.users, user)}</Text>
          </Flex>
      )
    )
  }

  return (
    <Flex
      // bg="cyan.100"
      bgGradient='linear(to-tr, cyan.500, red.100)'
      h="100%"
      w="300px"
      // borderEnd="1px solid" borderColor="gray.200"
      direction="column"
    >

      <Flex
        bgGradient='linear(to-br, cyan.500, red.100)'
        h="81px" w="100%"
        align="center" justifyContent="space-between"
        // borderBottom="1px solid" borderColor="gray.200"
        p={3}
      >

        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton size="sm" isRound icon={<UnlockIcon />} onClick={() => signOut(auth)} />

      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>New Chat</Button>

      <Flex overflowX="scroll"direction="column" sx={{scrollbarWidth: "none"}} flex={1} >
        {chatList()}
      </Flex>

    </Flex>

  )
}
