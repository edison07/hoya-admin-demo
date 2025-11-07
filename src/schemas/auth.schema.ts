/**
 * auth.schema.ts - 認證相關的 Yup 驗證 Schema
 * 定義登入表單的驗證規則
 */

// Yup 驗證庫匯入
import * as yup from "yup"; // Yup: 強大的 JavaScript 物件驗證庫

/**
 * 登入表單驗證 Schema
 * 定義使用者名稱和密碼的驗證規則
 *
 * 密碼規則：
 * - 長度：8-16 字元
 * - 必須包含：至少一個大寫字母、一個小寫字母、一個數字
 * - 允許的特殊字元：@$!%*#?&
 */
export const loginSchema = yup.object({
  // 使用者名稱欄位驗證
  username: yup.string().required("請輸入帳號"), // required: 必填欄位，並提供錯誤訊息

  // 密碼欄位驗證
  password: yup
    .string() // 類型為字串
    .required("請輸入密碼") // 必填欄位
    .min(8, "密碼格式不符，請再次檢查") // 最小長度 8 字元
    .max(16, "密碼格式不符，請再次檢查") // 最大長度 16 字元
    .matches(
      // 使用正規表示式驗證密碼格式
      // (?=.*[A-Z]): 至少包含一個大寫字母（正向前瞻斷言）
      // (?=.*[a-z]): 至少包含一個小寫字母（正向前瞻斷言）
      // (?=.*\d): 至少包含一個數字（正向前瞻斷言）
      // [A-Za-z\d@$!%*#?&]{8,16}: 只允許字母、數字和特定特殊字元，長度 8-16
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/,
      "密碼格式不符，請再次檢查", // 驗證失敗時的錯誤訊息
    ),
});

/**
 * 從 loginSchema 推斷出的 TypeScript 類型
 * 自動生成符合 schema 定義的類型
 */
export type LoginFormData = yup.InferType<typeof loginSchema>;
