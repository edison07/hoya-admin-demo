/**
 * PlatformLogModal.tsx - 平台日誌 Modal 元件
 * 用於顯示平台操作日誌
 */

// React 核心匯入
import { useState, useMemo, useEffect } from "react";

// Chakra UI Icons 匯入
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";

// react-data-grid 匯入
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

// 自定義樣式匯入
import "./PlatformLogModal.css";

// 自定義元件匯入
import DateRangePicker from "@/components/DateRangePicker";

// 類型定義匯入
import type { Platform, PlatformLog } from "@/types/platform";
import type { Column } from "react-data-grid";

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
 * Loading Spinner 元件
 */
const Spinner = () => (
  <div className="border-primary inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-r-transparent" />
);

/**
 * DataGrid 欄位定義
 */
const columns: Column<PlatformLog>[] = [
  {
    key: "item",
    name: "項目",
    minWidth: 150,
    renderCell: ({ row }: { row: PlatformLog }) => (
      <div className="text-black">{row.item}</div>
    ),
  },
  {
    key: "beforeValue",
    name: "異動前",
    minWidth: 300,
    resizable: true,
    renderCell: ({ row }: { row: PlatformLog }) => (
      <div className="whitespace-pre-line text-black">{row.beforeValue}</div>
    ),
  },
  {
    key: "afterValue",
    name: "異動後",
    minWidth: 300,
    resizable: true,
    renderCell: ({ row }: { row: PlatformLog }) => {
      // 只顯示包含「備註」或「提幣功能」的行
      const filteredValue = row.afterValue
        .split("\n")
        .filter((line) => line.includes("備註") || line.includes("提幣功能"))
        .join("\n");
      return (
        <div className="whitespace-pre-line text-black">{filteredValue}</div>
      );
    },
  },
  {
    key: "operator",
    name: "操作用戶",
    width: 100,
  },
  {
    key: "operateTime",
    name: "操作時間",
    width: 100,
    renderCell: ({ row }: { row: PlatformLog }) => {
      const [date, time] = row.operateTime.split(" ");
      return (
        <div className="text-black">
          <div>{date}</div>
          <div>{time}</div>
        </div>
      );
    },
  },
];

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
  const [selectedStartDate, setSelectedStartDate] =
    useState(DEFAULT_START_DATE);
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

  // 處理 backdrop 點擊關閉
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 如果 Modal 未開啟，不渲染任何內容
  if (!isOpen) return null;

  return (
    // Modal Overlay - 固定定位的背景遮罩
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      {/* Modal Content - 主要內容區域 */}
      <div className="relative flex max-h-[80vh] w-full max-w-[1200px] flex-col rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-default text-xl font-semibold">
            日誌 {platform?.platformName}
          </h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
            aria-label="關閉"
          >
            <CloseIcon boxSize={4} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          {/* 日期區間選擇器與操作按鈕 */}
          <div className="mb-4 flex items-end justify-between gap-4">
            {/* 日期選擇器 */}
            <div className="w-[230px]">
              <label className="text-default mb-2 block text-sm">
                操作時間
              </label>
              <DateRangePicker
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                onChange={(dates) => {
                  setSelectedStartDate(dates.startDate);
                  setSelectedEndDate(dates.endDate);
                }}
              />
            </div>

            {/* 操作按鈕組 */}
            <div className="flex gap-2">
              {/* 展開按鈕（已停用） */}
              <button
                disabled
                className="text-secondary hover:bg-secondary-light flex items-center gap-1 rounded-md bg-transparent px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                展開
                <ChevronDownIcon />
              </button>

              {/* 重置按鈕 */}
              <button
                onClick={() => {
                  setSelectedStartDate(DEFAULT_START_DATE);
                  setSelectedEndDate(DEFAULT_END_DATE);
                  setStartDate(DEFAULT_START_DATE);
                  setEndDate(DEFAULT_END_DATE);
                }}
                className="text-secondary hover:bg-secondary-light rounded-md bg-transparent px-4 py-2 transition-colors"
              >
                重置
              </button>

              {/* 查詢按鈕 */}
              <button
                onClick={() => {
                  setStartDate(selectedStartDate);
                  setEndDate(selectedEndDate);
                }}
                className="text-secondary border-secondary hover:bg-secondary-light rounded-[10px] border-2 bg-white px-4 py-2 transition-colors"
              >
                查詢
              </button>
            </div>
          </div>

          {/* 日誌表格 - react-data-grid */}
          {isLoading ? (
            // 載入狀態
            <div className="flex items-center justify-center gap-2 py-8">
              <Spinner />
              <span className="text-secondary">載入日誌中...</span>
            </div>
          ) : error ? (
            // 錯誤狀態
            <div className="text-error py-8 text-center">
              載入日誌時發生錯誤：{error.message}
            </div>
          ) : filteredLogs.length > 0 ? (
            // 資料表格
            <div className="border-border datagrid-wrapper rounded-md border px-6 py-4 shadow-md">
              <DataGrid
                columns={columns}
                rows={filteredLogs}
                rowKeyGetter={(row) => row.id}
                rowHeight={60}
                style={{ height: "450px", width: "100%" }}
                className="rdg-light"
              />
            </div>
          ) : (
            // 無資料狀態
            <div className="text-tertiary py-8 text-center">查無紀錄</div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-border flex justify-end border-t px-6 py-4">
          <button
            onClick={onClose}
            className="bg-secondary hover:bg-secondary-dark rounded-md px-6 py-2 text-white transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
