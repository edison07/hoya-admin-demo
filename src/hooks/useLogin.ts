/**
 * useLogin.ts - 登入邏輯自訂 Hook
 * 封裝登入 API 呼叫、Token 儲存和頁面導航邏輯
 */

// React Query 相關匯入
import { useMutation } from "@tanstack/react-query"; // useMutation: 處理變更操作的 Hook

// React Router 相關匯入
import { useNavigate } from "react-router-dom"; // useNavigate: 程式化導航 Hook

// 服務層匯入
import { authService } from "@/services/auth.service"; // 認證服務

// 類型定義匯入
import type { LoginRequest } from "@/types/auth"; // 登入請求類型

/**
 * useLogin Hook
 * 提供登入功能，包含以下步驟：
 * 1. 呼叫登入 API
 * 2. 儲存認證 Token 到 localStorage
 * 3. 儲存使用者資訊到 localStorage
 * 4. 導航到首頁
 *
 * @returns UseMutationResult - React Query mutation 物件
 *   - mutate/mutateAsync: 執行登入
 *   - isPending: 是否正在執行
 *   - isError: 是否發生錯誤
 *   - error: 錯誤物件
 */
export const useLogin = () => {
  // 取得導航函式
  const navigate = useNavigate();

  // 返回 React Query mutation
  return useMutation({
    // mutationFn: 定義 mutation 要執行的函式
    // 接收登入憑證，呼叫 authService.login API
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),

    // onSuccess: 當 API 呼叫成功後執行
    // data: API 返回的資料
    onSuccess: (data) => {
      // 檢查登入是否成功且有返回資料
      if (data.success && data.data) {
        // 儲存認證 Token（使用 authService 的方法）
        authService.setToken(data.data.token);

        // 將使用者資訊序列化後儲存到 localStorage
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // 導航到首頁
        navigate("/");
      }
    },
  });
};
