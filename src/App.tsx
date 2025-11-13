/**
 * App.tsx - 應用程式主佈局元件
 * 提供側邊欄導覽和主內容區域的佈局結構
 */

// React 核心匯入
import { useEffect, useState, useMemo } from "react"; // useEffect: 副作用處理, useState: 狀態管理

// Chakra UI 圖示匯入
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from "@chakra-ui/icons"; // ChevronDownIcon: 下箭頭圖示, ChevronRightIcon: 右箭頭圖示, HamburgerIcon: 漢堡選單圖示

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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react"; // Box: 容器, VStack: 垂直堆疊, Button: 按鈕, Heading: 標題, Menu: 選單相關元件, Flex: 彈性佈局, Text: 文字, Avatar: 頭像, Card: 卡片, CardBody: 卡片內容, Divider: 分隔線, Collapse: 折疊元件, Icon: 圖示元件, Breadcrumb: 麵包屑, BreadcrumbItem: 麵包屑項目, BreadcrumbLink: 麵包屑連結, Drawer: 抽屜元件, DrawerBody: 抽屜內容, DrawerOverlay: 抽屜遮罩, DrawerContent: 抽屜容器, DrawerCloseButton: 抽屜關閉按鈕, IconButton: 圖示按鈕, useDisclosure: 開關狀態 Hook, useBreakpointValue: 斷點值 Hook

// 服務層匯入
import { authService } from "@/services/auth.service"; // 認證服務

