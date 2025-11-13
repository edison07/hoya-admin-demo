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
    // Brand 主色系（橘紅色系）
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
    // Teal 輔助色系（青綠色系）
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
    // 中性色系（保留 Chakra 預設，但明確定義常用的）
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
    // 狀態色系
    success: {
      50: "#F0FFF4",
      100: "#C6F6D5",
      500: "#48BB78",
      600: "#38A169",
    },
    error: {
      50: "#FFF5F5",
      100: "#FED7D7",
      500: "#F56565",
      600: "#E53E3E",
    },
    warning: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      500: "#ED8936",
      600: "#DD6B20",
    },
    info: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      500: "#4299E1",
      600: "#3182CE",
    },
  },
  // 語意化 Token - 定義用途明確的顏色別名
  semanticTokens: {
    colors: {
      // === 主要顏色 ===
      "primary.default": "brand.500",
      "primary.hover": "brand.600",
      "primary.active": "brand.700",
      "primary.light": "rgba(255, 87, 34, 0.7)", // primary 70% 透明度，用於選中狀態
      "primary.foreground": "white", // 主色前景色（白色文字）

      // === 次要顏色（Teal） ===
      "secondary.default": "teal.500",
      "secondary.hover": "teal.600",
      "secondary.active": "teal.700",
      "secondary.light": "teal.50",
      "secondary.foreground": "white",

      // === 連結顏色 ===
      "link.default": "brand.600",
      "link.hover": "brand.700",
      "link.active": "brand.800",

      // === 文字顏色 ===
      "text.primary": "black",
      "text.secondary": "gray.600",
      "text.tertiary": "gray.500",
      "text.placeholder": "gray.400",
      "text.disabled": "gray.400",
      "text.inverse": "white", // 深色背景上的文字

      // === 背景顏色 ===
      "bg.canvas": "#F7FAFC", // 主畫布背景（淺灰）
      "bg.surface": "white", // 卡片/表面背景
      "bg.overlay": "transparent", // 遮罩背景
      "bg.hover": "gray.100", // hover 背景
      "bg.selected": "primary.light", // 選中狀態背景
      "bg.disabled": "gray.100", // 禁用狀態背景
      "bg.stripe": "gray.100", // 斑馬紋背景（表格奇偶列）

      // === 邊框顏色 ===
      "border.default": "gray.200",
      "border.hover": "gray.300",
      "border.focus": "blue.500",
      "border.error": "red.600",
      "border.divider": "gray.300",

      // === 狀態顏色 ===
      "status.success": "success.500",
      "status.error": "error.500",
      "status.warning": "warning.500",
      "status.info": "info.500",

      // === 表單狀態顏色 ===
      "form.border.default": "gray.300",
      "form.border.hover": "gray.300",
      "form.border.focus": "info.600",
      "form.border.error": "red.600",
      "form.text.error": "red.600",
      "form.bg.disabled": "gray.100",
    },
  },
  // 全局樣式
  styles: {
    global: {
      body: {
        color: "text.primary", // 使用語意化 token
        bg: "bg.canvas",
      },
      // 為 Chakra 元件定義全局樣式變數
      ":root": {
        "--chakra-colors-primary-light": "rgba(255, 87, 34, 0.7)",
      },
    },
  },
  // 元件層級的樣式客製化
  components: {
    // Switch 開關元件
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.300",
          _checked: {
            bg: "secondary.default", // 使用語意化 token
          },
        },
      },
    },
    // Button 按鈕元件
    Button: {
      variants: {
        // 主要按鈕樣式
        solid: {
          bg: "primary.default",
          color: "primary.foreground",
          _hover: {
            bg: "primary.hover",
            _disabled: {
              bg: "primary.default",
            },
          },
          _active: {
            bg: "primary.active",
          },
          _disabled: {
            opacity: 0.7,
            cursor: "not-allowed",
          },
        },
        // 次要按鈕樣式（teal）
        solidSecondary: {
          bg: "secondary.default",
          color: "secondary.foreground",
          _hover: {
            bg: "secondary.hover",
            _disabled: {
              bg: "secondary.default",
            },
          },
          _active: {
            bg: "secondary.active",
          },
          _disabled: {
            opacity: 0.3,
            cursor: "not-allowed",
          },
        },
        // 外框按鈕樣式
        outline: {
          borderColor: "border.default",
          color: "text.primary",
          _hover: {
            bg: "bg.hover",
          },
        },
        // 幽靈按鈕樣式
        ghost: {
          color: "text.primary",
          _hover: {
            bg: "bg.hover",
          },
        },
        // 連結按鈕樣式
        link: {
          color: "link.default",
          _hover: {
            color: "link.hover",
            textDecoration: "none",
          },
          _active: {
            color: "link.active",
          },
        },
      },
    },
    // Input 輸入框元件
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "form.border.default",
            bg: "bg.surface",
            _hover: {
              borderColor: "form.border.hover",
            },
            _focus: {
              borderColor: "form.border.focus",
              boxShadow: "none",
            },
            _invalid: {
              borderColor: "form.border.error",
            },
            _disabled: {
              bg: "form.bg.disabled",
              cursor: "not-allowed",
            },
          },
        },
      },
    },
    // Textarea 文字區域元件
    Textarea: {
      variants: {
        outline: {
          borderColor: "form.border.default",
          bg: "bg.surface",
          _hover: {
            borderColor: "form.border.hover",
          },
          _focus: {
            borderColor: "form.border.focus",
            boxShadow: "none",
          },
          _invalid: {
            borderColor: "form.border.error",
          },
          _disabled: {
            bg: "form.bg.disabled",
            cursor: "not-allowed",
          },
        },
      },
    },
    // Select 選擇框元件
    Select: {
      variants: {
        outline: {
          field: {
            borderColor: "form.border.default",
            bg: "bg.surface",
            _hover: {
              borderColor: "form.border.hover",
            },
            _focus: {
              borderColor: "form.border.focus",
              boxShadow: "none",
            },
          },
        },
      },
    },
    // Card 卡片元件
    Card: {
      baseStyle: {
        container: {
          bg: "bg.surface",
        },
      },
    },
    // Modal 對話框元件
    Modal: {
      baseStyle: {
        dialog: {
          bg: "bg.surface",
        },
      },
    },
    // Menu 選單元件
    Menu: {
      baseStyle: {
        list: {
          bg: "bg.surface",
        },
        item: {
          bg: "bg.surface",
          color: "text.primary",
          _hover: {
            bg: "bg.hover",
          },
        },
      },
    },
    // Table 表格元件
    Table: {
      variants: {
        unstyled: {
          th: {
            color: "text.tertiary",
          },
          td: {
            color: "text.primary",
          },
        },
      },
    },
    // Divider 分隔線元件
    Divider: {
      baseStyle: {
        borderColor: "border.divider",
      },
    },
    // FormLabel 表單標籤元件
    FormLabel: {
      baseStyle: {
        color: "text.primary",
        fontWeight: "semibold",
      },
    },
    // FormErrorMessage 表單錯誤訊息元件
    FormError: {
      baseStyle: {
        text: {
          color: "form.text.error",
        },
      },
    },
    // Badge 徽章元件
    Badge: {
      variants: {
        solid: {
          // 綠色徽章（啟用）
          green: {
            bg: "success.500",
            color: "white",
          },
          // 紅色徽章（停用）
          red: {
            bg: "error.500",
            color: "white",
          },
        },
      },
    },
  },
});

export default theme;
