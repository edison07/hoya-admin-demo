/**
 * platform.service.ts - 提幣平台服務層
 * 提供提幣平台管理相關的 API 呼叫功能
 */

// Axios 實例匯入
import { api } from "@/lib/axios";

// 類型定義匯入
import type {
  GetPlatformsResponse,
  UpdatePlatformRequest,
  UpdatePlatformResponse,
  GetPlatformLogsResponse,
} from "@/types/platform";

/**
 * 提幣平台服務物件
 * 包含所有與提幣平台管理相關的 API 方法
 */
export const platformService = {
  /**
   * 取得平台列表
   *
   * @returns Promise<GetPlatformsResponse> - 平台列表回應
   */
  getPlatforms: async (): Promise<GetPlatformsResponse> => {
    const response = await api.get<GetPlatformsResponse>("/platforms");
    return response.data;
  },

  /**
   * 更新平台設定
   * 更新指定平台的提幣功能狀態和備註
   *
   * @param data - 更新資料（平台 ID、提幣功能狀態、備註）
   * @returns Promise<UpdatePlatformResponse> - 更新後的平台資料
   */
  updatePlatform: async (
    data: UpdatePlatformRequest
  ): Promise<UpdatePlatformResponse> => {
    const response = await api.put<UpdatePlatformResponse>(
      `/platforms/${data.id}`,
      {
        withdrawEnabled: data.withdrawEnabled,
        remark: data.remark,
      }
    );
    return response.data;
  },

  /**
   * 取得平台操作日誌
   * 取得指定平台的所有操作記錄
   *
   * @param platformId - 平台 ID
   * @returns Promise<GetPlatformLogsResponse> - 平台日誌列表回應
   */
  getPlatformLogs: async (
    platformId: number
  ): Promise<GetPlatformLogsResponse> => {
    const response = await api.get<GetPlatformLogsResponse>(
      `/platforms/${platformId}/logs`
    );
    return response.data;
  },
};
