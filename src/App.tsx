import { Routes, Route, Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import HomePage from "@/pages/HomePage";
import WithdrawPlatformPage from "@/pages/WithdrawPlatformPage";
import LoginPage from "@/pages/LoginPage";

export default function App() {
  return (
    <Box p={4}>
      <nav>
        <Button as={Link} to="/" colorScheme="teal" mr={2}>
          首頁
        </Button>
        <Button as={Link} to="/withdraw-platform" colorScheme="teal" mr={2}>
          提幣平台
        </Button>
        <Button as={Link} to="/login" colorScheme="teal">
          登入
        </Button>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/withdraw-platform" element={<WithdrawPlatformPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Box>
  );
}
