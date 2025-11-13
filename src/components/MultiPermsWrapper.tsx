/**
 * MultiPermsWrapper.tsx - 多權限包裝元件
 * 支援檢查多個權限，可設定為「全部滿足」或「任一滿足」模式
 */

// React 核心匯入
import { ReactNode } from "react";

// Redux 相關匯入
import { useAppSelector } from "@/store/hooks";

// 類型定義匯入
import type { PermissionType } from "@/types/permission";

/**
 * MultiPermsWrapper Props 介面
 */
interface MultiPermsWrapperProps {
  children: ReactNode; // 子元件內容
  permissions: PermissionType[]; // 需要檢查的權限陣列
  mode?: "all" | "any"; // 檢查模式：'all' = 需要所有權限, 'any' = 需要任意權限
}

/**
 * 多權限包裝元件
 * 根據使用者權限決定是否顯示子元件
 *
 * 使用範例：
 * ```tsx
 * <MultiPermsWrapper permissions={["canEdit", "canViewLog"]} mode="all">
 *   <Button>編輯並查看日誌</Button>
 * </MultiPermsWrapper>
 * ```
 *
 * @param props - MultiPermsWrapperProps
 * @returns JSX.Element | null - 根據權限返回子元件或 null
 */
export default function MultiPermsWrapper({
  children,
  permissions,
  mode = "all",
}: MultiPermsWrapperProps) {
  // 從 Redux store 讀取使用者權限
  const userPermissions = useAppSelector((state) => state.permission.permissions);

  // 根據模式檢查權限
  const hasPermission =
    mode === "all"
      ? permissions.every((perm) => userPermissions[perm]) // 所有權限都需要
      : permissions.some((perm) => userPermissions[perm]); // 任一權限即可

  // 如果沒有權限，不渲染任何內容
  if (!hasPermission) return null;

  // 有權限則渲染子元件
  return <>{children}</>;
}
