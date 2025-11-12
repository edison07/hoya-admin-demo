/**
 * PlatformLogModal.tsx - 平台日誌 Modal 元件
 * 用於顯示平台操作日誌
 */

// React 核心匯入
import { useState, useMemo, useEffect } from "react";

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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
  isLoading?: boolean; // 是否正在載入日誌
  error?: Error | null; // 載入日誌時的錯誤
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
  isLoading = false,
  error = null,
}: PlatformLogModalProps) {
  // 預設日期範圍
  const DEFAULT_START_DATE = "2022-10-14";
  const DEFAULT_END_DATE = new Date().toISOString().split("T")[0]; // 今天的日期 (YYYY-MM-DD)

  // 選擇的日期（尚未查詢）
  const [selectedStartDate, setSelectedStartDate] = useState(DEFAULT_START_DATE);
  const [selectedEndDate, setSelectedEndDate] = useState(DEFAULT_END_DATE);

  // 實際用於篩選的日期（點擊查詢後）
  const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

  // 當 Modal 打開時，重置為預設日期
  useEffect(() => {
    if (isOpen) {
      setSelectedStartDate(DEFAULT_START_DATE);
      setSelectedEndDate(DEFAULT_END_DATE);
      setStartDate(DEFAULT_START_DATE);
      setEndDate(DEFAULT_END_DATE);
    }
  }, [isOpen, DEFAULT_START_DATE, DEFAULT_END_DATE]);

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
          {/* 日期區間選擇器與操作按鈕 */}
          <Flex gap={4} mb={4} align="flex-end" justify="space-between">
            <FormControl w="230px">
              <FormLabel fontSize="sm" fontWeight="semibold">
                操作時間
              </FormLabel>
              <DateRangePicker
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                onChange={(dates) => {
                  setSelectedStartDate(dates.startDate);
                  setSelectedEndDate(dates.endDate);
                }}
              />
            </FormControl>
            <Flex gap={2}>
              <Button
                variant="ghost"
                colorScheme="teal"
                isDisabled
                rightIcon={<ChevronDownIcon />}
              >
                展開
              </Button>
              <Button
                variant="ghost"
                colorScheme="teal"
                onClick={() => {
                  setSelectedStartDate(DEFAULT_START_DATE);
                  setSelectedEndDate(DEFAULT_END_DATE);
                  setStartDate(DEFAULT_START_DATE);
                  setEndDate(DEFAULT_END_DATE);
                }}
              >
                重置
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                borderRadius="10px"
                onClick={() => {
                  setStartDate(selectedStartDate);
                  setEndDate(selectedEndDate);
                }}
              >
                查詢
              </Button>
            </Flex>
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
                {isLoading ? (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={8}>
                      <Flex justify="center" align="center" gap={2}>
                        <Spinner size="sm" color="teal.500" />
                        <Text color="gray.600">載入日誌中...</Text>
                      </Flex>
                    </Td>
                  </Tr>
                ) : error ? (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={8} color="red.500">
                      載入日誌時發生錯誤：{error.message}
                    </Td>
                  </Tr>
                ) : filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => {
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
                  })
                ) : (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={8} color="gray.500">
                      查無紀錄
                    </Td>
                  </Tr>
                )}
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
