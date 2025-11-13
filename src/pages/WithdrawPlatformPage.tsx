/**
 * WithdrawPlatformPage.tsx - 提幣平台設置頁面
 * 用於管理提幣平台相關設定的頁面
 */

// React 核心匯入
import { useState, useMemo } from "react";

// Chakra UI 元件匯入
import { Box, useDisclosure, useToast } from "@chakra-ui/react";

// 類型定義匯入
import type { Platform } from "@/types/platform";

// React Query hooks 匯入
import {
  usePlatforms,
  useUpdatePlatform,
  usePlatformLogs,
} from "@/hooks/usePlatform";

// 自定義 hooks 匯入
import { useDebounce } from "@/hooks/useDebounce";

// 元件匯入
import EditPlatformModal from "@/components/WithdrawPlatform/EditPlatformModal";
import PlatformTable from "@/components/WithdrawPlatform/PlatformTable";
import PlatformSearchFilters, {
  type SearchFilters,
} from "@/components/WithdrawPlatform/PlatformSearchFilters";
import PlatformLogModal from "@/components/WithdrawPlatform/PlatformLogModal";
import { Loading } from "@/components/Loading";

/**
 * 提幣平台設置頁面元件
 * 顯示提幣平台管理介面的搜尋/篩選區域
 *
 * @returns JSX.Element - 提幣平台設置頁面 UI
 */
export default function WithdrawPlatformPage() {
  // Toast 通知
  const toast = useToast();

  // 編輯 Modal 控制
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  // 日誌 Modal 控制
  const {
    isOpen: isLogOpen,
    onOpen: onLogOpen,
    onClose: onLogClose,
  } = useDisclosure();
  const [logPlatform, setLogPlatform] = useState<Platform | null>(null);

  // 篩選條件狀態
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    platformName: "all",
    withdrawEnabled: "all",
    updateTime: "",
  });

  // 使用防抖處理篩選條件，避免頻繁觸發篩選計算（500ms 延遲）
  const debouncedSearchFilters = useDebounce(searchFilters, 500);

  // 使用 React Query 取得平台列表
  const { data: platforms = [], isLoading, error } = usePlatforms();

  // 使用 React Query 更新平台
  const updatePlatformMutation = useUpdatePlatform();

  // 使用 React Query 取得平台日誌（僅在 Modal 開啟時查詢）
  const {
    data: platformLogs = [],
    isLoading: isLogsLoading,
    error: logsError,
  } = usePlatformLogs(logPlatform?.id || 0, isLogOpen && !!logPlatform);

  // 使用 useMemo 進行客戶端篩選（使用防抖後的篩選條件）
  const filteredData = useMemo(() => {
    let result = platforms;

    // 根據平台名稱篩選
    if (debouncedSearchFilters.platformName !== "all") {
      result = result.filter(
        (item) => item.platformName === debouncedSearchFilters.platformName,
      );
    }

    // 根據提幣功能篩選
    if (debouncedSearchFilters.withdrawEnabled !== "all") {
      const isEnabled = debouncedSearchFilters.withdrawEnabled === "enabled";
      result = result.filter((item) => item.withdrawEnabled === isEnabled);
    }

    // 根據更新時間篩選
    if (debouncedSearchFilters.updateTime) {
      result = result.filter((item) =>
        item.updateTime.startsWith(debouncedSearchFilters.updateTime),
      );
    }

    return result;
  }, [platforms, debouncedSearchFilters]);

  // 處理搜尋
  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  // 處理重置
  const handleReset = () => {
    setSearchFilters({
      platformName: "all",
      withdrawEnabled: "all",
      updateTime: "",
    });
  };

  // 打開編輯 Modal
  const handleEdit = (platform: Platform) => {
    setEditingPlatform(platform);
    onOpen();
  };

  // 確定修改
  const handleConfirmEdit = async (data: {
    withdrawEnabled: boolean;
    remark: string;
  }) => {
    if (!editingPlatform) return;

    updatePlatformMutation.mutate(
      {
        id: editingPlatform.id,
        withdrawEnabled: data.withdrawEnabled,
        remark: data.remark,
      },
      {
        onSuccess: (response) => {
          toast({
            title: "更新成功",
            description: response.message || "平台設定已更新",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setEditingPlatform(null);
          onClose();
        },
        onError: (error: Error) => {
          toast({
            title: "更新失敗",
            description: error.message || "無法更新平台設定",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        },
      }
    );
  };

  // 取消修改
  const handleCancelEdit = () => {
    setEditingPlatform(null);
    onClose();
  };

  // 打開日誌 Modal
  const handleViewLog = (platform: Platform) => {
    setLogPlatform(platform);
    onLogOpen();
  };

  // 關閉日誌 Modal
  const handleCloseLog = () => {
    setLogPlatform(null);
    onLogClose();
  };

  // 錯誤處理
  if (error) {
    return (
      <Box p={6} textAlign="center" color="status.error">
        載入平台資料時發生錯誤：{error.message}
      </Box>
    );
  }

  // 載入中顯示
  if (isLoading) {
    return <Loading size="lg" fullScreen message="載入平台資料中..." />;
  }

  return (
    <Box>
      {/* 搜尋/篩選區域 */}
      <PlatformSearchFilters
        platforms={platforms}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 平台列表表格 */}
      <PlatformTable
        data={filteredData}
        onEdit={handleEdit}
        onViewLog={handleViewLog}
      />

      {/* 修改平台 Modal */}
      <EditPlatformModal
        isOpen={isOpen}
        platform={editingPlatform}
        onClose={handleCancelEdit}
        onConfirm={handleConfirmEdit}
        isLoading={updatePlatformMutation.isPending}
      />

      {/* 日誌 Modal */}
      <PlatformLogModal
        isOpen={isLogOpen}
        platform={logPlatform}
        logs={platformLogs}
        onClose={handleCloseLog}
        isLoading={isLogsLoading}
        error={logsError}
      />
    </Box>
  );
}
