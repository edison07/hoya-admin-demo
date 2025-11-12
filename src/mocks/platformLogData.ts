/**
 * platformLogData.ts - 平台日誌 Mock 資料
 * 提供測試用的平台操作日誌資料
 */

// 類型定義匯入
import type { PlatformLog } from "@/types/platform";

/**
 * Mock 平台日誌資料列表
 * 用於開發和測試
 */
export const mockPlatformLogs: PlatformLog[] = [
  // Binance (ID: 1) 的記錄
  {
    id: 1,
    platformId: 1,
    item: "修改",
    beforeValue: "備註：測試平台\n提幣功能：停用",
    afterValue: "備註：主要交易平台\n提幣功能：啟用",
    operator: "張三",
    operateTime: "2025-11-10 10:30:00",
  },
  {
    id: 2,
    platformId: 1,
    item: "修改",
    beforeValue: "備註：次要平台\n提幣功能：啟用",
    afterValue: "備註：測試平台\n提幣功能：停用",
    operator: "李四",
    operateTime: "2025-11-09 14:20:00",
  },
  {
    id: 3,
    platformId: 1,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Binance\n備註：次要平台\n提幣功能：啟用",
    operator: "系統管理員",
    operateTime: "2025-11-08 09:15:00",
  },

  // OKX (ID: 2) 的記錄
  {
    id: 4,
    platformId: 2,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：OKX\n備註：備用平台\n提幣功能：啟用",
    operator: "張三",
    operateTime: "2025-11-09 15:20:00",
  },

  // Coinbase (ID: 3) 的記錄
  {
    id: 5,
    platformId: 3,
    item: "修改",
    beforeValue: "備註：正常運行\n提幣功能：啟用",
    afterValue: "備註：維護中\n提幣功能：停用",
    operator: "系統管理員",
    operateTime: "2025-11-08 09:15:00",
  },
  {
    id: 6,
    platformId: 3,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Coinbase\n備註：正常運行\n提幣功能：啟用",
    operator: "王五",
    operateTime: "2025-11-07 16:30:00",
  },

  // Kraken (ID: 4) 的記錄
  {
    id: 7,
    platformId: 4,
    item: "修改",
    beforeValue: "備註：歐美市場平台\n提幣功能：啟用",
    afterValue: "備註：歐美市場主要平台\n提幣功能：啟用",
    operator: "李四",
    operateTime: "2025-11-10 08:45:00",
  },
  {
    id: 8,
    platformId: 4,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Kraken\n備註：歐美市場平台\n提幣功能：啟用",
    operator: "張三",
    operateTime: "2025-11-09 10:00:00",
  },

  // Bybit (ID: 5) 的記錄
  {
    id: 9,
    platformId: 5,
    item: "修改",
    beforeValue: "備註：合約交易平台\n提幣功能：啟用",
    afterValue: "備註：衍生品交易平台\n提幣功能：啟用",
    operator: "王五",
    operateTime: "2025-11-09 22:10:00",
  },
  {
    id: 10,
    platformId: 5,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Bybit\n備註：合約交易平台\n提幣功能：啟用",
    operator: "系統管理員",
    operateTime: "2025-11-08 15:30:00",
  },

  // Huobi (ID: 6) 的記錄
  {
    id: 11,
    platformId: 6,
    item: "修改",
    beforeValue: "備註：正常運營\n提幣功能：啟用",
    afterValue: "備註：系統升級中\n提幣功能：停用",
    operator: "系統管理員",
    operateTime: "2025-11-07 14:30:00",
  },
  {
    id: 12,
    platformId: 6,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Huobi\n備註：正常運營\n提幣功能：啟用",
    operator: "張三",
    operateTime: "2025-11-06 11:20:00",
  },

  // Gate.io (ID: 7) 的記錄
  {
    id: 13,
    platformId: 7,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Gate.io\n備註：多幣種支援\n提幣功能：啟用",
    operator: "李四",
    operateTime: "2025-11-10 11:20:00",
  },

  // KuCoin (ID: 8) 的記錄
  {
    id: 14,
    platformId: 8,
    item: "修改",
    beforeValue: "備註：小幣種平台\n提幣功能：啟用",
    afterValue: "備註：小幣種交易平台\n提幣功能：啟用",
    operator: "王五",
    operateTime: "2025-11-09 18:50:00",
  },
  {
    id: 15,
    platformId: 8,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：KuCoin\n備註：小幣種平台\n提幣功能：啟用",
    operator: "張三",
    operateTime: "2025-11-08 13:15:00",
  },

  // Bitfinex (ID: 9) 的記錄
  {
    id: 16,
    platformId: 9,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Bitfinex\n備註：專業交易者平台\n提幣功能：啟用",
    operator: "系統管理員",
    operateTime: "2025-11-10 07:15:00",
  },

  // Gemini (ID: 10) 的記錄
  {
    id: 17,
    platformId: 10,
    item: "修改",
    beforeValue: "備註：正常運營\n提幣功能：啟用",
    afterValue: "備註：合規審核中\n提幣功能：停用",
    operator: "系統管理員",
    operateTime: "2025-11-06 16:40:00",
  },
  {
    id: 18,
    platformId: 10,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Gemini\n備註：正常運營\n提幣功能：啟用",
    operator: "李四",
    operateTime: "2025-11-05 14:00:00",
  },

  // Crypto.com (ID: 11) 的記錄
  {
    id: 19,
    platformId: 11,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Crypto.com\n備註：信用卡支付平台\n提幣功能：啟用",
    operator: "張三",
    operateTime: "2025-11-10 09:30:00",
  },

  // Bittrex (ID: 12) 的記錄
  {
    id: 20,
    platformId: 12,
    item: "新增",
    beforeValue: "-",
    afterValue: "平台：Bittrex\n備註：美國合規平台\n提幣功能：啟用",
    operator: "王五",
    operateTime: "2025-11-09 12:25:00",
  },
];
