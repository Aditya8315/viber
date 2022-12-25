import { Flex, Heading, Avatar } from "@chakra-ui/react"

export default function Topbar({email}) {
  return (
    <Flex
    bgGradient='linear(to-tr,  red.100,cyan.500)'
      h="81px" w="100%"
      align="center"
      p={5}
    >
      <Avatar src="" marginEnd={3} />
      <Heading size="md">{email}</Heading>
    </Flex>
  )
}