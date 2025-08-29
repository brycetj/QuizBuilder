import swaggerJSDoc from "swagger-jsdoc"
import { base } from "./base.js"
import { healthDocs } from "./features/health.js"
import { quizDocs } from "./features/quiz.js"

function mergeObjects(target, source) {
  for (const key of Object.keys(source)) {
    const srcVal = source[key]
    const tgtVal = target[key]
    if (
      srcVal &&
      typeof srcVal === "object" &&
      !Array.isArray(srcVal)
    ) {
      target[key] = mergeObjects(tgtVal || {}, srcVal)
    } else {
      target[key] = srcVal
    }
  }
  return target
}

const combined = [healthDocs, quizDocs].reduce(
  (acc, part) => mergeObjects(acc, part),
  structuredClone(base)
)

const swaggerOptions = {
  definition: combined,
  apis: [],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
