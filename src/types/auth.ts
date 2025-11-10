/**
 * auth.ts - 認證相關的 TypeScript 類型定義
 * 定義登入請求、回應和使用者資料的介面
 */

/**
 * 登入請求介面
 * 定義呼叫登入 API 時需要提供的資料結構
 */
export interface LoginRequest {
  username: string; // 使用者名稱
  password: string; // 密碼
}

/**
 * 使用者介面
 * 定義使用者的基本資訊結構
 */
export interface User {
  id: number; // 使用者唯一識別碼
  username: string; // 使用者名稱（登入用）
  name: string; // 使用者顯示名稱
  email: string; // 使用者電子郵件
}

/**
 * 登入回應介面
 * 定義後端登入 API 返回的資料結構
 */
export interface LoginResponse {
  success: boolean; // 登入是否成功
  data?: {
    // 登入成功時的資料（可選）
    token: string; // JWT 認證 Token
    user: User; // 使用者資訊
  };
  message: string; // 回應訊息（成功或錯誤訊息）
}
