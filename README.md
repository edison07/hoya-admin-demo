# HOYA BIT Admin Dashboard

## 專案簡介

這是一個使用 React + TypeScript + Vite 建立的後台管理系統，展示了現代化前端開發的最佳實踐。專案包含完整的使用者認證、權限管理、以及業務功能模組。

## 技術棧

### 核心框架
- **React 18** - 前端框架
- **TypeScript** - 型別安全
- **Vite** - 快速建構工具

### UI 框架
- **Chakra UI** - 主要 UI 元件庫（Modal、Button、Form 等標準元件）
- **Tailwind CSS** - 原子化 CSS 框架（自訂樣式、動畫、第三方元件樣式）
- **react-data-grid** - 高效能資料表格元件
- **react-datepicker** - 日期選擇器元件

### 狀態管理
- **Redux Toolkit** - 客戶端狀態管理（使用者狀態、權限）
- **React Query (TanStack Query)** - 伺服器狀態管理（API 資料快取）

### 路由與驗證
- **React Router v6** - 路由管理
- **Yup** - 表單驗證 Schema

### 工具函式庫
- **Day.js** - 輕量級日期時間處理庫

### API 與開發工具
- **Axios** - HTTP 客戶端（含攔截器）
- **Mock Service Worker (MSW)** - API 模擬

## 主要功能

### 🔐 認證系統
- JWT Token 認證
- LocalStorage 持久化
- 自動 Token 刷新和過期處理
- 登入後自動導回原頁面

### 👤 使用者管理
- 使用者資訊 Redux 狀態管理
- 權限系統整合（canEdit, canViewLog）
- 登入/登出流程

### 🎯 權限控制
- `PermsWrapper` 元件進行細粒度權限控制
- 支援巢狀權限檢查
- 基於 Redux user state 的即時權限驗證

### 💰 提幣平台管理
- 平台列表展示（含篩選和搜尋）
- 平台狀態編輯（啟用/停用提幣功能）
- 操作日誌查看
- React Query 自動快取和重新驗證

## 專案結構

```
hoya-admin-demo/
├── public/                    # 靜態資源目錄
│   ├── favicon.ico           # 網站圖示
│   └── mockServiceWorker.js  # MSW Service Worker
├── src/                      # 原始碼目錄
│   ├── components/           # 共用元件
│   │   ├── FormInput.tsx              # 統一表單輸入（支援密碼顯示/隱藏）
│   │   ├── Loading.tsx                # 載入動畫（Tailwind 實作）
│   │   ├── PermsWrapper.tsx           # 權限包裝元件
│   │   ├── ProtectedRoute.tsx         # 路由保護元件
│   │   ├── DateRangePicker.tsx        # 日期範圍選擇器（封裝 react-datepicker）
│   │   └── WithdrawPlatform/          # 提幣平台業務元件
│   │       ├── PlatformTable.tsx            # 平台列表表格（使用 PlatformActionsCell）
│   │       ├── PlatformSearchFilters.tsx    # 搜尋篩選器（react-datepicker）
│   │       ├── PlatformActionsCell.tsx      # 操作按鈕儲存格（修改/日誌按鈕）
│   │       ├── EditPlatformModal.tsx        # 編輯平台 Modal
│   │       └── PlatformLogModal.tsx         # 平台日誌 Modal（react-data-grid + Tailwind）
│   ├── hooks/                # 自訂 Hooks
│   │   ├── useLogin.ts                # 登入邏輯 Hook（React Query）
│   │   └── usePlatform.ts             # 平台資料 Hook（React Query）
│   ├── lib/                  # 工具庫配置
│   │   └── axios.ts                   # Axios 實例（含攔截器）
│   ├── mocks/                # Mock Service Worker
│   │   ├── browser.ts                 # MSW worker 設定
│   │   ├── handlers.ts                # API 處理器
│   │   ├── platformData.ts            # 平台模擬資料
│   │   └── platformLogData.ts         # 日誌模擬資料
│   ├── pages/                # 頁面元件
│   │   ├── HomePage.tsx               # 首頁
│   │   ├── LoginPage.tsx              # 登入頁面（含表單驗證）
│   │   └── WithdrawPlatformPage.tsx   # 提幣平台管理頁面
│   ├── schemas/              # Yup 驗證 Schema
│   │   └── auth.schema.ts             # 認證表單驗證規則
│   ├── services/             # API 服務層
│   │   ├── auth.service.ts            # 認證 API 服務
│   │   └── platform.service.ts        # 平台 API 服務
│   ├── store/                # Redux Store
│   │   ├── index.ts                   # Store 配置
│   │   ├── hooks.ts                   # 類型安全的 Redux Hooks
│   │   └── slices/
│   │       └── userSlice.ts           # 使用者狀態切片（含權限）
│   ├── types/                # TypeScript 型別定義
│   │   ├── auth.ts                    # 認證相關型別（含 User 和權限）
│   │   └── platform.ts                # 平台相關型別
│   ├── utils/                # 工具函式
│   │   └── dateUtils.ts               # 日期處理工具
│   ├── App.tsx               # 主佈局元件（側邊欄 + 路由）
│   ├── main.tsx              # 應用程式入口
│   ├── router.tsx            # 路由配置
│   ├── theme.ts              # Chakra UI 主題配置
│   └── index.css             # 全域樣式（Tailwind + 自訂）
├── .env.development          # 開發環境變數
├── .env.production           # 正式環境變數
├── .env.example              # 環境變數範本
├── CLAUDE.md                 # Claude Code 專案指引
├── LEARNING_PATH.md          # 學習路徑指南（46 個檔案）
├── eslint.config.js          # ESLint 配置
├── package.json              # 專案依賴和腳本
├── tsconfig.json             # TypeScript 主配置
├── tsconfig.app.json         # 應用程式 TS 配置
├── tsconfig.node.json        # Node.js 環境 TS 配置
└── vite.config.ts            # Vite 配置（含路徑別名）
```

