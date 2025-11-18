/**
 * dateUtils.ts - 日期時間相關的工具函數
 * 使用 Day.js 提供日期格式化等常用功能
 */

// Day.js 匯入
import dayjs from "dayjs";

/**
 * 格式化日期時間為字串
 * 格式: YYYY-MM-DD HH:mm:ss
 *
 * @param date - 要格式化的 Date 物件、時間戳、或日期字串，預設為當前時間
 * @returns 格式化後的日期時間字串
 *
 * @example
 * formatDateTime() // "2025-11-14 16:30:45"
 * formatDateTime(new Date('2025-01-01')) // "2025-01-01 00:00:00"
 * formatDateTime('2025-01-01') // "2025-01-01 00:00:00"
 * formatDateTime(1704067200000) // "2025-01-01 08:00:00"
 */
export const formatDateTime = (
  date?: Date | string | number,
): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
