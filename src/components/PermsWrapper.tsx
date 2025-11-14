/**
 * PermsWrapper.tsx - 權限包裝元件
 * 根據使用者權限決定是否渲染子元件
 */

// React 相關匯入
import type { ReactNode } from "react";

// Redux 相關匯入
import { useAppSelector } from "@/store/hooks";

/**
 * 權限類型
 */
export type PermissionType = "canEdit" | "canViewLog";

/**
 * PermsWrapper Props 介面
 */
interface PermsWrapperProps {
  children: ReactNode; // 子元件
  permission: PermissionType; // 需要的權限
}

/**
 * 權限包裝元件
 * 從 Redux store 檢查使用者是否擁有指定權限
 * 如果沒有權限，返回 null（不渲染任何內容）
 * 如果有權限，渲染子元件
 *
 * @param props - PermsWrapperProps
 * @returns ReactNode | null - 有權限時返回子元件，無權限時返回 null
 *
 * @example
 * <PermsWrapper permission="canEdit">
 *   <Button>修改</Button>
 * </PermsWrapper>
 */
export default function PermsWrapper({
  children,
  permission,
}: PermsWrapperProps) {
  // 從 Redux store 讀取使用者資訊和權限
  const user = useAppSelector((state) => state.user.user);

  // 檢查使用者是否擁有指定權限（若使用者不存在則視為無權限）
  const hasPermission = user?.permissions[permission] ?? false;

  // 如果沒有權限，不渲染任何內容
  if (!hasPermission) {
    return null;
  }

  // 如果有權限，渲染子元件
  return <>{children}</>;
}
