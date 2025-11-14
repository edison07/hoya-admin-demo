# 專案學習路徑

## 📚 建議的學習順序

### 第一階段：基礎設定與入口（8個檔案）
1. `package.json` - 專案配置與依賴
2. `tsconfig.json` - TypeScript 主配置
3. `tsconfig.app.json` - 應用程式 TypeScript 配置
4. `tsconfig.node.json` - Node.js 環境 TypeScript 配置
5. `vite.config.ts` - Vite 建置工具配置
6. `index.html` - HTML 入口
7. `README.md` - 專案說明文件
8. `src/main.tsx` - React 應用程式入口

### 第二階段：全域配置（4個檔案）
9. `src/index.css` - 全域樣式與 Tailwind 設定
10. `src/theme.ts` - Chakra UI 主題配置
11. `src/lib/axios.ts` - API 請求配置
12. `src/router.tsx` - 路由配置

### 第三階段：類型定義（2個檔案）
13. `src/types/auth.ts` - 認證相關類型（包含使用者權限）
14. `src/types/platform.ts` - 平台相關類型

### 第四階段：狀態管理（Redux）（3個檔案）
15. `src/store/index.ts` - Redux Store 設定
16. `src/store/hooks.ts` - Redux Hooks
17. `src/store/slices/userSlice.ts` - 使用者狀態（包含權限）

### 第五階段：服務層（2個檔案）
18. `src/services/auth.service.ts` - 認證服務
19. `src/services/platform.service.ts` - 平台服務

### 第六階段：自定義 Hooks（2個檔案）
20. `src/hooks/useLogin.ts` - 登入 Hook
21. `src/hooks/usePlatform.ts` - 平台資料 Hook

### 第七階段：工具函式與驗證（2個檔案）
22. `src/utils/dateUtils.ts` - 日期工具（Day.js）
23. `src/schemas/auth.schema.ts` - 登入表單驗證 Schema

### 第八階段：基礎元件（7個檔案）
24. `src/components/Loading.tsx` - 載入元件
25. `src/components/ErrorBoundary.tsx` - 錯誤邊界
26. `src/components/FormInput.tsx` - 表單輸入元件
27. `src/components/DateRangePicker.tsx` - 日期選擇器
28. `src/components/PermsWrapper.tsx` - 權限包裝元件
29. `src/components/MultiPermsWrapper.tsx` - 多權限包裝元件
30. `src/components/ProtectedRoute.tsx` - 受保護路由

### 第九階段：頁面元件（3個檔案）
31. `src/pages/HomePage.tsx` - 首頁
32. `src/pages/LoginPage.tsx` - 登入頁面
33. `src/pages/WithdrawPlatformPage.tsx` - 提幣平台頁面

### 第十階段：業務元件（5個檔案）
34. `src/components/WithdrawPlatform/PlatformSearchFilters.tsx` - 搜尋篩選
35. `src/components/WithdrawPlatform/PlatformTable.tsx` - 平台表格
36. `src/components/WithdrawPlatform/PlatformActionsCell.tsx` - 操作按鈕
37. `src/components/WithdrawPlatform/EditPlatformModal.tsx` - 編輯 Modal
38. `src/components/WithdrawPlatform/PlatformLogModal.tsx` - 日誌 Modal

### 第十一階段：主要佈局（1個檔案）
39. `src/App.tsx` - 主應用程式佈局

### 第十二階段：Mock 資料（4個檔案）
40. `src/mocks/browser.ts` - MSW 設定
41. `src/mocks/handlers.ts` - API Mock 處理器
42. `src/mocks/platformData.ts` - 平台 Mock 資料
43. `src/mocks/platformLogData.ts` - 日誌 Mock 資料

### 第十三階段：其他配置檔案（選讀）
44. `CLAUDE.md` - Claude Code 專案指引
45. `OPTIMIZATION_SUMMARY.md` - 優化總結報告
46. `.claude/settings.local.json` - Claude 本地設定

---

## 🎯 學習目標

每個檔案學習時，注意以下重點：
1. **檔案用途** - 為什麼需要這個檔案
2. **匯入關係** - 依賴了哪些其他檔案
3. **核心邏輯** - 主要功能是什麼
4. **設計模式** - 使用了什麼設計模式
5. **最佳實踐** - 有什麼值得學習的地方

---

準備好了嗎？我們從第一個檔案開始！
