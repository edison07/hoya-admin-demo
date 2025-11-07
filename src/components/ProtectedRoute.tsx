/**
 * ProtectedRoute.tsx - 路由保護元件
 * 用於保護需要認證才能訪問的路由
 * 如果使用者未登入，會自動重新導向到登入頁面
 */

// React Router 相關匯入
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Navigate: 重新導向, Outlet: 子路由渲染容器, useLocation: 取得當前位置

// 認證服務匯入
import { authService } from "@/services/auth.service"; // 用於檢查使用者是否已認證

/**
 * ProtectedRoute 元件
 * 檢查使用者是否已認證：
 * - 已認證：渲染子路由（Outlet）
 * - 未認證：重新導向到登入頁面，並記錄原本要訪問的頁面
 *
 * @returns JSX.Element - Outlet 或 Navigate
 */
export const ProtectedRoute = () => {
  // 取得當前位置資訊
  const location = useLocation();

  // 檢查使用者是否已認證
  const isAuthenticated = authService.isAuthenticated();

  // 如果未認證，重新導向到登入頁面
  if (!isAuthenticated) {
    // state: { from: location } 用於記錄使用者原本想訪問的頁面
    // 登入成功後可以導回原頁面，提升使用者體驗
    // replace: true 表示替換當前歷史記錄，而非新增一筆
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 已認證，渲染子路由
  return <Outlet />;
};
