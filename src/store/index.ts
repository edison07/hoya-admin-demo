/**
 * store/index.ts - Redux Store 配置
 * 配置應用程式的全域狀態管理
 */

// Redux Toolkit 匯入
import { configureStore } from "@reduxjs/toolkit";

// Reducer 匯入
import permissionReducer from "./slices/permissionSlice";

/**
 * 配置 Redux Store
 */
export const store = configureStore({
  reducer: {
    permission: permissionReducer,
  },
});

/**
 * RootState 類型
 * 從 store 本身推斷出整個 state 的類型
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch 類型
 * 推斷 dispatch 的類型
 */
export type AppDispatch = typeof store.dispatch;
