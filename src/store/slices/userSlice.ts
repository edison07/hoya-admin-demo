/**
 * userSlice.ts - Redux 使用者狀態切片
 * 管理使用者資訊狀態
 */

// Redux Toolkit 匯入
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 類型定義匯入
import type { User } from "@/types/auth";

/**
 * 使用者狀態介面
 */
export interface UserState {
  user: User | null;
}

/**
 * 初始使用者狀態
 */
const initialState: UserState = {
  user: null,
};

/**
 * 使用者 Slice
 * 使用 Redux Toolkit 的 createSlice 建立
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * 設定使用者資訊
     * @param state - 當前狀態
     * @param action - 包含使用者資訊的 action
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    /**
     * 清除使用者資訊
     * @param state - 當前狀態
     */
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// 匯出 actions
export const { setUser, clearUser } = userSlice.actions;

// 匯出 reducer
export default userSlice.reducer;
