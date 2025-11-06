import { forwardRef } from "react"; // 匯入 React 的 forwardRef 函式，用於將 ref 轉發給底層 DOM 元素。

/**
 * @interface FormInputProps
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 * @description 定義 FormInput 元件的屬性介面。
 * 繼承了標準 HTML <input> 元素的所有屬性，以便靈活傳遞如 type, placeholder 等。
 */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // 輸入框的標籤文字，必填。
  error?: string; // 錯誤訊息，可選。如果存在，會顯示錯誤樣式和訊息。
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  // 元件的渲染函式，接收 props 和一個 ref 參數。
  // label: 輸入框的標籤。
  // error: 錯誤訊息，用於顯示錯誤狀態和文字。
  // className: 額外的 CSS 類別，用於客製化樣式。
  // ...props: 展開所有其他傳遞給 <input> 元素的標準 HTML 屬性 (如 type, placeholder, value 等)。
  // ref: 從父元件轉發過來的 ref，將被附加到實際的 <input> 元素上。
  ({ label, error, className = "", ...props }, ref) => {
    return (
      // 最外層容器，佔滿可用寬度
      <div className="w-full">
        {/* 輸入框的標籤 */}
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {label}
        </label>
        {/* // 實際的輸入框元素 */}
        <input
          ref={ref} // 將轉發的 ref 附加到此 input 元素，以便父元件直接操作
          className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:outline-none ${
            // 根據 error 屬性動態改變邊框和背景顏色，提供視覺回饋
            error
              ? "border-red-400 bg-red-50 focus:border-red-500"
              : "border-gray-300 bg-white focus:border-blue-600 focus:ring-2"
          } ${className}`} // 合併基礎樣式、錯誤樣式和客製化樣式
          style={{ color: "#111827" }} // 設定輸入文字顏色
          {...props} // 展開所有其他傳遞的 HTML input 屬性
        />
        {/* // 條件渲染錯誤訊息：只有當 error 存在時才顯示 */}
        {error && (
          <p className="relative z-10 mt-1.5 bg-red-100 p-2 text-sm font-bold text-red-600">
            ⚠️ {error}
          </p>
        )}
      </div>
    );
  },
);

// 設定元件的顯示名稱，有助於在 React 開發者工具中除錯。
FormInput.displayName = "FormInput";