## 目錄用途說明

### public/ 目錄

**用途**：存放不需要經過 Vite 編譯處理的靜態資源

**特性**：
- 檔案會**直接複製**到 `dist/` 根目錄，不經過任何處理
- 這些檔案的 URL 路徑與專案根路徑相同
- 適合放置不需要打包優化的資源

**適合放置的檔案**：
- `favicon.ico` - 網站圖示
- `robots.txt` - 搜尋引擎爬蟲規則
- `manifest.json` - PWA 應用程式清單
- `mockServiceWorker.js` - MSW Service Worker 腳本
- 其他靜態 HTML、XML 檔案
- 不會被 JavaScript 引用的圖片檔案

**引用方式**：
```html
<!-- 直接使用絕對路徑 -->
<img src="/favicon.ico" alt="Icon" />
<link rel="icon" href="/favicon.ico" />
```

**注意事項**：
- 放在 `public/` 的檔案**不會**被 Vite 打包優化（如壓縮、雜湊命名）
- 如果檔案會被 JS/CSS 引用，應該放在 `src/` 目錄並使用 import
- 大型圖片建議放在 `src/assets/` 以獲得自動優化

---

### dist/ 目錄

**用途**：存放打包後的生產環境檔案（不需提交到 Git）

**產生方式**：
```bash
npm run build
```

**目錄結構**：
```
dist/
├── index.html                # 打包後的 HTML（已注入打包後的 JS/CSS）
├── assets/                   # 打包後的資源檔案
│   ├── index-[hash].js       # 打包後的 JavaScript（含雜湊值）
│   ├── index-[hash].css      # 打包後的 CSS（含雜湊值）
│   ├── logo-[hash].png       # 圖片資源（含雜湊值）
│   └── ...                   # 其他資源
├── favicon.ico               # 從 public/ 複製的靜態檔案
└── mockServiceWorker.js      # 從 public/ 複製的 MSW worker
```

**特性**：
- 所有 JavaScript 和 CSS 都會被**壓縮最小化**（minified）
- 檔案名稱包含**雜湊值**（如 `index-a3b2c1d4.js`），用於快取控制（cache busting）
- 程式碼經過 **Tree Shaking** 移除未使用的程式碼
- 圖片等資源經過優化和壓縮
- 可直接部署到 Web 伺服器或 CDN

**部署流程**：
```bash
# 1. 打包專案（會自動執行 TypeScript 檢查）
npm run build

# 2. 本地預覽打包結果
npm run preview

# 3. 部署到伺服器
# 將整個 dist/ 目錄上傳到 Web 伺服器即可
# 例如：Nginx、Apache、Vercel、Netlify 等
```

**注意事項**：
- `dist/` 目錄已加入 `.gitignore`，不需要提交到版本控制
- 每次執行 `npm run build` 會清空並重新產生整個目錄
- 部署前務必測試 `npm run preview` 確保打包正確
- 生產環境需要設定正確的 `.env.production` 環境變數

---

### src/ 目錄

**用途**：存放所有原始碼，會經過 Vite 編譯和打包

