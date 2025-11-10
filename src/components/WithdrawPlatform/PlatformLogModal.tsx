/**
 * PlatformLogModal.tsx - 平台日誌 Modal 元件
 * 用於顯示平台操作日誌
 */

// React 核心匯入
import { useState, useMemo } from "react";

// Chakra UI 元件匯入
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";

// 自定義元件匯入
import DateRangePicker from "@/components/DateRangePicker";

// 類型定義匯入
import type { Platform, PlatformLog } from "@/types/platform";

/**
 * PlatformLogModal Props 介面
 */
interface PlatformLogModalProps {
  isOpen: boolean; // Modal 是否開啟
  platform: Platform | null; // 要查看日誌的平台資料
  logs: PlatformLog[]; // 日誌資料列表
  onClose: () => void; // 關閉 Modal 的回調
}

/**
 * 平台日誌 Modal 元件
 * 提供查看平台操作日誌的介面
 *
 * @param props - PlatformLogModalProps
 * @returns JSX.Element - 平台日誌 Modal UI
 */
export default function PlatformLogModal({
  isOpen,
  platform,
  logs,
  onClose,
}: PlatformLogModalProps) {
  // 日期區間篩選狀態
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 篩選後的日誌資料
  const filteredLogs = useMemo(() => {
    if (!platform) return [];

    // 先根據平台 ID 篩選
    let result = logs.filter((log) => log.platformId === platform.id);

    // 根據日期區間篩選
    if (startDate || endDate) {
      result = result.filter((log) => {
        const logDate = log.operateTime.split(" ")[0]; // 取得日期部分

        // 如果有開始日期，檢查是否大於等於開始日期
        if (startDate && logDate < startDate) {
          return false;
        }

        // 如果有結束日期，檢查是否小於等於結束日期
        if (endDate && logDate > endDate) {
          return false;
        }

        return true;
      });
    }

    // 按操作時間降序排序（最新的在上面）
    return result.sort((a, b) => b.operateTime.localeCompare(a.operateTime));
  }, [platform, logs, startDate, endDate]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay />
      <ModalContent maxW="1200px" maxH="80vh">
        <ModalHeader>日誌 {platform?.platformName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} overflowY="auto" maxH="calc(80vh - 80px)">
          {/* 日期區間選擇器 */}
          <Flex gap={4} mb={4} align="flex-end">
            <FormControl w="230px">
              <FormLabel fontSize="sm" fontWeight="semibold">
                操作時間
              </FormLabel>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => {
                  setStartDate(dates.startDate);
                  setEndDate(dates.endDate);
                }}
              />
            </FormControl>
          </Flex>

          {/* 日誌表格 */}
          <TableContainer>
            <Table
              variant="simple"
              size="sm"
              sx={{ "& td": { py: 4, px: 4 }, "& th": { py: 4, px: 4 } }}
            >
              <Thead>
                <Tr>
                  <Th>項目</Th>
                  <Th>異動前</Th>
                  <Th>異動後</Th>
                  <Th>操作用戶</Th>
                  <Th>操作時間</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredLogs.map((log, index) => {
                  // 分離日期和時間
                  const [date, time] = log.operateTime.split(" ");
                  return (
                    <Tr
                      key={log.id}
                      bg={index % 2 === 0 ? "blackAlpha.50" : "transparent"}
                    >
                      <Td>{log.item}</Td>
                      <Td color="gray.600" whiteSpace="pre-line">
                        {log.beforeValue}
                      </Td>
                      <Td color="gray.600" whiteSpace="pre-line">
                        {log.afterValue}
                      </Td>
                      <Td>{log.operator}</Td>
                      <Td color="gray.600">
                        <Box>{date}</Box>
                        <Box>{time}</Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            關閉
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
