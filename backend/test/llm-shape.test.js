import { describe, it, expect, beforeAll, afterAll } from "vitest"

let originalKey

beforeAll(async () => {
  originalKey = process.env.OPENAI_API_KEY
  process.env.OPENAI_API_KEY = "fake-test-key"
})

afterAll(() => {
  process.env.OPENAI_API_KEY = originalKey
})

describe("generateQuiz (mock mode)", async () => {
  const { generateQuiz } = await import("../lib/llm.js")

  it("returns 5 questions with 4 options each", async () => {
    const { questions } = await generateQuiz({ topic: "Photosynthesis" })
    expect(questions).toHaveLength(5)
    for (const q of questions) {
      expect(q.options).toHaveLength(4)
      expect([0,1,2,3]).toContain(q.correctIndex)
    }
  })
})
