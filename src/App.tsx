/**
 * App.tsx - 應用程式主佈局元件
 * 提供側邊欄導覽和主內容區域的佈局結構
 */

// React 核心匯入
import { useEffect, useState } from "react"; // useEffect: 副作用處理, useState: 狀態管理

// Chakra UI 圖示匯入
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"; // ChevronDownIcon: 下箭頭圖示, ChevronRightIcon: 右箭頭圖示

// React Router 相關匯入
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"; // Outlet: 子路由渲染容器, Link: 路由連結, useNavigate: 程式化導覽, useLocation: 取得當前路徑

// Chakra UI 元件匯入
import {
  Box,
  VStack,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Avatar,
  Card,
  CardBody,
  Divider,
  Collapse,
  Icon,
} from "@chakra-ui/react"; // Box: 容器, VStack: 垂直堆疊, Button: 按鈕, Heading: 標題, Menu: 選單相關元件, Flex: 彈性佈局, Text: 文字, Avatar: 頭像, Card: 卡片, CardBody: 卡片內容, Divider: 分隔線, Collapse: 折疊元件, Icon: 圖示元件

// 服務層匯入
import { authService } from "@/services/auth.service"; // 認證服務

// 類型定義匯入
import type { User } from "@/types/auth"; // 使用者類型

/**
 * App 主元件
 * 包含側邊欄導覽和主內容區域的佈局
 *
 * @returns JSX.Element - 應用程式主佈局
 */
export default function App() {
  // 取得路由導覽函式
  const navigate = useNavigate();

  // 取得當前路徑
  const location = useLocation();

  // 使用者資訊狀態
  const [user, setUser] = useState<User | null>(null);

  // 系統管理選單展開狀態
  const [isSystemOpen, setIsSystemOpen] = useState(false);

  // 系統管理分類下的路徑清單
  const systemRoutes = ["/withdraw-platform"];

  // 判斷當前路徑是否在系統管理分類下
  const isSystemRouteActive = systemRoutes.includes(location.pathname);

  // 元件掛載時從 localStorage 讀取使用者資訊
  useEffect(() => {
    const userInfo = authService.getUserInfo();
    setUser(userInfo);
  }, []);

  /**
   * 處理使用者登出
   * 1. 使用 authService 清除認證資料
   * 2. 導航至登入頁面
   */
  const handleLogout = () => {
    // 使用 authService 的 logout 方法清除 token 和使用者資訊
    authService.logout();
    // 重新導向到登入頁面
    navigate("/login");
  };

  return (
    // 主容器：使用 flexbox 佈局，最小高度為整個視窗高度
    <Box display="flex" minH="100vh" flexDirection="column">
      {/* 頂部導覽列 */}
      <Flex bg="white" px={8} py={4} justify="flex-end" align="center">
        {/* 使用者選單 */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Flex align="center" gap={2}>
              {/* 使用者頭像 */}
              <Avatar size="sm" name={user?.name || user?.username || ""} />
              {/* 使用者名稱 */}
              <Text>{user?.name || user?.username || "使用者"}</Text>
            </Flex>
          </MenuButton>
          <MenuList>
            {/* 登出選項 */}
            <MenuItem onClick={handleLogout} color="red.500">
              登出
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* 主要內容區（側邊欄 + 內容） */}
      <Box display="flex" flex="1" p={4} gap={4}>
        {/* 側邊欄區域 - 使用卡片樣式 */}
        <Card w="220px" h="fit-content">
          <CardBody>
            <VStack align="stretch" spacing={3}>
              {/* 側邊欄標題 */}
              <Heading size="md" mb={2}>
                HOYA BIT Admin
              </Heading>

              {/* 分隔線 */}
              <Divider />

              {/* Overview 標籤 */}
              <Text fontSize="sm" fontWeight="bold" color="gray.400" mt={2}>
                OVERVIEW
              </Text>

              {/* 首頁按鈕 */}
              {/* as={Link}: 將按鈕渲染為 React Router Link 元件 */}
              {/* to: 導航目標路徑 */}
              {/* colorScheme: 顏色主題 */}
              {/* variant: 按鈕變體樣式 */}
              {/* justifyContent: 靠左對齊 */}
              <Button
                as={Link}
                to="/"
                colorScheme="black"
                variant="ghost"
                justifyContent="flex-start"
                bg={
                  location.pathname === "/"
                    ? "rgba(255, 87, 34, 0.7)"
                    : "transparent"
                }
                color={location.pathname === "/" ? "white" : "inherit"}
                _hover={{
                  bg:
                    location.pathname === "/"
                      ? "rgba(255, 87, 34, 0.85)"
                      : "gray.100",
                }}
              >
                首頁
              </Button>

              {/* 系統管理可展開按鈕 */}
              <Button
                colorScheme="black"
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => setIsSystemOpen(!isSystemOpen)}
                color={isSystemRouteActive ? "rgba(255, 87, 34, 0.7)" : "inherit"}
                rightIcon={
                  <Icon
                    as={isSystemOpen ? ChevronDownIcon : ChevronRightIcon}
                    color={
                      isSystemRouteActive ? "rgba(255, 87, 34, 0.7)" : "inherit"
                    }
                  />
                }
              >
                系統管理
              </Button>

              {/* 可折疊的子選單 */}
              <Collapse in={isSystemOpen} animateOpacity>
                <VStack align="stretch" spacing={1} pl={4}>
                  {/* 提幣平台設置按鈕 */}
                  <Button
                    as={Link}
                    to="/withdraw-platform"
                    colorScheme="black"
                    variant="ghost"
                    justifyContent="flex-start"
                    size="sm"
                    bg={
                      location.pathname === "/withdraw-platform"
                        ? "rgba(255, 87, 34, 0.7)"
                        : "transparent"
                    }
                    color={
                      location.pathname === "/withdraw-platform"
                        ? "white"
                        : "inherit"
                    }
                    _hover={{
                      bg:
                        location.pathname === "/withdraw-platform"
                          ? "rgba(255, 87, 34, 0.85)"
                          : "gray.100",
                    }}
                  >
                    提幣平台設置
                  </Button>
                </VStack>
              </Collapse>
            </VStack>
          </CardBody>
        </Card>

        {/* 主內容區域 */}
        {/* flex="1": 佔據剩餘空間 */}
        <Box flex="1">
          {/* Outlet: React Router 提供的元件，用於渲染當前路由匹配的子路由元件 */}
          {/* 這裡會根據路由渲染 HomePage 或 WithdrawPlatformPage */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
