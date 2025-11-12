// src/theme.ts
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 1. 定義主題設定
const config: ThemeConfig = {
  initialColorMode: "light", // 初始顏色模式為淺色
  useSystemColorMode: false, // 不自動根據系統設定切換
};

// 2. 使用 extendTheme 來擴展預設主題，並傳入我們的設定
const theme = extendTheme({
  config,
  colors: {
    brand: {
      primary: "#FF5722",
      hover: "#E64A19",
      link: "#FF6E33",
    },
  },
});

export default theme;
