/**
 * HomePage.tsx - 應用程式首頁
 * 登入成功後的主要頁面，顯示歡迎訊息
 */

// Chakra UI 元件匯入
import { Heading, Text } from "@chakra-ui/react";

// Redux 相關匯入
import { useAppSelector } from "@/store/hooks"; // Redux 選擇器 Hook

/**
 * 首頁元件
 * 簡單的歡迎頁面，作為登入後的預設頁面
 * 顯示使用者名稱
 *
 * @returns JSX.Element - 首頁 UI
 */
export default function HomePage() {
  // 從 Redux store 讀取使用者資訊（與 App.tsx 保持一致的資料來源）
  const user = useAppSelector((state) => state.user.user);

  // 返回歡迎標題，顯示使用者名稱
  return (
    <Heading color="secondary.default">
      Welcome Back,{" "}
      <Text as="span" color="link.default">
        {user?.name || user?.username || ""}
      </Text>
    </Heading>
  );
}
