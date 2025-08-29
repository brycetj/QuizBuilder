export const quizDocs = {
  components: {
    schemas: {
      Question: {
        type: "object",
        required: ["prompt", "options", "correctIndex", "explanation"],
        properties: {
          prompt: { type: "string" },
          options: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: { type: "string" },
          },
          correctIndex: { type: "integer", minimum: 0, maximum: 3 },
          explanation: { type: "string" },
        },
      },
      Quiz: {
        type: "object",
        required: ["topic", "questions"],
        properties: {
          topic: { type: "string" },
          questions: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: { $ref: "#/components/schemas/Question" },
          },
        },
      },
    },
  },
  paths: {
    "/api/generate-quiz": {
      post: {
        tags: ["quiz"],
        summary: "Generate a 5-question multiple-choice quiz",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["topic"],
                properties: {
                  topic: {
                    type: "string",
                    description: 'Quiz topic (e.g., "Ancient Rome")',
                  },
                  useRetrieval: {
                    type: "boolean",
                    description: "Use Wikipedia summary as grounding context",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Quiz generated",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Quiz" } },
            },
          },
          400: {
            description: "Bad request",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          502: {
            description: "LLM failure",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          500: {
            description: "Server error",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
  },
}
