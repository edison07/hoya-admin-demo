/**
 * EditPlatformModal.tsx - 編輯平台 Modal 元件
 * 用於編輯提幣平台的設定（提幣功能開關、備註）
 */

// React 核心匯入
import { useState, useEffect } from "react";

// Chakra UI 元件匯入
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
  Textarea,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

// 類型定義匯入
import type { Platform } from "@/types/platform";

/**
 * EditPlatformModal Props 介面
 */
interface EditPlatformModalProps {
  isOpen: boolean; // Modal 是否開啟
  platform: Platform | null; // 要編輯的平台資料
  onClose: () => void; // 關閉 Modal 的回調
  onConfirm: (data: {
    withdrawEnabled: boolean;
    remark: string;
  }) => void; // 確定修改的回調
  isLoading?: boolean; // 是否正在載入（更新中）
}

/**
 * 編輯平台 Modal 元件
 * 提供編輯平台提幣功能和備註的介面
 *
 * @param props - EditPlatformModalProps
 * @returns JSX.Element - 編輯平台 Modal UI
 */
export default function EditPlatformModal({
  isOpen,
  platform,
  onClose,
  onConfirm,
  isLoading = false,
}: EditPlatformModalProps) {
  // 編輯表單狀態
  const [editWithdrawEnabled, setEditWithdrawEnabled] = useState(false);
  const [editRemark, setEditRemark] = useState("");

  // 備註驗證狀態
  const isRemarkInvalid = !editRemark || editRemark.trim().length === 0;

  // 當 platform 變更時，更新表單狀態
  useEffect(() => {
    if (platform) {
      setEditWithdrawEnabled(platform.withdrawEnabled);
      setEditRemark(platform.remark);
    }
  }, [platform]);

  // 處理確定按鈕
  const handleConfirm = () => {
    // 驗證備註是否為空
    if (isRemarkInvalid) {
      return;
    }

    // 呼叫父元件的確認回調
    onConfirm({
      withdrawEnabled: editWithdrawEnabled,
      remark: editRemark,
    });
  };

  // 處理取消按鈕
  const handleCancel = () => {
    // 重置表單狀態
    setEditWithdrawEnabled(false);
    setEditRemark("");
    // 呼叫父元件的關閉回調
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>修改 {platform?.platformName}</ModalHeader>
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
            isInvalid={isRemarkInvalid}
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
                  borderColor={isRemarkInvalid ? "red.500" : "inherit"}
                  _focus={{
                    borderColor: "teal.500",
                    boxShadow: "0 0 0 1px teal.500",
                    outline: "none",
                  }}
                  isDisabled={isLoading}
                />
                {isRemarkInvalid && (
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
            onClick={handleCancel}
            isDisabled={isLoading}
          >
            取消
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleConfirm}
            isLoading={isLoading}
            loadingText="更新中..."
          >
            確定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
