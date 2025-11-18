/**
 * PlatformActionsCell.tsx - 平台列表操作按鈕儲存格元件
 */

// Chakra UI 元件匯入
import { Button, Divider, Flex } from "@chakra-ui/react";

// 權限控制元件匯入
import PermsWrapper from "@/components/PermsWrapper";

// 類型定義匯入
import type { Platform } from "@/types/platform";

/**
 * PlatformActionsCell Props 介面
 */
interface PlatformActionsCellProps {
  platform: Platform;
  onEdit: (platform: Platform) => void;
  onViewLog: (platform: Platform) => void;
}

/**
 * 平台列表操作按鈕儲存格元件
 * @param props - PlatformActionsCellProps
 * @returns JSX.Element - 操作按鈕 UI
 */
export default function PlatformActionsCell({
  platform,
  onEdit,
  onViewLog,
}: PlatformActionsCellProps) {
  return (
    <Flex gap={2} align="center">
      {/* 使用 PermsWrapper 控制修改按鈕的顯示 */}
      <PermsWrapper permission="canEdit">
        <Button
          size="sm"
          variant="link"
          fontWeight="normal"
          onClick={() => onEdit(platform)}
        >
          修改
        </Button>
      </PermsWrapper>

      {/* 使用 PermsWrapper 控制分隔線的顯示（兩個按鈕都有權限時才顯示） */}
      <PermsWrapper permission="canEdit">
        <PermsWrapper permission="canViewLog">
          <Divider orientation="vertical" h="16px" />
        </PermsWrapper>
      </PermsWrapper>

      {/* 使用 PermsWrapper 控制日誌按鈕的顯示 */}
      <PermsWrapper permission="canViewLog">
        <Button
          size="sm"
          variant="link"
          fontWeight="normal"
          onClick={() => onViewLog(platform)}
        >
          日誌
        </Button>
      </PermsWrapper>
    </Flex>
  );
}
