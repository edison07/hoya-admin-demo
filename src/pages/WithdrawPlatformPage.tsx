/**
 * WithdrawPlatformPage.tsx - 提幣平台設置頁面
 * 用於管理提幣平台相關設定的頁面
 */

// React 核心匯入
import { useState, useEffect } from "react";

// Chakra UI 元件匯入
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

  // Modal 控制
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingPlatform, setEditingPlatform] = useState<any>(null);

  // 編輯表單狀態
  const [editWithdrawEnabled, setEditWithdrawEnabled] = useState(false);
  const [editRemark, setEditRemark] = useState("");

  // 模擬平台資料（使用 useState 管理，以便更新）
  const [mockData, setMockData] = useState([
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
  ]);

  // 篩選後的資料
  const [filteredData, setFilteredData] = useState(mockData);

  // 同步初始資料
  useEffect(() => {
    setFilteredData(mockData);
  }, [mockData]);

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
      result = result.filter((item) => item.updateTime.startsWith(updateTime));
    }

    setFilteredData(result);
  };

  // 打開編輯 Modal
  const handleEdit = (platform: any) => {
    setEditingPlatform(platform);
    setEditWithdrawEnabled(platform.withdrawEnabled);
    setEditRemark(platform.remark);
    onOpen();
  };

  // 確定修改
  const handleConfirmEdit = () => {
    if (!editingPlatform) return;

    // 驗證備註是否為空
    if (!editRemark || editRemark.trim().length === 0) {
      return;
    }

    // 生成當前時間字串 (格式: YYYY-MM-DD HH:mm:ss)
    const now = new Date();
    const updateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    // 更新 mockData
    const updatedMockData = mockData.map((platform) =>
      platform.id === editingPlatform.id
        ? {
            ...platform,
            withdrawEnabled: editWithdrawEnabled,
            remark: editRemark,
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
            withdrawEnabled: editWithdrawEnabled,
            remark: editRemark,
            updateTime: updateTime,
          }
        : platform,
    );
    setFilteredData(updatedFilteredData);

    // 關閉 Modal
    onClose();
  };

  // 取消修改
  const handleCancelEdit = () => {
    setEditingPlatform(null);
    setEditWithdrawEnabled(false);
    setEditRemark("");
    onClose();
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
          <Button
            variant="ghost"
            colorScheme="teal"
            isDisabled
            rightIcon={<ChevronDownIcon />}
          >
            展開
          </Button>
          <Button variant="ghost" colorScheme="teal" onClick={handleReset}>
            重置
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            onClick={handleSearch}
            borderRadius="10px"
          >
            查詢
          </Button>
        </Flex>
      </Flex>

      {/* 平台列表卡片 */}
      <Card>
        <CardBody py={4} px={6}>
          <TableContainer>
            <Table
              variant="simple"
              sx={{ "& td": { py: 4, px: 6 }, "& th": { py: 4, px: 6 } }}
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
                {filteredData.length > 0 ? (
                  filteredData.map((platform, index) => (
                    <Tr
                      key={platform.id}
                      bg={index % 2 === 0 ? "blackAlpha.100" : "transparent"}
                    >
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
                          <Button
                            size="sm"
                            variant="link"
                            color="#FF6E33"
                            onClick={() => handleEdit(platform)}
                          >
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

      {/* 修改平台 Modal */}
      <Modal isOpen={isOpen} onClose={handleCancelEdit} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改 {editingPlatform?.platformName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* 提幣功能開關 */}
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="withdraw-switch" mb={0}>
                提幣功能
              </FormLabel>
              <Switch
                id="withdraw-switch"
                isChecked={editWithdrawEnabled}
                onChange={(e) => setEditWithdrawEnabled(e.target.checked)}
              />
            </FormControl>

            {/* 備註輸入框 */}
            <FormControl
              isRequired
              isInvalid={!editRemark || editRemark.trim().length === 0}
            >
              <Flex align="flex-start" gap={4}>
                <FormLabel mt={2} minW="60px">
                  備註
                </FormLabel>
                <Box flex="1">
                  <Textarea
                    value={editRemark}
                    onChange={(e) => {
                      setEditRemark(e.target.value);
                    }}
                    placeholder="請輸入備註（1-200字）"
                    maxLength={200}
                    rows={4}
                    borderColor={
                      !editRemark || editRemark.trim().length === 0
                        ? "red.500"
                        : "inherit"
                    }
                    _focus={{
                      borderColor: "teal.500",
                      boxShadow: "0 0 0 1px teal.500",
                      outline: "none",
                    }}
                  />
                  {(!editRemark || editRemark.trim().length === 0) && (
                    <FormErrorMessage>此為必填項</FormErrorMessage>
                  )}
                </Box>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="teal"
              mr={3}
              onClick={handleCancelEdit}
            >
              取消
            </Button>
            <Button colorScheme="teal" onClick={handleConfirmEdit}>
              確定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
