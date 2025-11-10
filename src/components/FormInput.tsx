/**
 * FormInput.tsx - 統一的表單輸入元件
 * 支援一般文字輸入和密碼輸入（帶顯示/隱藏功能）
 * 包含驗證錯誤顯示和標籤
 */

// React 核心 Hooks
import { forwardRef, useState } from "react"; // forwardRef: 轉發 ref, useState: 狀態管理

// Chakra UI 表單相關元件
import {
  FormControl, // 表單控制容器，處理驗證狀態
  FormLabel, // 表單標籤
  Input, // 輸入欄位
  FormErrorMessage, // 錯誤訊息顯示
  InputGroup, // 輸入群組，用於組合輸入和附加元素
  InputRightElement, // 輸入欄位右側元素容器
  Button, // 按鈕元件
} from "@chakra-ui/react";

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

    // === 輸入欄位元素 ===
    // 定義輸入欄位，可在密碼類型和一般類型中複用
    const inputElement = (
      <Input
        ref={ref} // 轉發 ref 給 Input 元素
        type={inputType} // 動態類型（text 或 password）
        pr={isPasswordType ? "4.5rem" : undefined} // 密碼類型時增加右側內距，為按鈕留空間
        {...props} // 展開其他 props
        borderColor={error ? "red.500" : "gray.300"} // 有錯誤時使用紅色邊框
        _hover={{ borderColor: error ? "red.600" : "gray.400" }} // 滑鼠懸停樣式
        _focus={{
          borderColor: error ? "red.600" : "#3182ce", // 焦點時邊框顏色
        }}
      />
    );

    // === UI 渲染 ===
    return (
      // FormControl: 表單控制容器，isInvalid 控制驗證狀態
      <FormControl isInvalid={!!error}>
        {/* 表單標籤 */}
        <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
          {label}
        </FormLabel>

        {/* 根據類型渲染不同的輸入結構 */}
        {isPasswordType ? (
          // 密碼類型：使用 InputGroup 包裹，添加顯示/隱藏按鈕
          <InputGroup size="md">
            {inputElement} {/* 輸入欄位 */}
            {/* 右側元素容器 */}
            <InputRightElement width="4.5rem">
              {/* 顯示/隱藏切換按鈕 */}
              <Button
                h="1.75rem" // 按鈕高度
                size="sm" // 小尺寸
                onClick={() => setShowPassword(!showPassword)} // 切換顯示狀態
                isDisabled={props.disabled} // 根據輸入欄位的禁用狀態禁用按鈕
                variant="ghost" // 幽靈樣式（透明背景）
              >
                {showPassword ? "隱藏" : "顯示"} {/* 動態按鈕文字 */}
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          // 一般類型：直接渲染輸入欄位
          inputElement
        )}

        {/* 錯誤訊息顯示（僅在有錯誤時顯示） */}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  },
);

// 設置元件顯示名稱，方便 React DevTools 除錯
FormInput.displayName = "FormInput";
