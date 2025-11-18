/**
 * LoginPage.tsx - 使用者登入頁面
 * 提供使用者名稱和密碼輸入表單，包含即時驗證和錯誤處理
 */

// React 核心 Hooks
import { useState } from "react"; // useState: 狀態管理

// Chakra UI 元件匯入
import {
  useToast, // Toast 通知 Hook
  Spinner, // 載入動畫元件
} from "@chakra-ui/react";

// 自訂 Hooks 和元件匯入
import { useLogin } from "@/hooks/useLogin"; // 登入邏輯 Hook
import { FormInput } from "@/components/FormInput"; // 表單輸入元件

// 驗證和類型相關匯入
import { loginSchema } from "@/schemas/auth.schema"; // Yup 驗證 schema
import { ValidationError } from "yup"; // Yup 驗證錯誤類型
import type { AxiosError } from "axios"; // Axios 錯誤類型

// 靜態資源匯入
import logo from "@/assets/logo.png"; // 應用程式 Logo

/**
 * 表單錯誤訊息的介面定義
 * 用於儲存使用者名稱和密碼的驗證錯誤訊息
 */
interface FormErrors {
  username?: string; // 使用者名稱錯誤訊息（可選）
  password?: string; // 密碼錯誤訊息（可選）
}

/**
 * API 錯誤回應的介面定義
 * 定義後端 API 錯誤回應的資料結構
 */
interface ErrorResponse {
  message?: string; // 錯誤訊息（可選）
}

/**
 * 登入頁面元件
 * 負責處理使用者登入流程，包含表單驗證、提交和錯誤處理
 *
 * @returns JSX.Element - 登入頁面 UI
 */
