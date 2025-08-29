import { Router } from "express"
import { generateQuizController } from "../controllers/quiz.controller.js"

export const quizRouter = Router()

quizRouter.post("/generate-quiz", generateQuizController)
