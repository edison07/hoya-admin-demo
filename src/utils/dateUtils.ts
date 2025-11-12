/**
 * dateUtils.ts - 日期時間相關的工具函數
 * 提供日期格式化等常用功能
 */

/**
 * 格式化日期時間為字串
 * 格式: YYYY-MM-DD HH:mm:ss
 *
 * @param date - 要格式化的 Date 物件，預設為當前時間
 * @returns 格式化後的日期時間字串
 *
 * @example
 * formatDateTime() // "2025-11-10 16:30:45"
 * formatDateTime(new Date('2025-01-01')) // "2025-01-01 00:00:00"
 */
export const formatDateTime = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
