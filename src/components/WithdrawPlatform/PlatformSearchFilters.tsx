/**
 * PlatformSearchFilters.tsx - 平台搜尋篩選元件
 * 用於提供平台搜尋和篩選功能
 */

// React 核心匯入
import { useState, forwardRef } from "react";

// Chakra UI 元件匯入
import {
  Flex,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";

// react-datepicker 匯入
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 類型定義匯入
import type { Platform } from "@/types/platform";

/**
 * 搜尋篩選條件介面
 */
export interface SearchFilters {
  platformName: string;
  withdrawEnabled: string;
  updateTime: string; // 格式: YYYY-MM-DD
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
 * 自訂日期選擇按鈕元件
 * 用作 react-datepicker 的觸發按鈕
 */
interface CustomDateButtonProps {
  value?: string;
  onClick?: () => void;
}

const CustomDateButton = forwardRef<HTMLButtonElement, CustomDateButtonProps>(
  ({ value, onClick }, ref) => (
    <Button
      ref={ref}
      onClick={onClick}
      leftIcon={<CalendarIcon />}
      variant="outline"
      w="200px"
      justifyContent="flex-start"
      fontWeight="normal"
      color={value ? "text.primary" : "text.placeholder"}
      bgColor="white"
    >
      {value || "選擇日期"}
    </Button>
  ),
);

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
  const [updateTime, setUpdateTime] = useState<Date | null>(null);

  /**
   * 將 Date 物件轉換為 YYYY-MM-DD 格式字串
   * @param date - Date 物件
   * @returns YYYY-MM-DD 格式的日期字串
   */
  const formatDateToString = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 處理搜尋
  const handleSearch = () => {
    onSearch({
      platformName,
      withdrawEnabled,
      updateTime: formatDateToString(updateTime),
    });
  };

  // 處理重置
  const handleReset = () => {
    setPlatformName("all");
    setWithdrawEnabled("all");
    setUpdateTime(null);
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
            <DatePicker
              selected={updateTime}
              onChange={(date: Date | null) => setUpdateTime(date)}
              dateFormat="yyyy-MM-dd"
              customInput={
                <CustomDateButton value={formatDateToString(updateTime)} />
              }
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
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
          color="secondary.default"
          isDisabled
          rightIcon={<ChevronDownIcon />}
        >
          展開
        </Button>
        <Button variant="ghost" color="secondary.default" onClick={handleReset}>
          重置
        </Button>
        <Button
          variant="outline"
          color="secondary.default"
          borderColor="secondary.default"
          onClick={handleSearch}
          borderRadius="10px"
          _hover={{ bg: "secondary.light" }}
        >
          查詢
        </Button>
      </Flex>
    </Flex>
  );
}
