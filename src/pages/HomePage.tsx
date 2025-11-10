/**
 * HomePage.tsx - 應用程式首頁
 * 登入成功後的主要頁面，顯示歡迎訊息
 */

// React 核心匯入
import { useEffect, useState } from "react"; // useEffect: 副作用處理, useState: 狀態管理

// Chakra UI 元件匯入
import { Heading, Text } from "@chakra-ui/react";

// 服務層匯入
import { authService } from "@/services/auth.service"; // 認證服務

// 類型定義匯入
import type { User } from "@/types/auth"; // 使用者類型

/**
 * 首頁元件
 * 簡單的歡迎頁面，作為登入後的預設頁面
 * 顯示使用者名稱
 *
 * @returns JSX.Element - 首頁 UI
 */
export default function HomePage() {
  // 使用者資訊狀態
  const [user, setUser] = useState<User | null>(null);

  // 元件掛載時從 localStorage 讀取使用者資訊
  useEffect(() => {
    const userInfo = authService.getUserInfo();
    setUser(userInfo);
  }, []);

  // 返回歡迎標題，顯示使用者名稱
  return (
    <Heading color="teal.400">
      Welcome Back,{" "}
      <Text as="span" color="orange.500">
        {user?.name || user?.username || ""}
      </Text>
    </Heading>
  );
}
