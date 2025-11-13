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
      50: "#FFE8E0",
      100: "#FFCCB8",
      200: "#FFAB8A",
      300: "#FF8A5C",
      400: "#FF6E33",
      500: "#FF5722", // 主色
      600: "#E64A19",
      700: "#BF3D15",
      800: "#993110",
      900: "#73240C",
    },
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044",
    },
    primary: {
      light: "rgba(255, 87, 34, 0.7)", // primary 70% 透明度
    },
  },
  styles: {
    global: {
      body: {
        color: "black",
      },
    },
  },
  components: {
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.300",
          _checked: {
            bg: "teal.500",
          },
        },
      },
    },
  },
});

export default theme;
