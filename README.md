# HOYA BIT Admin Dashboard

## 專案簡介

這是一個使用 React + TypeScript + Vite 建立的後台管理系統，展示了現代化前端開發的最佳實踐。

## 技術棧

- **React 18** - 前端框架
- **TypeScript** - 型別安全
- **Vite** - 快速建構工具
- **Chakra UI** - UI 元件庫
- **Tailwind CSS** - 原子化 CSS 框架
- **React Router v6** - 路由管理
- **React Query (TanStack Query)** - 伺服器狀態管理
- **Yup** - 表單驗證
- **Axios** - HTTP 客戶端
- **Mock Service Worker (MSW)** - API 模擬

## 專案結構說明

```
hoya-admin-demo/
├── public/              # 靜態資源目錄（不會被打包處理）
│   └── vite.svg        # 靜態圖片等資源
├── src/                # 原始碼目錄
│   ├── components/     # 共用元件
│   │   ├── FormInput.tsx        # 表單輸入元件（支援文字和密碼輸入）
│   │   ├── Loading.tsx          # 載入動畫元件（Tailwind 實作）
│   │   └── ProtectedRoute.tsx   # 路由保護元件
│   ├── hooks/          # 自訂 Hooks
│   │   └── useLogin.ts          # 登入邏輯 Hook
│   ├── lib/            # 工具庫
│   │   └── axios.ts             # Axios 實例配置（含攔截器）
│   ├── mocks/          # Mock Service Worker 配置
│   │   ├── browser.ts           # MSW worker 設定
│   │   └── handlers.ts          # API 模擬處理器
│   ├── pages/          # 頁面元件
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx        # 登入頁面（含表單驗證）
│   │   └── WithdrawPlatformPage.tsx
│   ├── schemas/        # 驗證 Schema
│   │   └── auth.schema.ts       # 認證相關驗證規則
│   ├── services/       # API 服務層
│   │   └── auth.service.ts      # 認證 API 服務
│   ├── types/          # TypeScript 型別定義
│   │   └── auth.ts              # 認證相關型別
│   ├── App.tsx         # 主佈局元件（包含側邊欄）
│   ├── main.tsx        # 應用程式入口
│   ├── router.tsx      # 路由配置
│   ├── index.css       # 全域樣式（含 Tailwind）
│   └── vite-env.d.ts   # Vite 環境變數型別定義
├── dist/               # 打包後的檔案（執行 npm run build 後產生）
├── .env.development    # 開發環境變數
├── .env.production     # 正式環境變數
├── .env.example        # 環境變數範本
├── package.json        # 專案依賴和腳本
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
```

### 目錄說明

