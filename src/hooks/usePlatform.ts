/**
 * usePlatform.ts - 提幣平台管理 React Query Hooks
 * 提供提幣平台資料查詢和更新的 hooks
 */

// React Query 核心匯入
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 服務層匯入
import { platformService } from "@/services/platform.service";

// 類型定義匯入
import type { UpdatePlatformRequest } from "@/types/platform";

// Query Keys 常數
export const platformKeys = {
  all: ["platforms"] as const,
  lists: () => [...platformKeys.all, "list"] as const,
  logs: (platformId: number) =>
    [...platformKeys.all, "logs", platformId] as const,
};

/**
 * 取得平台列表 Hook
 * 使用 React Query 查詢平台列表資料
 *
 * @returns 包含平台列表資料、載入狀態、錯誤訊息的物件
 */
export function usePlatforms() {
  return useQuery({
    queryKey: platformKeys.lists(),
    queryFn: () => platformService.getPlatforms(),
    select: (response) => response.data,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * 更新平台設定 Hook
 * 使用 React Query Mutation 更新平台資料
 *
 * @returns 包含 mutation 函數、載入狀態、錯誤訊息的物件
 */
export function useUpdatePlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePlatformRequest) =>
      platformService.updatePlatform(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: platformKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: platformKeys.logs(response.data.id),
      });
    },
  });
}

/**
 * 取得平台日誌 Hook
 * 使用 React Query 查詢特定平台的操作日誌
 *
 * @param platformId - 平台 ID
 * @param enabled - 是否啟用查詢（預設 true）
 * @returns 包含日誌列表資料、載入狀態、錯誤訊息的物件
 */
export function usePlatformLogs(platformId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: platformKeys.logs(platformId),
    queryFn: () => platformService.getPlatformLogs(platformId),
    select: (response) => response.data,
    enabled,
    staleTime: 3 * 60 * 1000,
  });
}
