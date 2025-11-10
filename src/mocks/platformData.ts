/**
 * platformData.ts - 平台 Mock 資料
 * 提供測試用的平台資料
 */

// 類型定義匯入
import type { Platform } from "@/types/platform";

/**
 * Mock 平台資料列表
 * 用於開發和測試
 */
export const mockPlatforms: Platform[] = [
  {
    id: 1,
    platformName: "Binance",
    withdrawEnabled: true,
    remark: "主要交易平台",
    updateTime: "2025-11-10 10:30:00",
  },
  {
    id: 2,
    platformName: "OKX",
    withdrawEnabled: true,
    remark: "備用平台",
    updateTime: "2025-11-09 15:20:00",
  },
  {
    id: 3,
    platformName: "Coinbase",
    withdrawEnabled: false,
    remark: "維護中",
    updateTime: "2025-11-08 09:15:00",
  },
  {
    id: 4,
    platformName: "Kraken",
    withdrawEnabled: true,
    remark: "歐美市場主要平台",
    updateTime: "2025-11-10 08:45:00",
  },
  {
    id: 5,
    platformName: "Bybit",
    withdrawEnabled: true,
    remark: "衍生品交易平台",
    updateTime: "2025-11-09 22:10:00",
  },
  {
    id: 6,
    platformName: "Huobi",
    withdrawEnabled: false,
    remark: "系統升級中",
    updateTime: "2025-11-07 14:30:00",
  },
  {
    id: 7,
    platformName: "Gate.io",
    withdrawEnabled: true,
    remark: "多幣種支援",
    updateTime: "2025-11-10 11:20:00",
  },
  {
    id: 8,
    platformName: "KuCoin",
    withdrawEnabled: true,
    remark: "小幣種交易平台",
    updateTime: "2025-11-09 18:50:00",
  },
  {
    id: 9,
    platformName: "Bitfinex",
    withdrawEnabled: true,
    remark: "專業交易者平台",
    updateTime: "2025-11-10 07:15:00",
  },
  {
    id: 10,
    platformName: "Gemini",
    withdrawEnabled: false,
    remark: "合規審核中",
    updateTime: "2025-11-06 16:40:00",
  },
  {
    id: 11,
    platformName: "Crypto.com",
    withdrawEnabled: true,
    remark: "信用卡支付平台",
    updateTime: "2025-11-10 09:30:00",
  },
  {
    id: 12,
    platformName: "Bittrex",
    withdrawEnabled: true,
    remark: "美國合規平台",
    updateTime: "2025-11-09 12:25:00",
  },
];
