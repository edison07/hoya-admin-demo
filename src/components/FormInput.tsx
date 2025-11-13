/**
 * FormInput.tsx - 統一的表單輸入元件
 * 支援一般文字輸入和密碼輸入（帶顯示/隱藏功能）
 * 包含驗證錯誤顯示和標籤
 */

// React 核心 Hooks
import { forwardRef, useState } from "react"; // forwardRef: 轉發 ref, useState: 狀態管理

// 引入圖片資源
import showIcon from "@/assets/show.png";
import hiddenIcon from "@/assets/hidden.png";

/**
 * FormInput 元件的 Props 介面定義
 * 定義元件接受的所有屬性
 */
interface FormInputProps {
  label: string; // 欄位標籤文字（必填）
  error?: string; // 驗證錯誤訊息（可選）
  type?: string; // 輸入類型（text, password 等，預設 text）
  placeholder?: string; // 佔位提示文字（可選）
  value?: string; // 輸入值（可選，用於受控元件）
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 值變更處理函式（可選）
  onBlur?: () => void; // 失去焦點處理函式（可選）
  disabled?: boolean; // 是否禁用（可選）
  autoComplete?: string; // 瀏覽器自動完成提示（可選）
}

/**
 * FormInput 元件
 * 使用 forwardRef 包裝，可以接收父元件傳遞的 ref
 * 支援一般輸入和密碼輸入（帶顯示/隱藏切換功能）
 *
 * @param props - 元件屬性
 * @param ref - 轉發的 ref，指向內部 Input 元素
 * @returns JSX.Element - 表單輸入元件
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", ...props }, ref) => {
    // === 狀態管理 ===
    // showPassword: 控制密碼是否以明文顯示
    const [showPassword, setShowPassword] = useState(false);

    // === 計算衍生狀態 ===
    const isPasswordType = type === "password"; // 判斷是否為密碼類型
    // 如果是密碼類型且 showPassword 為 true，則顯示為 text，否則保持原類型
    const inputType = isPasswordType && showPassword ? "text" : type;

    // === 提取共用的 className ===
    const inputClassName = `focus:border-primary focus:ring-primary block w-full rounded-md border px-3 py-2 text-black shadow-sm focus:outline-none sm:text-sm ${
      error ? "border-red-600" : "border-gray-300"
    } ${props.disabled ? "cursor-not-allowed bg-gray-100" : ""}`;

    // === UI 渲染 ===
    return (
      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          {label}
        </label>

        {isPasswordType ? (
          <div className="relative">
            <input
              ref={ref}
              type={inputType}
              className={inputClassName}
              style={{ paddingRight: "4.5rem" }} // 為按鈕預留空間
              {...props}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                className="focus:ring-primary rounded text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => setShowPassword(!showPassword)}
                disabled={props.disabled}
                aria-pressed={showPassword}
                aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
              >
                <img
                  src={showPassword ? hiddenIcon : showIcon}
                  alt=""
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        ) : (
          <input
            ref={ref}
            type={inputType}
            className={inputClassName}
            {...props}
          />
        )}

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

// 設置元件顯示名稱，方便 React DevTools 除錯
FormInput.displayName = "FormInput";
