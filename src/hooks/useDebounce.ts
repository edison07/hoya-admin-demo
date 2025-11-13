/**
 * useDebounce.ts - 防抖 Hook
 * 延遲執行值的更新，避免頻繁觸發
 */

// React 核心匯入
import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * 將一個值進行防抖處理，在指定延遲後才更新
 *
 * 使用範例：
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // 只有在使用者停止輸入 500ms 後才執行搜尋
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 *
 * @param value - 要進行防抖的值
 * @param delay - 延遲時間（毫秒），預設 500ms
 * @returns T - 防抖後的值
 */
export function useDebounce<T>(value: T, delay = 500): T {
  // 防抖後的值狀態
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 設定定時器，延遲更新值
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函數：如果值在延遲期間再次改變，清除舊的定時器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 當值或延遲改變時重新執行

  return debouncedValue;
}
