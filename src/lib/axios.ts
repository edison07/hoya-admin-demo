import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 秒逾時
});

// 攔截請求
api.interceptors.request.use((config) => {
  // 可在這裡附加 token
  // const token = localStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 攔截回應
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 對於登入 API 的 401 錯誤，不要重新導向，而是返回錯誤資料
    if (error.response?.status === 401 && error.config?.url?.includes('/auth/login')) {
      // 登入失敗，直接返回 response data
      return Promise.resolve(error.response);
    }

    // 其他 401 錯誤統一處理
    if (error.response?.status === 401) {
      console.error("Unauthorized, redirecting...");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
