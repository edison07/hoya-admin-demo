/**
 * permissionSlice.ts - Redux 權限狀態切片
 * 管理使用者權限狀態
 */

// Redux Toolkit 匯入
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * 使用者權限介面
 */
interface UserPermissions {
  canEdit: boolean; // 是否可以修改平台
  canViewLog: boolean; // 是否可以查看日誌
}

/**
 * 權限狀態介面
 */
interface PermissionState {
  permissions: UserPermissions;
}

/**
 * 初始權限狀態
 * 預設為無權限
 */
const initialState: PermissionState = {
  permissions: {
    canEdit: false,
    canViewLog: false,
  },
};

/**
 * 權限 Slice
 * 使用 Redux Toolkit 的 createSlice 建立
 */
const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    /**
     * 設定使用者權限
     * @param state - 當前狀態
     * @param action - 包含新權限的 action
     */
    setPermissions: (state, action: PayloadAction<UserPermissions>) => {
      state.permissions = action.payload;
    },

    /**
     * 重置權限為初始狀態
     * @param state - 當前狀態
     */
    resetPermissions: (state) => {
      state.permissions = initialState.permissions;
    },
  },
});

// 匯出 actions
export const { setPermissions, resetPermissions } = permissionSlice.actions;

// 匯出 reducer
export default permissionSlice.reducer;
