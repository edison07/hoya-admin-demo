import { Heading, Button, VStack, useColorMode } from "@chakra-ui/react";
export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack
      minH="100vh"
      justify="center"
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
    >
      <Heading color="teal.400">Chakra OK 🎉</Heading>
      <Button colorScheme="teal" onClick={toggleColorMode}>
        切換主題
      </Button>
    </VStack>
  );
}
