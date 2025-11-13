/**
 * DateRangePicker.tsx - 日期區間選擇器元件
 * 使用 flatpickr 實現的日期區間選擇功能
 */

// React 核心匯入
import { useEffect, useRef } from "react";

// Chakra UI 元件匯入
import { Input } from "@chakra-ui/react";

// flatpickr 相關匯入
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import locale from "flatpickr/dist/l10n/zh-tw.js";

// 日期處理工具
import dayjs from "dayjs";

/**
 * DateRangePicker Props 介面
 */
interface DateRangePickerProps {
  startDate?: string; // 開始日期 (YYYY-MM-DD)
  endDate?: string; // 結束日期 (YYYY-MM-DD)
  onChange: (dates: { startDate: string; endDate: string }) => void; // 日期變更回調
  placeholder?: string; // 輸入框提示文字
}

/**
 * 日期區間選擇器元件
 * 提供選擇開始和結束日期的功能
 *
 * @param props - DateRangePickerProps
 * @returns JSX.Element - 日期區間選擇器 UI
 */
export default function DateRangePicker({
  startDate = "",
  endDate = "",
  onChange,
  placeholder = "請選擇日期區間",
}: DateRangePickerProps) {
  // 輸入框引用
  const inputRef = useRef<HTMLInputElement>(null);

  // flatpickr 實例引用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flatpickrRef = useRef<any>(null);

  // 用於儲存最新 onChange 函式的引用，避免 stale closure
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // 初始化 flatpickr
  useEffect(() => {
    if (inputRef.current && !flatpickrRef.current) {
      flatpickrRef.current = flatpickr(inputRef.current, {
        mode: "range", // 區間模式
        dateFormat: "Y-m-d", // 日期格式
        locale: locale.zh_tw, // 繁體中文
        onChange: (selectedDates) => {
          // 當選擇了兩個日期時觸發
          if (selectedDates.length === 2) {
            const start = dayjs(selectedDates[0]).format("YYYY-MM-DD");
            const end = dayjs(selectedDates[1]).format("YYYY-MM-DD");
            onChangeRef.current({ startDate: start, endDate: end }); // 使用 ref 中的最新函式
          } else if (selectedDates.length === 0) {
            // 清空時觸發
            onChangeRef.current({ startDate: "", endDate: "" }); // 使用 ref 中的最新函式
          }
        },
      });
    }

    // 清理函數
    return () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
        flatpickrRef.current = null;
      }
    };
  }, []); // 移除 onChange 依賴
  // 當外部傳入的日期變更時，更新 flatpickr 的值
  useEffect(() => {
    if (flatpickrRef.current) {
      if (startDate && endDate) {
        flatpickrRef.current.setDate([startDate, endDate], false);
      } else {
        flatpickrRef.current.clear();
      }
    }
  }, [startDate, endDate]);

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      fontSize="sm"
      readOnly
    />
  );
}
