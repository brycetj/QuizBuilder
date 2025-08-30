import { fetchWikipediaContext } from "../lib/retrieval.js";
import { generateQuiz } from "../lib/llm.js";

export async function generateQuizController(req, res, next) {
  try {
    const { topic } = req.body || {};
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'topic'." });
    }

    const context = await fetchWikipediaContext(topic);
    const quiz = await generateQuiz({ topic, context });

    if (!quiz.questions?.length) {
      return res
        .status(502)
        .json({
          error: "LLM failed to produce a valid quiz. Try another topic.",
        });
    }

    res.json({ topic, questions: quiz.questions });
  } catch (err) {
    next(err);
  }
}
