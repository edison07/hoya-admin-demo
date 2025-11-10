/**
 * HomePage.tsx - 應用程式首頁
 * 登入成功後的主要頁面，顯示歡迎訊息
 */

// Chakra UI 元件匯入
import { Heading } from "@chakra-ui/react"; // 標題元件

/**
 * 首頁元件
 * 簡單的歡迎頁面，作為登入後的預設頁面
 *
 * @returns JSX.Element - 首頁 UI
 */
export default function HomePage() {
  // 返回歡迎標題
  return <Heading>歡迎來到主頁 🎉</Heading>;
}
