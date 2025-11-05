import { Button, VStack, Input, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "demo"); // 模擬登入成功
    navigate("/home"); // 導向主頁
  };

  return (
    <VStack minH="100vh" justify="center" spacing={4}>
      <Heading>登入系統</Heading>
      <Input placeholder="帳號" />
      <Input type="password" placeholder="密碼" />
      <Button colorScheme="teal" onClick={handleLogin}>
        登入
      </Button>
    </VStack>
  );
}
