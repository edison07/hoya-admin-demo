/**
 * handlers.ts - MSW API 處理器定義
 * 定義所有模擬 API 端點的處理邏輯和回應資料
 */

// MSW 核心工具匯入
import { http, HttpResponse, delay } from "msw";
// http: 定義 HTTP 請求處理器
// HttpResponse: 建立 HTTP 回應
// delay: 模擬網路延遲

// Mock 資料匯入
import { mockPlatforms } from "./platformData";
import { mockPlatformLogs } from "./platformLogData";

// 類型定義匯入
import type { Platform } from "@/types/platform";

// 工具函數匯入
import { formatDateTime } from "@/utils/dateUtils";

// 模擬資料庫：使用變數儲存平台資料（支援更新操作）
let platformsDb: Platform[] = [...mockPlatforms];

/**
 * API 處理器陣列
 * 包含所有需要模擬的 API 端點
 */
export const handlers = [
  /**
   * GET /api/user - 取得使用者資訊
   * 測試用端點，返回簡單的使用者物件
   */
  http.get("/api/user", () => {
    // 返回 JSON 回應
    return HttpResponse.json({ name: "Edison" });
  }),

  /**
   * POST /api/auth/login - 使用者登入
   * 驗證使用者名稱和密碼，返回認證 Token 和使用者資訊
   *
   * 測試帳號：
   * - 使用者名稱: admin
   * - 密碼: Admin123
   */
  http.post("/api/auth/login", async ({ request }) => {
    // 模擬網路延遲 800 毫秒，讓體驗更真實
    await delay(800);

    // 解析請求 body 為 JSON
    const body = (await request.json()) as {
      username: string; // 使用者名稱
      password: string; // 密碼
    };

    // 模擬驗證邏輯：檢查使用者名稱和密碼是否正確
    if (body.username === "admin" && body.password === "Admin123") {
      // 管理員帳號：完整權限
      return HttpResponse.json({
        success: true, // 成功標誌
        data: {
          token: "mock-jwt-token-" + Date.now(), // 模擬 JWT Token（帶時間戳確保唯一性）
          user: {
            id: 1, // 使用者 ID
            username: "admin", // 使用者名稱
            name: "管理員", // 顯示名稱
            email: "admin@example.com", // 電子郵件
            permissions: {
              canEdit: true, // 可以修改平台
              canViewLog: true, // 可以查看日誌
            },
          },
        },
        message: "登入成功", // 成功訊息
      });
    }

    // 一般使用者：僅查看日誌權限
    if (body.username === "user" && body.password === "User123") {
      return HttpResponse.json({
        success: true,
        data: {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: 2,
            username: "user",
            name: "一般使用者",
            email: "user@example.com",
            permissions: {
              canEdit: false, // 不可修改平台
              canViewLog: true, // 可以查看日誌
            },
          },
        },
        message: "登入成功",
      });
    }

    // 訪客帳號：無權限
    if (body.username === "guest" && body.password === "Guest123") {
      return HttpResponse.json({
        success: true,
        data: {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: 3,
            username: "guest",
            name: "訪客",
            email: "guest@example.com",
            permissions: {
              canEdit: false, // 不可修改平台
              canViewLog: false, // 不可查看日誌
            },
          },
        },
        message: "登入成功",
      });
    }

    // 登入失敗：返回錯誤訊息和 401 狀態碼
    return HttpResponse.json(
      {
        success: false, // 失敗標誌
        message: "帳號或密碼錯誤", // 錯誤訊息
      },
      { status: 401 }, // HTTP 401 Unauthorized
    );
  }),

  /**
   * GET /api/platforms - 取得平台列表
   */
  http.get("/api/platforms", async () => {
    await delay(500);
    return HttpResponse.json({
      success: true,
      data: platformsDb,
      message: "查詢成功",
    });
  }),

  /**
   * PUT /api/platforms/:id - 更新平台設定
   */
  http.put("/api/platforms/:id", async ({ params, request }) => {
    await delay(600);
    const { id } = params;
    const platformId = Number(id);
    const body = (await request.json()) as {
      withdrawEnabled: boolean;
      remark: string;
    };

    const platformIndex = platformsDb.findIndex((p) => p.id === platformId);

    if (platformIndex === -1) {
      return HttpResponse.json(
        { success: false, message: "平台不存在" },
        { status: 404 }
      );
    }

    const updatedPlatform: Platform = {
      ...platformsDb[platformIndex],
      withdrawEnabled: body.withdrawEnabled,
      remark: body.remark,
      updateTime: formatDateTime(),
    };

    platformsDb[platformIndex] = updatedPlatform;

    return HttpResponse.json({
      success: true,
      data: updatedPlatform,
      message: "更新成功",
    });
  }),

  /**
   * GET /api/platforms/:id/logs - 取得平台操作日誌
   */
  http.get("/api/platforms/:id/logs", async ({ params }) => {
    await delay(400);
    const { id } = params;
    const platformId = Number(id);

    const platform = platformsDb.find((p) => p.id === platformId);
    if (!platform) {
      return HttpResponse.json(
        { success: false, message: "平台不存在" },
        { status: 404 }
      );
    }

    const logs = mockPlatformLogs
      .filter((log) => log.platformId === platformId)
      .sort(
        (a: PlatformLog, b: PlatformLog) =>
          new Date(b.operateTime).getTime() - new Date(a.operateTime).getTime()
      );

    return HttpResponse.json({
      success: true,
      data: logs,
      message: "查詢成功",
    });
  }),
];