export default function LoginPage() {
  // === 狀態管理 ===
  const [username, setUsername] = useState(""); // 使用者名稱輸入值
  const [password, setPassword] = useState(""); // 密碼輸入值
  const [errors, setErrors] = useState<FormErrors>({}); // 表單驗證錯誤訊息

  // === Hooks ===
  const loginMutation = useLogin(); // 登入 API mutation hook
  const toast = useToast(); // Toast 通知 hook

  // Toast 持續時間常數
  const TOAST_SUCCESS_DURATION = 2000;
  const TOAST_ERROR_DURATION = 3000;

  /**
   * 驗證整個表單
   * 使用 Yup schema 驗證使用者名稱和密碼
   *
   * @returns Promise<boolean> - 驗證成功返回 true，失敗返回 false
   */
  const validateForm = async (): Promise<boolean> => {
    try {
      // 使用 loginSchema 驗證表單資料
      // abortEarly: false 表示收集所有錯誤，而非遇到第一個錯誤就停止
      await loginSchema.validate({ username, password }, { abortEarly: false });
      // 驗證成功，清空錯誤訊息
      setErrors({});
      return true; // 返回驗證成功
    } catch (error) {
      // 檢查是否為 Yup 驗證錯誤
      if (error instanceof ValidationError) {
        // 建立新的錯誤物件
        const newErrors: FormErrors = {};
        // 遍歷所有驗證錯誤
        error.inner.forEach((err: ValidationError) => {
          // 如果錯誤有路徑（欄位名稱）
          if (err.path) {
            // 將錯誤訊息存入對應欄位
            newErrors[err.path as keyof FormErrors] = err.message;
          }
        });
        // 更新錯誤狀態
        setErrors(newErrors);
      }
      return false; // 返回驗證失敗
    }
  };

  /**
   * 處理輸入欄位失去焦點事件
   * 當使用者離開輸入欄位時，驗證該欄位的值
   *
   * @param field - 要驗證的欄位名稱（username 或 password）
   */
  const handleBlur = async (field: keyof FormErrors) => {
    try {
      // 使用 validateAt 只驗證特定欄位
      await loginSchema.validateAt(field, { username, password });
      // 驗證成功，清除該欄位的錯誤訊息
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      // 驗證失敗，設置錯誤訊息
      if (error instanceof ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: error.message }));
      }
    }
  };

  /**
   * 使用者名稱欄位失去焦點處理函式
   * 當使用者離開帳號輸入框時觸發驗證
   */
  const handleUsernameBlur = () => handleBlur("username");

  /**
   * 密碼欄位失去焦點處理函式
   * 當使用者離開密碼輸入框時觸發驗證
   */
  const handlePasswordBlur = () => handleBlur("password");

  /**
   * 處理表單提交
   * 1. 驗證表單資料
   * 2. 呼叫登入 API
   * 3. 根據結果顯示成功或失敗通知
   *
   * @param e - React 表單事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // 防止表單預設提交行為（頁面重新整理）
    e.preventDefault();

    // 驗證表單
    const isValid = await validateForm();
    if (!isValid) {
      // 驗證失敗，不繼續執行
      return;
    }

    try {
      // 呼叫登入 API mutation
      const result = await loginMutation.mutateAsync({ username, password });

      // 檢查登入結果
      if (result.success) {
        // 登入成功，顯示成功通知
        toast({
          title: "登入成功",
          status: "success",
          duration: TOAST_SUCCESS_DURATION, // 顯示 2 秒
          isClosable: true, // 可手動關閉
        });
      } else {
        // 登入失敗（API 返回失敗狀態）
        toast({
          title: "登入失敗",
          description: result.message || "帳號或密碼錯誤",
          status: "error",
          duration: TOAST_ERROR_DURATION, // 顯示 3 秒
          isClosable: true,
        });
      }
    } catch (error) {
      // 捕獲網路錯誤或其他異常
      // 使用 AxiosError 型別來獲得更好的型別安全
      const axiosError = error as AxiosError<ErrorResponse>;
      const message =
        axiosError.response?.data?.message || "登入失敗，請稍後再試";
      toast({
        title: "登入失敗",
        description: message,
        status: "error",
        duration: TOAST_ERROR_DURATION,
        isClosable: true,
      });
    }
  };

  /**
   * 處理使用者名稱輸入變更
   * 當使用者輸入時，更新狀態並清除該欄位的錯誤訊息
   *
   * @param e - React 輸入變更事件
   */
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 更新使用者名稱狀態
    setUsername(e.target.value);
    // 如果該欄位有錯誤訊息，清除它（即時反饋）
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  /**
   * 處理密碼輸入變更
   * 當使用者輸入時，更新狀態並清除該欄位的錯誤訊息
   *
   * @param e - React 輸入變更事件
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 更新密碼狀態
    setPassword(e.target.value);
    // 如果該欄位有錯誤訊息，清除它（即時反饋）
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  // === UI 渲染 ===
  return (
    // 主容器 - 全螢幕 flex 佈局
    <div className="flex min-h-screen bg-white">
      {/* 左側區域 - 登入表單容器（響應式：手機全寬，桌面 1/2 寬） */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        {/* 表單卡片 - 圓角陰影樣式 */}
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          {/* 標題區域 - 垂直堆疊居中 */}
          <div className="mb-8 space-y-4 text-center">
            {/* 應用程式標題 */}
            <h1 className="text-primary-light text-3xl font-bold">
              HOYA BIT Admin
            </h1>
            {/* 提示文字 */}
            <p className="text-sm font-bold text-gray-400">
              請輸入你的帳號和密碼來登入
            </p>
          </div>

          {/* 登入表單 - 提交時觸發 handleSubmit */}
          <form onSubmit={handleSubmit}>
            {/* 表單欄位容器 - 垂直堆疊，間距 5 */}
            <div className="space-y-5">
              {/* 帳號輸入欄位 - 支援即時驗證和錯誤顯示 */}
              <FormInput
                label="帳號"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={handleUsernameBlur}
                error={errors.username}
                disabled={loginMutation.isPending}
                autoComplete="username"
              />

              {/* 密碼輸入欄位 - 帶顯示/隱藏切換功能 */}
              <FormInput
                label="密碼"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                error={errors.password}
                disabled={loginMutation.isPending}
                autoComplete="current-password"
              />

              {/* 登入按鈕 - 載入中時顯示 Spinner 並禁用 */}
              <button
                type="submit"
                className={`bg-primary text-primary-foreground hover:bg-brand-600 w-full rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${
                  loginMutation.isPending ? "cursor-not-allowed opacity-70" : ""
                } `}
                disabled={loginMutation.isPending}
              >
                {/* 按鈕內容 - 根據載入狀態顯示不同內容 */}
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <Spinner size="sm" className="mr-2" /> 登入中
                  </span>
                ) : (
                  "登入"
                )}
              </button>
            </div>
          </form>

          {/* 測試帳號提示文字 - 方便開發測試 */}
          <p className="mt-6 text-center text-sm text-gray-600">
            測試帳號: admin / Admin123
          </p>
        </div>
      </div>

      {/* 右側區域 - Logo 展示（桌面版顯示，手機版隱藏） */}
      <div className="hidden w-1/2 items-center justify-center lg:flex">
        {/* 應用程式 Logo - 縮小至 80% */}
        <img src={logo} alt="App logo" className="scale-80 transform" />
      </div>
    </div>
  );
}
