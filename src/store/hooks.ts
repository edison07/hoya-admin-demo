/**
 * hooks.ts - Redux Hooks
 * 提供 TypeScript 類型安全的 Redux hooks
 */

// React Redux 匯入
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Store 類型匯入
import type { RootState, AppDispatch } from "./index";

/**
 * 使用 TypeScript 類型的 useDispatch hook
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * 使用 TypeScript 類型的 useSelector hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
