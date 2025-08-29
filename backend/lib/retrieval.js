import fetch from "node-fetch"

export async function fetchWikipediaContext(topic, maxChars = 2000) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      topic
    )}`
    const res = await fetch(url, {
      headers: { "User-Agent": "ai-quiz-builder/0.1" },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.extract) return null
    return `WIKIPEDIA SUMMARY FOR ${topic}:\n${data.extract.slice(0, maxChars)}`
  } catch {
    return null
  }
}
