/**
 * PlatformSearchFilters.tsx - 平台搜尋篩選元件
 * 用於提供平台搜尋和篩選功能
 */

// React 核心匯入
import { useState } from "react";

// Chakra UI 元件匯入
import {
  Flex,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// 類型定義匯入
import type { Platform } from "@/types/platform";

/**
 * 搜尋篩選條件介面
 */
export interface SearchFilters {
  platformName: string;
  withdrawEnabled: string;
  updateTime: string;
}

/**
 * PlatformSearchFilters Props 介面
 */
interface PlatformSearchFiltersProps {
  platforms: Platform[]; // 所有平台資料（用於生成平台名稱選項）
  onSearch: (filters: SearchFilters) => void; // 搜尋回調
  onReset: () => void; // 重置回調
}

/**
 * 平台搜尋篩選元件
 * 提供平台名稱、提幣功能、更新時間的篩選功能
 *
 * @param props - PlatformSearchFiltersProps
 * @returns JSX.Element - 搜尋篩選 UI
 */
export default function PlatformSearchFilters({
  platforms,
  onSearch,
  onReset,
}: PlatformSearchFiltersProps) {
  // 搜尋條件狀態
  const [platformName, setPlatformName] = useState("all");
  const [withdrawEnabled, setWithdrawEnabled] = useState("all");
  const [updateTime, setUpdateTime] = useState("");

  // 處理搜尋
  const handleSearch = () => {
    onSearch({
      platformName,
      withdrawEnabled,
      updateTime,
    });
  };

  // 處理重置
  const handleReset = () => {
    setPlatformName("all");
    setWithdrawEnabled("all");
    setUpdateTime("");
    onReset();
  };

  return (
    <Flex gap={4} mb={6} align="flex-end">
      {/* 搜尋欄位 Grid */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} flex="1">
        {/* 平台名稱 */}
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="semibold">
              平台名稱
            </FormLabel>
            <Select
              borderColor="gray.200"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
            >
              <option value="all">全部</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.platformName}>
                  {platform.platformName}
                </option>
              ))}
            </Select>
          </FormControl>
        </GridItem>

        {/* 提幣功能 */}
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="semibold">
              提幣功能
            </FormLabel>
            <Select
              borderColor="gray.200"
              value={withdrawEnabled}
              onChange={(e) => setWithdrawEnabled(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="enabled">啟用</option>
              <option value="disabled">停用</option>
            </Select>
          </FormControl>
        </GridItem>

        {/* 更新時間 */}
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="semibold">
              更新時間
            </FormLabel>
            <Input
              borderColor="gray.200"
              bgColor="white"
              type="date"
              value={updateTime}
              onChange={(e) => setUpdateTime(e.target.value)}
              cursor="pointer"
              _hover={{ borderColor: "gray.300" }}
              sx={{
                "::-webkit-calendar-picker-indicator": {
                  filter: "invert(0.5)",
                  cursor: "pointer",
                },
              }}
            />
          </FormControl>
        </GridItem>

        {/* 預留空位 */}
        <GridItem>{/* 第四個位置預留供未來擴充 */}</GridItem>
      </Grid>

      {/* 按鈕群組 */}
      <Flex gap={2}>
        <Button
          variant="ghost"
          color="teal.600"
          isDisabled
          rightIcon={<ChevronDownIcon />}
        >
          展開
        </Button>
        <Button variant="ghost" color="teal.600" onClick={handleReset}>
          重置
        </Button>
        <Button
          variant="outline"
          color="teal.600"
          borderColor="teal.600"
          onClick={handleSearch}
          borderRadius="10px"
          _hover={{ bg: "teal.50" }}
        >
          查詢
        </Button>
      </Flex>
    </Flex>
  );
}
