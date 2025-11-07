// React 核心庫匯入
import { StrictMode } from "react"; // React 嚴格模式，用於開發時檢測潛在問題
import { createRoot } from "react-dom/client"; // React 18 的根渲染 API

// UI 元件庫匯入
import { ChakraProvider } from "@chakra-ui/react"; // Chakra UI 主題提供者

// React Query 相關匯入
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 資料獲取和快取庫

// 路由相關匯入
import { RouterProvider } from "react-router-dom"; // React Router 路由提供者
import { router } from "@/router"; // 應用程式路由配置

// 全域樣式匯入
import "./index.css"; // 全域 CSS 樣式

/**
 * 建立 React Query 客戶端實例
 * 用於管理伺服器狀態、快取和資料同步
 */
const queryClient = new QueryClient();

/**
 * 啟用 Mock Service Worker (MSW) 用於 API 模擬
 * 僅在開發環境中啟用，用於模擬後端 API 回應
 *
 * @returns Promise<void> - 非同步函式，等待 worker 啟動完成
 */
async function enableMocking() {
  // 檢查是否為開發環境
  if (import.meta.env.DEV) {
    // 動態匯入 MSW worker
    const { worker } = await import("./mocks/browser");
    // 啟動 service worker
    await worker.start();
  }
}

/**
 * 應用程式啟動入口
 * 1. 先啟用 API 模擬（開發環境）
 * 2. 然後渲染 React 應用程式到 DOM
 */
enableMocking().then(() => {
  // 取得 root DOM 元素並建立 React root
  // document.getElementById("root")! - 使用非空斷言，確保元素存在
  createRoot(document.getElementById("root")!).render(
    // StrictMode: 啟用嚴格模式，幫助發現潛在問題
    <StrictMode>
      {/* ChakraProvider: 提供 Chakra UI 主題和樣式系統 */}
      {/* resetCSS={false}: 不使用 Chakra 的 CSS 重置，保留自訂樣式 */}
      <ChakraProvider resetCSS={false}>
        {/* QueryClientProvider: 提供 React Query 上下文，用於資料管理 */}
        <QueryClientProvider client={queryClient}>
          {/* RouterProvider: 提供路由功能，渲染路由配置 */}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </StrictMode>,
  );
});
