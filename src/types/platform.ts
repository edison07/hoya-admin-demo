/**
 * platform.ts - 平台相關的 TypeScript 類型定義
 * 定義提幣平台的資料結構
 */

/**
 * 平台介面
 * 定義提幣平台的基本資訊結構
 */
export interface Platform {
  id: number; // 平台唯一識別碼
  platformName: string; // 平台名稱
  withdrawEnabled: boolean; // 是否啟用提幣功能
  remark: string; // 備註
  updateTime: string; // 更新時間
}