- **public/** - 存放不需要經過打包處理的靜態資源，這些檔案會直接複製到 dist/ 目錄
- **src/** - 所有原始碼，會經過 Vite 編譯和打包
- **dist/** - 執行 `npm run build` 後產生的打包檔案，用於部署到生產環境

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 環境變數設定

複製 `.env.example` 並根據環境建立相應的環境變數檔：

```bash
# 開發環境
cp .env.example .env.development

# 正式環境
cp .env.example .env.production
```

環境變數說明：

```bash
# API 基礎 URL
VITE_API_BASE_URL=/api              # 開發環境使用相對路徑
# VITE_API_BASE_URL=https://api.hoyabit.com  # 正式環境使用完整網址

# 應用程式標題
VITE_APP_TITLE=HOYA BIT Admin

# 是否啟用 Mock Service Worker（模擬 API）
VITE_ENABLE_MSW=true   # 開發時設為 true
# VITE_ENABLE_MSW=false  # 正式環境設為 false
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

開發伺服器會在 http://localhost:5173 啟動

### 4. 打包專案

```bash
npm run build
```

打包後的檔案會輸出到 `dist/` 目錄

### 5. 預覽打包結果

```bash
npm run preview
```

## Mock Service Worker (MSW) 說明

本專案使用 MSW 來模擬後端 API，讓前端開發不需要依賴真實的後端服務。

### 如何運作？

1. **開發模式下**：當 `VITE_ENABLE_MSW=true` 時，MSW 會攔截所有的 HTTP 請求
2. **模擬資料**：在 `src/mocks/handlers.ts` 中定義的處理器會返回模擬資料
3. **真實體驗**：從前端的角度看，就像在呼叫真實的 API 一樣

### 模擬的 API

目前模擬了以下 API：

- `POST /auth/login` - 登入 API
  - 測試帳號：`admin` / `password123`
  - 返回 JWT Token 和使用者資訊

### 如何新增模擬 API？

在 `src/mocks/handlers.ts` 中新增處理器：

```typescript
export const handlers = [
  // 現有的登入 API
  http.post("/auth/login", ...),

  // 新增你的 API
  http.get("/api/users", () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    });
  }),
];
```

## 資料流程圖

```
┌─────────────┐
│  LoginPage  │ 使用者輸入帳號密碼
└──────┬──────┘
       │ handleSubmit()
       ▼
┌─────────────┐
│  useLogin   │ React Query Hook
│   Hook      │ mutate(credentials)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ authService │ 服務層
│   .login()  │ 呼叫 API
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Axios     │ HTTP 客戶端
│  Instance   │ 發送請求 + 攔截器
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     MSW     │ Mock Service Worker
│  (開發模式)  │ 攔截請求並返回模擬資料
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Response   │ { success: true, data: { token, user } }
└──────┬──────┘
       │
       ▼ onSuccess
┌─────────────┐
│  儲存 Token │ localStorage.setItem("token", ...)
│  儲存使用者 │ localStorage.setItem("user", ...)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  導航到首頁 │ navigate("/")
└─────────────┘
```

## 登入頁面功能說明

### 表單驗證

使用 Yup Schema 進行驗證：

- **帳號驗證**
  - 必填欄位
  - 長度 3-20 字元
  - onBlur（失焦）驗證

- **密碼驗證**
  - 必填欄位
  - 最少 8 字元
  - 至少 1 個大寫字母
  - 至少 1 個小寫字母
  - 至少 1 個數字
  - onBlur（失焦）驗證

### 密碼顯示/隱藏

FormInput 元件支援密碼顯示切換：

```tsx
<FormInput
  type="password"  // 會自動顯示「顯示/隱藏」按鈕
  // ...
/>
```

### 載入狀態

登入過程中會顯示載入狀態：

- 按鈕顯示 "登入中" 文字
- 顯示旋轉動畫
- 禁用所有輸入欄位

## 路由保護機制

### ProtectedRoute 元件

所有需要登入才能訪問的頁面都會經過 `ProtectedRoute` 保護：

```tsx
// 未登入 → 自動導向登入頁
// 已登入 → 正常顯示頁面
```

### 登入流程

1. 使用者訪問受保護的頁面（例如：`/`）
2. `ProtectedRoute` 檢查是否有 Token
3. 如果沒有 Token，導向 `/login`，並記錄原本要訪問的頁面
4. 使用者登入成功後，自動導回原本要訪問的頁面

## 測試帳號

```
帳號：admin
密碼：password123
```

## 開發指南

### 新增頁面

1. 在 `src/pages/` 建立頁面元件
2. 在 `src/router.tsx` 新增路由配置
3. 如需保護，將路由放在 `ProtectedRoute` 的 children 中

### 新增 API 服務

1. 在 `src/types/` 定義 TypeScript 型別
2. 在 `src/services/` 建立服務檔案
3. 在 `src/hooks/` 建立 React Query Hook
4. 在 `src/mocks/handlers.ts` 新增模擬 API（開發用）

### 新增表單驗證

1. 在 `src/schemas/` 建立 Yup Schema
2. 在元件中使用 `schema.validate()` 進行驗證

## 專案特色

### 1. 完整的 TypeScript 型別定義

所有 API 請求/回應、元件 Props 都有完整的型別定義

### 2. 統一的錯誤處理

Axios 攔截器統一處理 401 錯誤，自動導向登入頁

### 3. 環境變數管理

不同環境使用不同的 `.env` 檔案，方便配置

### 4. 元件化設計

共用元件（FormInput、Loading、ProtectedRoute）提高程式碼重用性

### 5. 詳細的程式碼註解

每個檔案都有完整的繁體中文註解，方便學習和維護

## 學習資源

- [React 官方文件](https://react.dev/)
- [TypeScript 官方文件](https://www.typescriptlang.org/)
- [Vite 官方文件](https://vitejs.dev/)
- [React Query 官方文件](https://tanstack.com/query/latest)
- [Chakra UI 官方文件](https://chakra-ui.com/)
- [Tailwind CSS 官方文件](https://tailwindcss.com/)
- [React Router 官方文件](https://reactrouter.com/)
- [MSW 官方文件](https://mswjs.io/)

## 授權

MIT
