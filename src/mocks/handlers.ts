import { http, HttpResponse } from "msw";
import type { DefaultBodyType } from "msw";

export const handlers = [
  http.get("/api/health", () => HttpResponse.json({ ok: true })),

  http.post("/api/login", async ({ request }) => {
    const body = (await request
      .json()
      .catch(() => null)) as DefaultBodyType | null;

    if (!body || typeof body !== "object") {
      return HttpResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { username } = body as { username?: string };

    if (username === "admin") {
      return HttpResponse.json({ token: "12345" });
    }

    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),
];