**特性**：
- 所有檔案會被 Vite 處理（編譯、打包、優化）
- 支援 ES6+ 語法、TypeScript、JSX/TSX
- 支援模組化 import/export
- 圖片等資源會被優化並產生雜湊檔名
- 程式碼變更會觸發 HMR（Hot Module Replacement）

**引用資源方式**：
```tsx
// 引用圖片（會被 Vite 處理並優化）
import logo from "@/assets/logo.png";
<img src={logo} alt="Logo" />

// 引用樣式（會被打包和最小化）
import "@/index.css";

// 引用模組（支援路徑別名 @/）
import { authService } from "@/services/auth.service";
```

**路徑別名配置**：
專案配置了 `@/` 作為 `src/` 的別名（在 `vite.config.ts` 中）：

```typescript
// ✅ 推薦：使用別名
import { Button } from "@/components/Button";

// ❌ 不推薦：使用相對路徑
import { Button } from "../../../components/Button";
```

---

## UI 框架使用策略

本專案採用 **Chakra UI + Tailwind CSS 混合架構**，各自負責不同的 UI 需求：

### Chakra UI 使用場景
適合標準 UI 元件和複雜互動：
- **Modal、Dialog** - 彈窗和對話框
- **Button、Input、Form** - 表單元件
- **Menu、Popover、Toast** - 彈出式元件
- **複雜佈局** - 需要響應式 props 的場景

**優勢**：
- 提供完整的元件系統和主題
- 內建 `sx` prop 可以直接寫 CSS-in-JS
- 響應式 props（如 `display={{ base: "none", md: "block" }}`）

### Tailwind CSS 使用場景
適合自訂樣式和第三方元件：
- **自訂動畫** - Loading 動畫、過渡效果
- **第三方元件樣式** - react-data-grid、react-datepicker
- **工具類別** - 快速佈局調整
- **Arbitrary Variants** - 巢狀選擇器（如 `[&_.rdg-cell]:cursor-default`）

**優勢**：
- 輕量級，只打包使用到的 class
- 支援任意變體語法，可以樣式化第三方元件內部元素
- 更適合細粒度的樣式控制

### 混合使用範例

```tsx
// ✅ 推薦：Chakra 元件 + Tailwind 工具類別
<Box className="flex items-center gap-4">
  <Button variant="solid">提交</Button>
</Box>

// ✅ 推薦：Tailwind 樣式化第三方元件
<div className="[&_.rdg-cell]:cursor-default [&_.rdg-row:nth-child(even)]:bg-stripe">
  <DataGrid columns={columns} rows={rows} />
</div>

// ✅ 推薦：Chakra 的 sx prop 處理複雜樣式
<Table sx={{ "& td": { py: 4, borderBottom: "none" } }}>
  {/* ... */}
</Table>
```

### 設計原則
1. **優先使用 Chakra** - 對於標準 UI 元件
2. **使用 Tailwind** - 當需要自訂樣式或處理第三方元件時
3. **避免衝突** - Chakra 設定 `resetCSS={false}` 以保留 Tailwind 樣式
4. **語意化 Tokens** - 兩個框架共用相同的設計 tokens（顏色、間距等）

---

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

打包前會自動執行 TypeScript 型別檢查

### 5. 預覽打包結果

```bash
npm run preview
```

## 架構設計

### 狀態管理策略

本專案採用 **混合狀態管理** 策略：

#### Redux Toolkit（客戶端狀態）
- **使用者狀態** (`userSlice`)
  - 使用者基本資訊（id, username, name, email）
  - 使用者權限（canEdit, canViewLog）
  - 登入/登出時自動同步

**為什麼使用 Redux？**
- 使用者資訊需要在多個元件間共享
- 權限狀態需要即時反應（PermsWrapper）
- 登入狀態需要持久化

#### React Query（伺服器狀態）
- **平台列表資料** (`usePlatforms`)
- **平台更新操作** (`useUpdatePlatform`)
- **平台日誌資料** (`usePlatformLogs`)

**為什麼使用 React Query？**
- 自動快取和背景重新驗證
- 樂觀更新支援
- 載入/錯誤狀態自動管理
- 避免與 Redux 狀態重複

### 權限系統設計

```tsx
// 使用者權限定義在 User 型別中
interface User {
  id: number;
  username: string;
  permissions: {
    canEdit: boolean;      // 可以編輯平台設定
    canViewLog: boolean;   // 可以查看操作日誌
  };
}

// 使用 PermsWrapper 包裝需要權限的 UI
<PermsWrapper permission="canEdit">
  <Button>修改</Button>
</PermsWrapper>

// 支援巢狀檢查（需要同時擁有兩個權限）
<PermsWrapper permission="canEdit">
  <PermsWrapper permission="canViewLog">
    <Divider />
  </PermsWrapper>
</PermsWrapper>
```

