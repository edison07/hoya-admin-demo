// src/App.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Box, VStack, Button, Heading } from "@chakra-ui/react";

export default function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box display="flex" minH="100vh">
      {/* Sidebar */}
      <VStack bg="gray.100" p={4} w="220px" align="stretch" spacing={3}>
        <Heading size="md" mb={4}>
          主選單
        </Heading>
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          首頁
        </Button>
        <Button
          as={Link}
          to="/withdraw-platform"
          colorScheme="teal"
          variant="ghost"
        >
          提幣平台設置
        </Button>
        <Button colorScheme="red" onClick={handleLogout}>
          登出
        </Button>
      </VStack>

      {/* 主內容區域 */}
      <Box flex="1" p={8}>
        <Outlet /> {/* 這裡渲染 HomePage 或 WithdrawPlatformPage */}
      </Box>
    </Box>
  );
}
