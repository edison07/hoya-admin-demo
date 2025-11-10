/**
 * auth.service.ts - 認證服務層
 * 提供登入、登出、Token 管理等認證相關功能
 */

// Axios 實例匯入
import { api } from "@/lib/axios"; // 配置好的 axios 實例

// 類型定義匯入
import type { LoginRequest, LoginResponse, User } from "@/types/auth"; // 登入請求和回應的類型、使用者類型

/**
 * 認證服務物件
 * 包含所有與使用者認證相關的 API 和工具方法
 */
export const authService = {
  /**
   * 登入方法
   * 向後端發送登入請求，獲取認證 Token 和使用者資訊
   *
   * @param credentials - 登入憑證（使用者名稱和密碼）
   * @returns Promise<LoginResponse> - 登入回應，包含 Token 和使用者資訊
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // 發送 POST 請求到 /auth/login 端點
    const response = await api.post<LoginResponse>(
      "/auth/login", // API 路徑
      credentials // 請求 body（使用者名稱和密碼）
    );
    // 返回回應資料
    return response.data;
  },

  /**
   * 登出方法
   * 清除本地儲存的認證 Token 和使用者資訊
   */
  logout: () => {
    // 從 localStorage 移除 token
    localStorage.removeItem("token");
    // 從 localStorage 移除使用者資訊
    localStorage.removeItem("user");
  },

  /**
   * 取得 Token
   * 從 localStorage 讀取儲存的認證 Token
   *
   * @returns string | null - Token 字串，若不存在則返回 null
   */
  getToken: (): string | null => {
    // 從 localStorage 讀取 token
    return localStorage.getItem("token");
  },

  /**
   * 設定 Token
   * 將認證 Token 儲存到 localStorage
   *
   * @param token - 要儲存的 Token 字串
   */
  setToken: (token: string) => {
    // 將 token 儲存到 localStorage
    localStorage.setItem("token", token);
  },

  /**
   * 檢查是否已認證
   * 透過檢查 localStorage 中是否存在 Token 來判斷使用者是否已登入
   *
   * @returns boolean - true 表示已認證，false 表示未認證
   */
  isAuthenticated: (): boolean => {
    // 使用雙重否定（!!）將字串轉換為布林值
    // 若 token 存在（非空字串），返回 true；否則返回 false
    return !!localStorage.getItem("token");
  },

  /**
   * 取得使用者資訊
   * 從 localStorage 讀取儲存的使用者資訊
   *
   * @returns User | null - 使用者物件，若不存在則返回 null
   */
  getUserInfo: (): User | null => {
    // 從 localStorage 讀取使用者資訊
    const userStr = localStorage.getItem("user");
    // 若存在則解析 JSON，否則返回 null
    return userStr ? JSON.parse(userStr) : null;
  },
};
