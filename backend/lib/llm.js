import OpenAI from "openai"
import { ENV } from "./env.js"

const MOCK =
  ENV.USE_MOCK === "true" ||
  !ENV.OPENAI_API_KEY ||
  ENV.OPENAI_API_KEY.startsWith("fake-")

let openai
if (!MOCK) {
  openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY })
}

export async function generateQuiz({ topic, context }) {
  if (MOCK) {
    return {
      questions: Array.from({ length: 5 }, (_, i) => ({
        prompt: `Mock question ${i + 1} about ${topic}?`,
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "Mock explanation",
      })),
    }
  }

  const system =
    "You create quizzes. Output STRICT JSON only. " +
    "Return: { questions: [ { prompt, options[4], correctIndex(0-3), explanation } ] } with exactly 5 questions."

  const user = [
    `Topic: ${topic}`,
    context ? `\nContext:\n${context}` : "",
    "\nConstraints:",
    "- 5 questions each 4 options one correct.",
  ].join(" ")

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  })

  const raw = completion.choices?.[0]?.message?.content?.trim() || "{}"
  const start = raw.indexOf("{")
  const end = raw.lastIndexOf("}")
  const sliced = start >= 0 && end >= 0 ? raw.slice(start, end + 1) : "{}"

  let payload
  try {
    payload = JSON.parse(sliced)
  } catch {
    payload = { questions: [] }
  }

  return payload
}
