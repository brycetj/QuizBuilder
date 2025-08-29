import { Router } from "express"
import { healthRouter } from "./health.routes.js"
import { quizRouter } from "./quiz.routes.js"

export const router = Router()

router.use(healthRouter)
router.use(quizRouter)
