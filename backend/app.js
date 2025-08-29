import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit"
import swaggerUi from "swagger-ui-express"

import { assertEnv } from "./lib/env.js"
import { swaggerSpec } from "./docs/index.js"
import { router } from "./routes/index.js"

assertEnv()

export const app = express()

app.use(express.json())
app.use(cors({ origin: true }))
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api", router)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: "Internal server error" })
})
