/**
 * PlatformTable.tsx - 平台列表表格元件
 * 用於顯示提幣平台列表和操作按鈕
 */

// Chakra UI 元件匯入
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Divider,
  Card,
  CardBody,
  Button,
  Flex,
} from "@chakra-ui/react";

// 權限控制元件匯入
import PermsWrapper from "@/components/PermsWrapper";

// 類型定義匯入
import type { Platform } from "@/types/platform";

/**
 * PlatformTable Props 介面
 */
interface PlatformTableProps {
  data: Platform[]; // 要顯示的平台資料列表
  onEdit: (platform: Platform) => void; // 編輯按鈕的回調
  onViewLog?: (platform: Platform) => void; // 日誌按鈕的回調（可選）
}

/**
 * 平台列表表格元件
 * 顯示平台資料的表格，包含操作按鈕
 *
 * @param props - PlatformTableProps
 * @returns JSX.Element - 平台列表表格 UI
 */
export default function PlatformTable({
  data,
  onEdit,
  onViewLog,
}: PlatformTableProps) {
  return (
    <Card>
      <CardBody py={4} px={6}>
        <TableContainer>
          <Table
            variant="unstyled"
            sx={{
              "& td": { py: 4, px: 6, borderBottom: "none" },
              "& th": { py: 4, px: 6, borderBottom: "none" },
            }}
          >
            <Thead>
              <Tr>
                <Th>平台名稱</Th>
                <Th>提幣功能</Th>
                <Th>備註</Th>
                <Th>更新時間</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 ? (
                data.map((platform, index) => (
                  <Tr key={platform.id} bg={index % 2 === 1 ? "bg.stripe" : "transparent"}>
                    <Td color="text.primary" fontSize="sm">
                      {platform.platformName}
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={platform.withdrawEnabled ? "green" : "red"}
                      >
                        {platform.withdrawEnabled ? "啟用" : "停用"}
                      </Badge>
                    </Td>
                    <Td color="text.secondary" fontSize="sm">
                      {platform.remark}
                    </Td>
                    <Td color="text.secondary" fontSize="sm">
                      {platform.updateTime}
                    </Td>
                    <Td>
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
                            onClick={() => onViewLog?.(platform)}
                          >
                            日誌
                          </Button>
                        </PermsWrapper>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center" py={8} color="text.tertiary">
                    查無紀錄
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}
