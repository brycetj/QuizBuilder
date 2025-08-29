export const base = {
  openapi: "3.1.0",
  info: {
    title: "AI Quiz Builder API",
    version: "0.1.0",
    description:
      "Endpoints for generating multiple-choice quizzes using an AI model.",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [{ name: "health" }, { name: "quiz" }],
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: { error: { type: "string" } },
      },
    },
  },
}
