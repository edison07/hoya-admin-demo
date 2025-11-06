import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({ name: "Edison" });
  }),

  // 登入 API
  http.post("/api/auth/login", async ({ request }) => {
    await delay(800); // 模擬網路延遲

    const body = (await request.json()) as {
      username: string;
      password: string;
    };

    // 模擬驗證邏輯
    if (body.username === "admin" && body.password === "Admin123") {
      return HttpResponse.json({
        success: true,
        data: {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: 1,
            username: "admin",
            name: "管理員",
            email: "admin@example.com",
          },
        },
        message: "登入成功",
      });
    }

    // 登入失敗
    return HttpResponse.json(
      {
        success: false,
        message: "帳號或密碼錯誤",
      },
      { status: 401 },
    );
  }),
];
