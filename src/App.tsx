/**
 * App.tsx - 應用程式主佈局元件
 * 提供側邊欄導覽和主內容區域的佈局結構
 */

// React Router 相關匯入
import { Outlet, Link, useNavigate } from "react-router-dom"; // Outlet: 子路由渲染容器, Link: 路由連結, useNavigate: 程式化導覽

// Chakra UI 元件匯入
import { Box, VStack, Button, Heading } from "@chakra-ui/react"; // Box: 容器, VStack: 垂直堆疊, Button: 按鈕, Heading: 標題

/**
 * App 主元件
 * 包含側邊欄導覽和主內容區域的佈局
 *
 * @returns JSX.Element - 應用程式主佈局
 */
export default function App() {
  // 取得路由導覽函式
  const navigate = useNavigate();

  /**
   * 處理使用者登出
   * 1. 從 localStorage 移除認證 token
   * 2. 導航至登入頁面
   */
  const handleLogout = () => {
    // 移除本地儲存的認證 token
    localStorage.removeItem("token");
    // 重新導向到登入頁面
    navigate("/login");
  };

  return (
    // 主容器：使用 flexbox 佈局，最小高度為整個視窗高度
    <Box display="flex" minH="100vh">
      {/* 側邊欄區域 */}
      {/* VStack: 垂直堆疊元件，bg: 背景色，p: 內距，w: 寬度，align: 對齊方式，spacing: 間距 */}
      <VStack bg="gray.100" p={4} w="220px" align="stretch" spacing={3}>
        {/* 側邊欄標題 */}
        <Heading size="md" mb={4}>
          主選單
        </Heading>

        {/* 首頁按鈕 */}
        {/* as={Link}: 將按鈕渲染為 React Router Link 元件 */}
        {/* to: 導航目標路徑 */}
        {/* colorScheme: 顏色主題 */}
        {/* variant: 按鈕變體樣式 */}
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          首頁
        </Button>

        {/* 提幣平台設置按鈕 */}
        <Button
          as={Link}
          to="/withdraw-platform"
          colorScheme="teal"
          variant="ghost"
        >
          提幣平台設置
        </Button>

        {/* 登出按鈕 */}
        {/* colorScheme="red": 使用紅色主題表示危險操作 */}
        {/* onClick: 點擊時執行登出處理函式 */}
        <Button colorScheme="red" onClick={handleLogout}>
          登出
        </Button>
      </VStack>

      {/* 主內容區域 */}
      {/* flex="1": 佔據剩餘空間 */}
      {/* p: 內距 */}
      <Box flex="1" p={8}>
        {/* Outlet: React Router 提供的元件，用於渲染當前路由匹配的子路由元件 */}
        {/* 這裡會根據路由渲染 HomePage 或 WithdrawPlatformPage */}
        <Outlet />
      </Box>
    </Box>
  );
}
