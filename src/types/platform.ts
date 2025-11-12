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

/**
 * 平台日誌介面
 * 定義平台操作日誌的資料結構
 */
export interface PlatformLog {
  id: number; // 日誌唯一識別碼
  platformId: number; // 平台 ID
  item: string; // 異動項目（修改、新增）
  beforeValue: string; // 異動前的值（多行格式）
  afterValue: string; // 異動後的值（多行格式）
  operator: string; // 操作用戶
  operateTime: string; // 操作時間
}

/**
 * API 回應基礎介面
 * 定義統一的 API 回應結構
 */
export interface ApiResponse<T> {
  success: boolean; // 請求是否成功
  data: T; // 回應資料
  message?: string; // 訊息（可選）
}

/**
 * 取得平台列表回應
 */
export type GetPlatformsResponse = ApiResponse<Platform[]>;

/**
 * 更新平台請求參數
 */
export interface UpdatePlatformRequest {
  id: number; // 平台 ID
  withdrawEnabled: boolean; // 是否啟用提幣功能
  remark: string; // 備註
}

/**
 * 更新平台回應
 */
export type UpdatePlatformResponse = ApiResponse<Platform>;

/**
 * 取得平台日誌回應
 */
export type GetPlatformLogsResponse = ApiResponse<PlatformLog[]>;
