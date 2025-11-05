// src/router.tsx
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import WithdrawPlatformPage from "@/pages/WithdrawPlatformPage";

// 模擬登入檢查 (可改為真實的 auth 機制)
const isAuthenticated = () => !!localStorage.getItem("token");

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/login"), // 一開始導向登入
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <App />, // App 是主框架 (含 Sidebar + Outlet)
    children: [
      {
        index: true,
        element: <HomePage />, // /home 預設頁
      },
      {
        path: "withdraw-platform",
        element: <WithdrawPlatformPage />,
      },
    ],
  },
]);