// Redux 相關匯入
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Redux hooks
import {
  setPermissions,
  resetPermissions,
} from "@/store/slices/permissionSlice"; // 權限 actions
import { setUser, clearUser } from "@/store/slices/userSlice"; // 使用者 actions

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

  // 取得 Redux dispatch 函式
  const dispatch = useAppDispatch();

  // 從 Redux 讀取使用者資訊
  const user = useAppSelector((state) => state.user.user);

  // 選單類別展開狀態
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );

  // 側邊欄 Drawer 開關狀態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 判斷是否為小螢幕（寬度 < 1280px）
  const isMobile = useBreakpointValue({ base: true, xl: false });

  // 選單分類定義
  const menuCategories = [
    {
      id: "system",
      label: "系統管理",
      routes: [{ path: "/withdraw-platform", label: "提幣平台設置" }],
    },
  ];

  // 判斷當前路徑是否在某個分類下
  const isRouteActiveInCategory = (categoryId: string) => {
    const category = menuCategories.find((cat) => cat.id === categoryId);
    return (
      category?.routes.some((route) => route.path === location.pathname) ||
      false
    );
  };

  // 切換分類展開/收合狀態
  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // 選中狀態的顏色常數（使用 primary-light）
  const ACTIVE_BG_COLOR = "primary.light";

  // 生成麵包屑路徑
  const breadcrumbs = useMemo(() => {
    // 如果在首頁，只顯示首頁
    if (location.pathname === "/") {
      return [{ label: "首頁", path: "/" }];
    }

    // 如果不在首頁，查找當前路徑所屬的分類和頁面
    for (const category of menuCategories) {
      const route = category.routes.find((r) => r.path === location.pathname);
      if (route) {
        return [
          { label: category.label, path: "" }, // 分類不可點擊
          { label: route.label, path: route.path },
        ];
      }
    }

    // 如果找不到匹配的路徑，回傳空陣列
    return [];
  }, [location.pathname, menuCategories]);

  // 元件掛載時從 localStorage 讀取使用者資訊
  useEffect(() => {
    const userInfo = authService.getUserInfo();

    // 如果有使用者資訊，恢復 Redux 狀態
    if (userInfo) {
      // 恢復使用者資訊
      dispatch(setUser(userInfo));

      // 恢復權限狀態
      if (userInfo.permissions) {
        dispatch(
          setPermissions({
            canEdit: userInfo.permissions.canEdit,
            canViewLog: userInfo.permissions.canViewLog,
          }),
        );
      }
    }
  }, [dispatch]);

  /**
   * 渲染側邊欄內容
   * 可被桌面版和手機版共用
   */
  const renderSidebarContent = () => (
    <VStack align="stretch" spacing={3}>
      {/* 側邊欄標題 */}
      <Flex align="center" gap={2} mb={2}>
        <img
          src="/favicon.ico"
          alt="Logo"
          style={{ width: "24px", height: "24px" }}
        />
        <Heading size="md" textColor="black">
          HOYA BIT Admin
        </Heading>
      </Flex>

      {/* 分隔線 */}
      <Divider borderColor="gray.300" />

      {/* Overview 標籤 */}
      <Text fontSize="sm" fontWeight="bold" color="gray.400" mt={2}>
        OVERVIEW
      </Text>

      {/* 首頁按鈕 */}
      <Button
        as={Link}
        to="/"
        colorScheme="brand"
        variant="ghost"
        justifyContent="flex-start"
        bg={location.pathname === "/" ? ACTIVE_BG_COLOR : "transparent"}
        color={location.pathname === "/" ? "white" : "gray.700"}
        _hover={{
          bg: location.pathname === "/" ? ACTIVE_BG_COLOR : "transparent",
        }}
        onClick={isMobile ? onClose : undefined}
      >
        首頁
      </Button>

      {/* 動態渲染選單分類 */}
      {menuCategories.map((category) => (
        <Box key={category.id}>
          {/* 分類按鈕 */}
          <Button
            colorScheme="brand"
            variant="ghost"
            justifyContent="flex-start"
            onClick={() => toggleCategory(category.id)}
            color={
              isRouteActiveInCategory(category.id) ? "brand.600" : "gray.700"
            }
            _hover={{
              bg: "transparent",
            }}
            rightIcon={
              <Icon
                as={
                  openCategories[category.id]
                    ? ChevronDownIcon
                    : ChevronRightIcon
                }
                color={
                  isRouteActiveInCategory(category.id)
                    ? "brand.600"
                    : "gray.700"
                }
              />
            }
          >
            {category.label}
          </Button>

          {/* 可折疊的子選單 */}
          <Collapse in={openCategories[category.id]} animateOpacity>
            <VStack align="stretch" spacing={1} pl={4}>
              {category.routes.map((route) => (
                <Button
                  key={route.path}
                  as={Link}
                  to={route.path}
                  colorScheme="brand"
                  variant="ghost"
                  justifyContent="flex-start"
                  size="sm"
                  bg={
                    location.pathname === route.path
                      ? ACTIVE_BG_COLOR
                      : "transparent"
                  }
                  color={
                    location.pathname === route.path ? "white" : "gray.700"
                  }
                  _hover={{
                    bg:
                      location.pathname === route.path
                        ? ACTIVE_BG_COLOR
                        : "transparent",
                  }}
                  onClick={isMobile ? onClose : undefined}
                >
                  {route.label}
                </Button>
              ))}
            </VStack>
          </Collapse>
        </Box>
      ))}
    </VStack>
  );

  /**
   * 處理使用者登出
   * 1. 使用 authService 清除認證資料
   * 2. 清除 Redux 使用者和權限狀態
   * 3. 導航至登入頁面
   */
  const handleLogout = () => {
    // 使用 authService 的 logout 方法清除 token 和使用者資訊
    authService.logout();
    // 清除 Redux 使用者狀態
    dispatch(clearUser());
    // 清除 Redux 權限狀態
    dispatch(resetPermissions());
    // 重新導向到登入頁面
    navigate("/login");
  };

  return (
    // 主容器：使用 flexbox 佈局，最小高度為整個視窗高度
    <Box display="flex" minH="100vh" flexDirection="column" bg="#F7FAFC">
      {/* 頂部導覽列 */}
      <Flex px={8} py={4} justify="flex-end" align="center" gap={3}>
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
              <Text color="black">
                {user?.name || user?.username || "使用者"}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList bgColor="white">
            {/* 登出選項 */}
            <MenuItem onClick={handleLogout} bgColor="white" color="black" _hover={{ bg: "gray.100" }}>
              登出
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 漢堡選單按鈕（小螢幕時顯示） */}
        {isMobile && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            aria-label="開啟選單"
            size="md"
          />
        )}
      </Flex>

      {/* 側邊欄 Drawer（小螢幕時使用） */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="transparent" boxShadow="none">
          <DrawerBody pt={12} px={4}>
            <Card position="relative" bg="white">
              <DrawerCloseButton position="absolute" top={2} right={2} />
              <CardBody>{renderSidebarContent()}</CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 主要內容區（側邊欄 + 內容） */}
      <Box display="flex" flex="1" p={4} gap={4}>
        {/* 側邊欄區域 - 桌面版（寬度 >= 1280px 時顯示） */}
        {!isMobile && (
          <Card w="250px" h="fit-content" bg="white">
            <CardBody>{renderSidebarContent()}</CardBody>
          </Card>
        )}

        {/* 主內容區域 */}
        {/* flex="1": 佔據剩餘空間 */}
        <Box flex="1" p={6}>
          {/* 麵包屑導航 */}
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            mb={6}
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <BreadcrumbItem
                  key={crumb.path || crumb.label}
                  isCurrentPage={isLast}
                >
                  {crumb.path && !isLast ? (
                    <BreadcrumbLink
                      as={Link}
                      to={crumb.path}
                      color="gray.600"
                      fontWeight="normal"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <Text
                      color={isLast ? "gray.800" : "gray.600"}
                      fontWeight="normal"
                    >
                      {crumb.label}
                    </Text>
                  )}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>

          {/* Outlet: React Router 提供的元件，用於渲染當前路由匹配的子路由元件 */}
          {/* 這裡會根據路由渲染 HomePage 或 WithdrawPlatformPage */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
