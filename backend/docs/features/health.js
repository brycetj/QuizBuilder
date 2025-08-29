export const healthDocs = {
  paths: {
    "/api/health": {
      get: {
        tags: ["health"],
        summary: "Health probe",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: { type: "object", properties: { ok: { type: "boolean" } } },
              },
            },
          },
        },
      },
    },
  },
}
