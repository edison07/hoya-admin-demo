/**
 * axios.ts - Axios HTTP 客戶端配置
 * 建立並配置 Axios 實例，包含請求/回應攔截器
 */

// Axios 庫匯入
import axios from "axios"; // Axios: 流行的 HTTP 客戶端庫

/**
 * 建立 Axios 實例
 * 預設配置包含 baseURL 和 timeout
 */
export const api = axios.create({
  baseURL: "/api", // API 基礎路徑，所有請求會加上此前綴
  timeout: 10000, // 請求逾時時間：10 秒（10000 毫秒）
});

/**
 * 請求攔截器
 * 在每個請求發送前執行，可用於添加認證 Token 等
 */
api.interceptors.request.use((config) => {
  // 可在這裡附加 token 到請求標頭
  // 以下程式碼已註解，需要時可取消註解
  const token = localStorage.getItem("token"); // 從 localStorage 取得 token
  if (token) config.headers.Authorization = `Bearer ${token}`; // 將 token 加到 Authorization 標頭
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
      // 輸出錯誤訊息到控制台
      console.error("Unauthorized, redirecting...");
      // 可選：重新導向到登入頁面（目前已註解）
      // window.location.href = "/login";
    }

    // 拒絕 Promise，讓呼叫方可以捕獲錯誤
    return Promise.reject(error);
  },
);
