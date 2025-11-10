/**
 * router.tsx - 應用程式路由配置
 * 定義所有頁面路由和巢狀路由結構
 */

// React Router 路由建立函式
import { createBrowserRouter } from "react-router-dom"; // 建立瀏覽器路由器

// 主佈局元件
import App from "./App"; // 包含側邊欄的主佈局

// 路由保護元件
import { ProtectedRoute } from "@/components/ProtectedRoute"; // 用於保護需要認證的路由

// 頁面元件匯入
import LoginPage from "@/pages/LoginPage"; // 登入頁面
import HomePage from "@/pages/HomePage"; // 首頁
import WithdrawPlatformPage from "@/pages/WithdrawPlatformPage"; // 提幣平台設置頁面

/**
 * 應用程式路由配置
 * 使用 React Router v6 的資料路由 API
 *
 * 路由結構：
 * - /login - 登入頁面（公開路由，無需認證）
 * - / - 受保護的路由（需要認證）
 *   - ProtectedRoute 會檢查使用者是否已登入
 *   - 未登入會自動重新導向到 /login
 *   - / (index) - 首頁
 *   - /withdraw-platform - 提幣平台設置頁面
 */
export const router = createBrowserRouter([
  // 登入路由：公開路由，不需要認證
  {
    path: "/login", // 路由路徑
    element: <LoginPage />, // 渲染的元件
  },
  // 受保護的路由：需要通過 ProtectedRoute 驗證
  {
    path: "/", // 根路徑
    element: <ProtectedRoute />, // 路由保護層，驗證使用者是否已登入
    children: [
      // 通過驗證後，渲染 App 佈局及其子路由
      {
        element: <App />, // 主佈局元件（包含側邊欄和 Outlet）
        children: [
          // 首頁路由：index: true 表示這是父路由的預設子路由
          { index: true, element: <HomePage /> },
          // 提幣平台設置路由：完整路徑為 /withdraw-platform
          { path: "withdraw-platform", element: <WithdrawPlatformPage /> },
        ],
      },
    ],
  },
]);
