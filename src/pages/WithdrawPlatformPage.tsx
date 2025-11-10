/**
 * WithdrawPlatformPage.tsx - 提幣平台設置頁面
 * 用於管理提幣平台相關設定的頁面
 */

// React 核心匯入
import { useState } from "react";

// Chakra UI 元件匯入
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
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
} from "@chakra-ui/react";

/**
 * 提幣平台設置頁面元件
 * 顯示提幣平台管理介面的搜尋/篩選區域
 *
 * @returns JSX.Element - 提幣平台設置頁面 UI
 */
export default function WithdrawPlatformPage() {
  // 搜尋條件狀態
  const [platformName, setPlatformName] = useState("all");
  const [withdrawEnabled, setWithdrawEnabled] = useState("all");
  const [updateTime, setUpdateTime] = useState("");

  // 模擬平台資料
  const mockData = [
    {
      id: 1,
      platformName: "Binance",
      withdrawEnabled: true,
      remark: "主要交易平台",
      updateTime: "2025-11-10 10:30:00",
    },
    {
      id: 2,
      platformName: "OKX",
      withdrawEnabled: true,
      remark: "備用平台",
      updateTime: "2025-11-09 15:20:00",
    },
    {
      id: 3,
      platformName: "Coinbase",
      withdrawEnabled: false,
      remark: "維護中",
      updateTime: "2025-11-08 09:15:00",
    },
    {
      id: 4,
      platformName: "Kraken",
      withdrawEnabled: true,
      remark: "歐美市場主要平台",
      updateTime: "2025-11-10 08:45:00",
    },
    {
      id: 5,
      platformName: "Bybit",
      withdrawEnabled: true,
      remark: "衍生品交易平台",
      updateTime: "2025-11-09 22:10:00",
    },
    {
      id: 6,
      platformName: "Huobi",
      withdrawEnabled: false,
      remark: "系統升級中",
      updateTime: "2025-11-07 14:30:00",
    },
    {
      id: 7,
      platformName: "Gate.io",
      withdrawEnabled: true,
      remark: "多幣種支援",
      updateTime: "2025-11-10 11:20:00",
    },
    {
      id: 8,
      platformName: "KuCoin",
      withdrawEnabled: true,
      remark: "小幣種交易平台",
      updateTime: "2025-11-09 18:50:00",
    },
    {
      id: 9,
      platformName: "Bitfinex",
      withdrawEnabled: true,
      remark: "專業交易者平台",
      updateTime: "2025-11-10 07:15:00",
    },
    {
      id: 10,
      platformName: "Gemini",
      withdrawEnabled: false,
      remark: "合規審核中",
      updateTime: "2025-11-06 16:40:00",
    },
    {
      id: 11,
      platformName: "Crypto.com",
      withdrawEnabled: true,
      remark: "信用卡支付平台",
      updateTime: "2025-11-10 09:30:00",
    },
    {
      id: 12,
      platformName: "Bittrex",
      withdrawEnabled: true,
      remark: "美國合規平台",
      updateTime: "2025-11-09 12:25:00",
    },
  ];

  // 篩選後的資料
  const [filteredData, setFilteredData] = useState(mockData);

  // 重置按鈕處理
  const handleReset = () => {
    setPlatformName("all");
    setWithdrawEnabled("all");
    setUpdateTime("");
    setFilteredData(mockData);
  };

  // 查詢按鈕處理
  const handleSearch = () => {
    let result = mockData;

    // 根據平台名稱篩選
    if (platformName !== "all") {
      result = result.filter((item) => item.platformName === platformName);
    }

    // 根據提幣功能篩選
    if (withdrawEnabled !== "all") {
      const isEnabled = withdrawEnabled === "enabled";
      result = result.filter((item) => item.withdrawEnabled === isEnabled);
    }

    // 根據更新時間篩選（如果有輸入日期）
    if (updateTime) {
      result = result.filter((item) =>
        item.updateTime.startsWith(updateTime)
      );
    }

    setFilteredData(result);
  };

  return (
    <Box>
      {/* 搜尋/篩選區域 */}
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
                {mockData.map((platform) => (
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
              <Input
                type="date"
                value={updateTime}
                onChange={(e) => setUpdateTime(e.target.value)}
              />
            </FormControl>
          </GridItem>

          {/* 預留空位 */}
          <GridItem>{/* 第四個位置預留供未來擴充 */}</GridItem>
        </Grid>

        {/* 按鈕群組 */}
        <Flex gap={2}>
          <Button variant="outline" colorScheme="gray">
            展開
          </Button>
          <Button variant="outline" colorScheme="gray" onClick={handleReset}>
            重置
          </Button>
          <Button colorScheme="blue" onClick={handleSearch}>
            查詢
          </Button>
        </Flex>
      </Flex>

      {/* 平台列表卡片 */}
      <Card>
        <CardBody p={0}>
          <TableContainer>
            <Table variant="simple">
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
                {filteredData.length > 0 ? (
                  filteredData.map((platform) => (
                    <Tr key={platform.id}>
                      <Td fontWeight="semibold">{platform.platformName}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            platform.withdrawEnabled ? "green" : "red"
                          }
                        >
                          {platform.withdrawEnabled ? "啟用" : "停用"}
                        </Badge>
                      </Td>
                      <Td color="gray.600">{platform.remark}</Td>
                      <Td color="gray.600">{platform.updateTime}</Td>
                      <Td>
                        <Flex gap={2} align="center">
                          <Button size="sm" variant="link" color="#FF6E33">
                            修改
                          </Button>
                          <Divider
                            orientation="vertical"
                            h="16px"
                            borderColor="gray.300"
                          />
                          <Button size="sm" variant="link" color="#FF6E33">
                            日誌
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
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
        </CardBody>
      </Card>
    </Box>
  );
}
