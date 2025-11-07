/**
 * router.tsx - 應用程式路由配置
 * 定義所有頁面路由和巢狀路由結構
 */

// React Router 路由建立函式
import { createBrowserRouter } from "react-router-dom"; // 建立瀏覽器路由器

// 主佈局元件
import App from "./App"; // 包含側邊欄的主佈局

// 頁面元件匯入
import LoginPage from "@/pages/LoginPage"; // 登入頁面
import HomePage from "@/pages/HomePage"; // 首頁
import WithdrawPlatformPage from "@/pages/WithdrawPlatformPage"; // 提幣平台設置頁面

/**
 * 應用程式路由配置
 * 使用 React Router v6 的資料路由 API
 *
 * 路由結構：
 * - /login - 登入頁面（獨立頁面，無側邊欄）
 * - / - 主應用程式（包含側邊欄佈局）
 *   - / (index) - 首頁
 *   - /withdraw-platform - 提幣平台設置頁面
 */
export const router = createBrowserRouter([
  // 登入路由：獨立頁面，不包含主佈局
  {
    path: "/login", // 路由路徑
    element: <LoginPage />, // 渲染的元件
  },
  // 主應用程式路由：包含側邊欄佈局
  {
    path: "/", // 根路徑
    element: <App />, // 主佈局元件（包含側邊欄和 Outlet）
    children: [
      // 子路由會在 App 元件的 Outlet 中渲染
      // 首頁路由：index: true 表示這是父路由的預設子路由
      { index: true, element: <HomePage /> },
      // 提幣平台設置路由：完整路徑為 /withdraw-platform
      { path: "withdraw-platform", element: <WithdrawPlatformPage /> },
    ],
  },
]);
