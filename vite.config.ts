/**
 * vite.config.ts - Vite 建置工具配置檔
 * 配置 Vite 開發伺服器和建置選項
 */

// Vite 配置工具匯入
import { defineConfig } from "vite"; // defineConfig: 提供類型提示的配置定義函式

// Vite 外掛匯入
import react from "@vitejs/plugin-react"; // React 外掛，支援 JSX 和 Fast Refresh
import tailwindcss from "@tailwindcss/vite"; // Tailwind CSS Vite 外掛

// Node.js 路徑模組
import path from "path"; // 用於處理檔案路徑

/**
 * 匯出 Vite 配置
 * defineConfig 提供完整的 TypeScript 類型支援
 */
export default defineConfig({
  // 外掛配置
  plugins: [
    react(), // 啟用 React 支援（JSX 轉換、Fast Refresh 等）
    tailwindcss(), // 啟用 Tailwind CSS 支援
  ],

  // 模組解析配置
  resolve: {
    alias: {
      // 設定路徑別名：@ 指向 src 目錄
      // 這讓我們可以使用 @/components 而不是 ../../components
      "@": path.resolve(__dirname, "src"), // __dirname: 當前檔案所在目錄
    },
  },
});
