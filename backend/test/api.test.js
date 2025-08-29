import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "./app.js";

let originalKey;

beforeAll(() => {
  originalKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "fake-test-key";
});

afterAll(() => {
  process.env.OPENAI_API_KEY = originalKey;
});

describe("API", () => {
  it("GET /api/health → 200", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("POST /api/generate-quiz with missing topic → 400", async () => {
    const res = await request(app)
      .post("/api/generate-quiz")
      .set("Content-Type", "application/json")
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("POST /api/generate-quiz with topic → 200 & valid shape (mock)", async () => {
    const res = await request(app)
      .post("/api/generate-quiz")
      .set("Content-Type", "application/json")
      .send({ topic: "whales", useRetrieval: false });

    expect(res.status).toBe(200);
    expect(res.body.topic).toBe("whales");
    expect(Array.isArray(res.body.questions)).toBe(true);
    expect(res.body.questions).toHaveLength(5);
    for (const q of res.body.questions) {
      expect(typeof q.prompt).toBe("string");
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
      expect([0, 1, 2, 3]).toContain(q.correctIndex);
      expect(typeof q.explanation).toBe("string");
    }
  });
});
