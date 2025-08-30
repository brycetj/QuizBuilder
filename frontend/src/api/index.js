const API_BASE = process.env.REACT_APP_API_BASE || "";

export async function generateQuiz(topic) {
  const res = await fetch(`${API_BASE}/api/generate-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to generate quiz");
  }

  return data;
}