### 資料流程圖

#### 登入流程

```
┌─────────────┐
│  LoginPage  │ 使用者輸入帳號密碼
└──────┬──────┘
       │ handleSubmit()
       ▼
┌─────────────┐
│  useLogin   │ React Query Mutation
│   Hook      │ mutate(credentials)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ authService │ 服務層
│   .login()  │ axios.post("/auth/login")
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
       │ onSuccess
       ▼
┌─────────────┐
│ 1. 儲存到   │ authService.setToken(token)
│ localStorage│ localStorage.setItem("user", user)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 2. 更新     │ dispatch(setUser(user))
│ Redux State │ ├─ user.user = { id, username, ... }
│             │ └─ user.user.permissions = { canEdit, canViewLog }
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 3. 導航     │ navigate(from || "/")
└─────────────┘
```

#### 權限檢查流程

```
┌─────────────┐
│PermsWrapper │ permission="canEdit"
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ useAppSelector │ state.user.user
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 檢查權限    │ user?.permissions[permission] ?? false
└──────┬──────┘
       │
       ├─ true ──▶ 渲染子元件
       │
       └─ false ─▶ 返回 null（不渲染）
```

## Mock Service Worker (MSW)

本專案使用 MSW 來模擬後端 API，讓前端開發不需要依賴真實的後端服務。

### 模擬的 API

#### 認證 API
- `POST /auth/login` - 使用者登入
  - 測試帳號：`admin` / `Admin123`
  - 返回 JWT Token 和使用者資訊（含權限）

#### 平台管理 API
- `GET /api/platforms` - 取得平台列表
- `PUT /api/platforms/:id` - 更新平台設定
- `GET /api/platforms/:id/logs` - 取得平台操作日誌

### 如何新增模擬 API

在 `src/mocks/handlers.ts` 中新增處理器：

```typescript
import { http, HttpResponse, delay } from "msw";

export const handlers = [
  // 新增你的 API
  http.get("/api/example", async () => {
    await delay(500); // 模擬網路延遲
    return HttpResponse.json({
      success: true,
      data: { message: "Hello World" },
    });
  }),
];
```

## 登入頁面功能

### 表單驗證

使用 Yup Schema 進行即時驗證（onBlur）：

- **帳號驗證**
  - 必填欄位
  - 長度 3-20 字元
  - 只允許英文、數字和底線

- **密碼驗證**
  - 必填欄位
  - 最少 8 字元
  - 至少 1 個大寫字母
  - 至少 1 個小寫字母
  - 至少 1 個數字

### UI 功能

- 密碼顯示/隱藏切換
- 載入狀態管理（登入中禁用表單）
- 錯誤訊息即時顯示
- 響應式設計（手機/平板/桌面）

## 提幣平台管理功能

### 平台列表
- 表格展示所有平台資訊
- 提幣功能狀態 Badge（啟用/停用）
- 操作按鈕（使用 `PlatformActionsCell` 元件模組化）
- 分頁和排序（TODO）

### 搜尋與篩選
- 依平台名稱篩選
- 依提幣功能狀態篩選
- 依更新時間篩選（使用 `react-datepicker` 的日期範圍選擇器）
- 即時篩選（使用 `useMemo`）
- 支援查詢、重置功能

### 編輯功能
- Modal 彈窗編輯介面
- 修改提幣功能狀態（啟用/停用）
- 修改備註資訊（必填欄位，最多 200 字）
- 表單控制項左對齊設計（Switch 和 Textarea 使用一致的 Flex 佈局）
- 樂觀更新 + 自動重新驗證

### 日誌查看
- 獨立 Modal 展示操作日誌
- 使用 `react-data-grid` 高效能表格元件
- 支援日期範圍篩選（使用 `react-datepicker`）
- 顯示操作時間、操作人、操作內容、異動前後值
- 多狀態渲染（使用 `renderTableBody()` 函式處理 Loading、Error、Empty、Data 狀態）
- 僅有 `canViewLog` 權限的使用者可見
- 使用 CSS 檔案樣式化 DataGrid（巢狀選擇器）

### 權限控制
- 「修改」按鈕：需要 `canEdit` 權限
- 「日誌」按鈕：需要 `canViewLog` 權限
- 按鈕之間的分隔線：需要同時擁有兩個權限

