/**
 * WithdrawPlatformPage.tsx - 提幣平台設置頁面
 * 用於管理提幣平台相關設定的頁面
 */

// React 核心匯入
import { useState, useEffect } from "react";

// Chakra UI 元件匯入
import { Box, useDisclosure } from "@chakra-ui/react";

// 類型定義匯入
import type { Platform } from "@/types/platform";

// 元件匯入
import EditPlatformModal from "@/components/WithdrawPlatform/EditPlatformModal";
import PlatformTable from "@/components/WithdrawPlatform/PlatformTable";
import PlatformSearchFilters, {
  type SearchFilters,
} from "@/components/WithdrawPlatform/PlatformSearchFilters";

// Mock 資料匯入
import { mockPlatforms } from "@/mocks/platformData";

// 工具函數匯入
import { formatDateTime } from "@/utils/dateUtils";

/**
 * 提幣平台設置頁面元件
 * 顯示提幣平台管理介面的搜尋/篩選區域
 *
 * @returns JSX.Element - 提幣平台設置頁面 UI
 */
export default function WithdrawPlatformPage() {
  // Modal 控制
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  // 平台資料（使用 useState 管理，以便更新）
  const [mockData, setMockData] = useState<Platform[]>(mockPlatforms);

  // 篩選後的資料
  const [filteredData, setFilteredData] = useState(mockData);

  // 同步初始資料
  useEffect(() => {
    setFilteredData(mockData);
  }, [mockData]);

  // 處理搜尋
  const handleSearch = (filters: SearchFilters) => {
    let result = mockData;

    // 根據平台名稱篩選
    if (filters.platformName !== "all") {
      result = result.filter(
        (item) => item.platformName === filters.platformName
      );
    }

    // 根據提幣功能篩選
    if (filters.withdrawEnabled !== "all") {
      const isEnabled = filters.withdrawEnabled === "enabled";
      result = result.filter((item) => item.withdrawEnabled === isEnabled);
    }

    // 根據更新時間篩選（如果有輸入日期）
    if (filters.updateTime) {
      result = result.filter((item) =>
        item.updateTime.startsWith(filters.updateTime)
      );
    }

    setFilteredData(result);
  };

  // 處理重置
  const handleReset = () => {
    setFilteredData(mockData);
  };

  // 打開編輯 Modal
  const handleEdit = (platform: Platform) => {
    setEditingPlatform(platform);
    onOpen();
  };

  // 確定修改
  const handleConfirmEdit = (data: {
    withdrawEnabled: boolean;
    remark: string;
  }) => {
    if (!editingPlatform) return;

    // 生成當前時間字串
    const updateTime = formatDateTime();

    // 更新 mockData
    const updatedMockData = mockData.map((platform) =>
      platform.id === editingPlatform.id
        ? {
            ...platform,
            withdrawEnabled: data.withdrawEnabled,
            remark: data.remark,
            updateTime: updateTime,
          }
        : platform,
    );
    setMockData(updatedMockData);

    // 同時更新 filteredData 以立即反映變更
    const updatedFilteredData = filteredData.map((platform) =>
      platform.id === editingPlatform.id
        ? {
            ...platform,
            withdrawEnabled: data.withdrawEnabled,
            remark: data.remark,
            updateTime: updateTime,
          }
        : platform,
    );
    setFilteredData(updatedFilteredData);

    // 重置 editingPlatform 並關閉 Modal
    setEditingPlatform(null);
    onClose();
  };

  // 取消修改
  const handleCancelEdit = () => {
    setEditingPlatform(null);
    onClose();
  };

  return (
    <Box>
      {/* 搜尋/篩選區域 */}
      <PlatformSearchFilters
        platforms={mockData}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 平台列表表格 */}
      <PlatformTable data={filteredData} onEdit={handleEdit} />

      {/* 修改平台 Modal */}
      <EditPlatformModal
        isOpen={isOpen}
        platform={editingPlatform}
        onClose={handleCancelEdit}
        onConfirm={handleConfirmEdit}
      />
    </Box>
  );
}
