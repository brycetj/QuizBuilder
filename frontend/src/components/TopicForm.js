import React, { useState } from "react";

export default function TopicForm({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const t = topic.trim();
    if (!t) return;
    setLoading(true);
    try {
      await onGenerate(t);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card p-3 mb-3" onSubmit={handleSubmit}>
      <div className="row g-3 align-items-end">
        <div className="col-md">
          <label htmlFor="topic" className="form-label">
            Topic
          </label>
          <input
            id="topic"
            className="form-control"
            placeholder="e.g., Photosynthesis, Ancient Rome, Neural Networks"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>
      </div>
    </form>
  );
}