## 路由保護機制

### ProtectedRoute 元件

所有需要登入的頁面都經過 `ProtectedRoute` 保護：

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<App />}>
    <Route index element={<HomePage />} />
    <Route path="withdraw-platform" element={<WithdrawPlatformPage />} />
  </Route>
</Route>
```

### 保護邏輯

1. 使用者訪問受保護頁面
2. 檢查 `authService.isAuthenticated()` （驗證 Token 是否存在）
3. 未登入 → 導向 `/login`，並記錄原目標路徑
4. 已登入 → 渲染目標頁面
5. 登入成功後 → 自動導回原目標路徑

## 測試帳號

### 管理員帳號
```
帳號：admin
密碼：Admin123
權限：canEdit ✓, canViewLog ✓
```

## 開發指南

### 新增頁面

1. 在 `src/pages/` 建立頁面元件
2. 在 `src/router.tsx` 新增路由
3. 如需認證保護，將路由放在 `ProtectedRoute` 下
4. 在 `App.tsx` 的 sidebar 新增導航連結（可選）

### 新增 API 功能

1. **定義型別** (`src/types/`)
   ```typescript
   export interface ExampleRequest { ... }
   export interface ExampleResponse { ... }
   ```

2. **建立服務** (`src/services/`)
   ```typescript
   export const exampleService = {
     getData: () => axiosInstance.get<ExampleResponse>("/api/example"),
   };
   ```

3. **建立 Hook** (`src/hooks/`)
   ```typescript
   export const useExample = () => {
     return useQuery({
       queryKey: ["example"],
       queryFn: () => exampleService.getData(),
     });
   };
   ```

4. **新增 Mock** (`src/mocks/handlers.ts`)
   ```typescript
   http.get("/api/example", () => HttpResponse.json({ ... }))
   ```

### 新增權限檢查

```tsx
// 在 User 型別中新增權限欄位
interface User {
  permissions: {
    canEdit: boolean;
    canViewLog: boolean;
    canDelete: boolean;  // 新增
  };
}

// 在 PermsWrapper 中使用
<PermsWrapper permission="canDelete">
  <Button>刪除</Button>
</PermsWrapper>
```

### 新增表單驗證

在 `src/schemas/` 建立 Schema：

```typescript
import * as yup from "yup";

export const exampleSchema = yup.object({
  name: yup.string().required("名稱為必填").min(3),
  email: yup.string().required("信箱為必填").email("信箱格式錯誤"),
});
```

## 專案特色

### ✅ 完整的 TypeScript 型別系統
- 所有 API 請求/回應都有型別定義
- Redux state 有完整的型別推斷
- 元件 Props 強型別約束

### ✅ 現代化狀態管理
- Redux Toolkit 簡化 Redux 使用
- React Query 自動處理快取和重新驗證
- 混合策略避免狀態重複

### ✅ 細粒度權限控制
- 基於 Redux 的即時權限驗證
- 聲明式權限包裝元件
- 支援複雜的巢狀權限邏輯

### ✅ 統一的錯誤處理
- Axios 攔截器統一處理 401
- React Query 自動錯誤重試
- Toast 通知統一錯誤訊息

### ✅ 響應式設計
- Chakra UI 斷點系統
- 手機/平板/桌面適配
- 側邊欄抽屜模式（手機）

### ✅ 開發體驗優化
- 路徑別名 `@/` 簡化 import
- MSW 無需後端即可開發
- Hot Module Replacement (HMR)
- ESLint + Prettier 程式碼規範

### ✅ 詳細的程式碼註解
- 所有檔案都有繁體中文註解
- JSDoc 風格的函式說明
- 行內註解解釋複雜邏輯

## 學習資源

### 核心技術
- [React 官方文件](https://react.dev/)
- [TypeScript 官方文件](https://www.typescriptlang.org/)
- [Vite 官方文件](https://vitejs.dev/)

### 狀態管理
- [Redux Toolkit 官方文件](https://redux-toolkit.js.org/)
- [React Query 官方文件](https://tanstack.com/query/latest)

### UI 框架
- [Chakra UI 官方文件](https://chakra-ui.com/)
- [Tailwind CSS 官方文件](https://tailwindcss.com/)

### 其他工具
- [React Router 官方文件](https://reactrouter.com/)
- [MSW 官方文件](https://mswjs.io/)
- [Yup 官方文件](https://github.com/jquense/yup)
- [Day.js 官方文件](https://day.js.org/)

## 授權

MIT
