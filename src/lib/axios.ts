/**
 * axios.ts - Axios HTTP 客戶端配置
 * 建立並配置 Axios 實例，包含請求/回應攔截器
 */

// Axios 庫匯入
import axios from "axios"; // Axios: 流行的 HTTP 客戶端庫

// Cookie 管理套件匯入
import Cookies from "js-cookie";

/**
 * 建立 Axios 實例
 * 預設配置包含 baseURL 和 timeout
 * 使用環境變數配置 API 基礎路徑
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api", // 從環境變數讀取 API 基礎路徑
  timeout: 10000, // 請求逾時時間：10 秒（10000 毫秒）
});

/**
 * 請求攔截器
 * 在每個請求發送前執行，可用於添加認證 Token 等
 */
api.interceptors.request.use((config) => {
  // 從 Cookie 取得認證 token（與 authService 保持一致）
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 將 token 加到 Authorization 標頭
  }
  return config; // 返回修改後的配置
});

/**
 * 回應攔截器
 * 在收到回應後執行，可用於統一處理錯誤
 */
api.interceptors.response.use(
  // 成功回應處理器
  (response) => response, // 直接返回回應，不做修改

  // 錯誤回應處理器
  (error) => {
    // 特殊處理：登入 API 的 401 錯誤
    // 對於登入 API 的 401 錯誤，不要重新導向，而是返回錯誤資料
    if (
      error.response?.status === 401 &&
      error.config?.url?.includes("/auth/login")
    ) {
      // 登入失敗，直接返回 response data（讓元件自行處理）
      return Promise.resolve(error.response);
    }

    // 其他 401 錯誤統一處理
    // 401 Unauthorized 通常表示未認證或 Token 過期
    if (error.response?.status === 401) {
      // 重新導向到登入頁面
      window.location.href = "/login";
    }

    // 拒絕 Promise，讓呼叫方可以捕獲錯誤
    return Promise.reject(error);
  },
);
