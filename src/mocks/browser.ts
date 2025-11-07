/**
 * browser.ts - MSW 瀏覽器端配置
 * 設置 Mock Service Worker (MSW) 在瀏覽器中攔截 API 請求
 */

// MSW 瀏覽器端工具匯入
import { setupWorker } from "msw/browser"; // setupWorker: 建立瀏覽器端 service worker

// 匯入 API 處理器
import { handlers } from "./handlers"; // handlers: 定義所有 API 端點的模擬回應

/**
 * 建立 MSW worker 實例
 * 使用 setupWorker 建立 service worker，並註冊所有 API 處理器
 * worker 會在瀏覽器中攔截符合的 HTTP 請求，並返回模擬的回應
 */
export const worker = setupWorker(...handlers); // ...handlers: 展開 handlers 陣列作為參數
