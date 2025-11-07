/**
 * LoginPage.tsx - 使用者登入頁面
 * 提供使用者名稱和密碼輸入表單，包含即時驗證和錯誤處理
 */

// React 核心 Hooks
import { useState } from "react"; // 狀態管理 Hook

// Chakra UI 元件匯入
import {
  Box, // 容器元件
  Button, // 按鈕元件
  Flex, // Flexbox 佈局元件
  Heading, // 標題元件
  Text, // 文字元件
  Image, // 圖片元件
  VStack, // 垂直堆疊元件
  useToast, // Toast 通知 Hook
  Spinner, // 載入動畫元件
} from "@chakra-ui/react";

// 自訂 Hooks 和元件匯入
import { useLogin } from "@/hooks/useLogin"; // 登入邏輯 Hook
import { FormInput } from "@/components/FormInput"; // 表單輸入元件

// 驗證和類型相關匯入
import { loginSchema } from "@/schemas/auth.schema"; // Yup 驗證 schema
import { ValidationError } from "yup"; // Yup 驗證錯誤類型

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
  const [showPassword, setShowPassword] = useState(false); // 密碼顯示/隱藏狀態

  // === Hooks ===
  const loginMutation = useLogin(); // 登入 API mutation hook
  const toast = useToast(); // Toast 通知 hook

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
        error.inner.forEach((err) => {
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
          duration: 2000, // 顯示 2 秒
          isClosable: true, // 可手動關閉
        });
      } else {
        // 登入失敗（API 返回失敗狀態）
        toast({
          title: "登入失敗",
          description: result.message || "帳號或密碼錯誤",
          status: "error",
          duration: 3000, // 顯示 3 秒
          isClosable: true,
        });
      }
    } catch (error: any) {
      // 捕獲網路錯誤或其他異常
      const message = error?.response?.data?.message || "登入失敗，請稍後再試";
      toast({
        title: "登入失敗",
        description: message,
        status: "error",
        duration: 3000,
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
    // 主容器：全螢幕高度，使用 Flexbox 佈局
    <Flex h="100vh" w="full">
      {/* 左側區域 - 登入表單 */}
      {/* w: 響應式寬度（手機全寬，大螢幕 50%） */}
      {/* align: 垂直置中 */}
      {/* justify: 水平置中 */}
      <Flex w={{ base: "full", lg: "50%" }} align="center" justify="center">
        {/* 表單容器 */}
        {/* maxW: 最大寬度 */}
        {/* bg: 背景色 */}
        {/* p: 內距 */}
        {/* borderRadius: 圓角 */}
        {/* boxShadow: 陰影效果 */}
        {/* mt: 響應式上邊距 */}
        <Box
          maxW="md"
          bg="white"
          p={8}
          borderRadius="2xl"
          boxShadow="2xl"
          mt={{ base: 0, md: "150px", lg: "80px" }}
        >
          {/* 標題區域 */}
          {/* spacing: 子元素間距 */}
          {/* mb: 下邊距 */}
          <VStack spacing={4} mb={8}>
            {/* 應用程式標題 */}
            <Heading size="xl" color="#FF5722">
              HOYA BIT Admin
            </Heading>
            {/* 提示文字 */}
            <Text fontSize="sm" fontWeight="bold" color="gray.500">
              請輸入你的帳號和密碼來登入
            </Text>
          </VStack>

          {/* 登入表單 */}
          {/* onSubmit: 表單提交時呼叫 handleSubmit */}
          <form onSubmit={handleSubmit}>
            {/* 表單欄位垂直堆疊，間距為 5 */}
            <VStack spacing={5}>
              {/* 帳號輸入欄位 */}
              {/* label: 欄位標籤 */}
              {/* type: 輸入類型 */}
              {/* placeholder: 佔位提示文字 */}
              {/* value: 綁定的狀態值 */}
              {/* onChange: 輸入變更處理函式 */}
              {/* error: 驗證錯誤訊息 */}
              {/* disabled: 登入進行中時禁用 */}
              {/* autoComplete: 瀏覽器自動完成提示 */}
              <FormInput
                label="帳號"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => handleBlur("username")}
                error={errors.username}
                disabled={loginMutation.isPending}
                autoComplete="username"
              />

              {/* 密碼輸入欄位 */}
              {/* type="password": 顯示為密碼欄位（帶顯示/隱藏按鈕） */}
              {/* onBlur: 失去焦點時驗證 */}
              <FormInput
                label="密碼"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur("password")}
                error={errors.password}
                disabled={loginMutation.isPending}
                autoComplete="current-password"
              />

              {/* 登入按鈕 */}
              {/* type="submit": 提交表單 */}
              {/* colorScheme: Chakra UI 顏色主題 */}
              {/* bg: 背景色 */}
              {/* w: 寬度 */}
              {/* isLoading: 顯示載入狀態 */}
              {/* loadingText: 載入時顯示的文字 */}
              {/* spinner: 自訂載入動畫 */}
              {/* _hover: 滑鼠懸停樣式 */}
              <Button
                type="submit"
                colorScheme="orange"
                bg="#FF5722"
                w="full"
                isLoading={loginMutation.isPending}
                loadingText="登入中"
                spinner={<Spinner size="sm" />}
                _hover={{ bg: "#E64A19" }}
              >
                登入
              </Button>
            </VStack>
          </form>

          {/* 測試帳號提示文字 */}
          {/* mt: 上邊距 */}
          {/* textAlign: 文字對齊 */}
          <Text mt={6} textAlign="center" fontSize="sm" color="gray.600">
            測試帳號: admin / Admin123
          </Text>
        </Box>
      </Flex>

      {/* 右側區域 - Logo 展示 */}
      {/* w: 寬度 50% */}
      {/* align: 垂直置中 */}
      {/* justify: 水平置中 */}
      {/* display: 響應式顯示（手機隱藏，大螢幕顯示） */}
      <Flex
        w="50%"
        align="center"
        justify="center"
        display={{ base: "none", lg: "flex" }}
      >
        {/* 應用程式 Logo */}
        {/* src: 圖片來源 */}
        {/* alt: 替代文字 */}
        {/* transform: CSS 變換（縮放至 80%） */}
        <Image src={logo} alt="App logo" transform="scale(0.8)" />
      </Flex>
    </Flex>
  );
}
