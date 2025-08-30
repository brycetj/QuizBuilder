import React, { useState } from "react";
import TopicForm from "./components/TopicForm";
import QuizView from "./components/QuizView";
import ErrorAlert from "./components/ErrorAlert";
import EmptyState from "./components/EmptyState";
import { generateQuiz } from "./api";

export default function App() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate(requestedTopic) {
    const t = (requestedTopic ?? topic).trim();
    if (!t) {
      setError("Please enter a topic.");
      return;
    }

    setError(null);
    setSubmitted(false);
    setQuiz(null);
    setAnswers([]);

    const data = await generateQuiz(t);
    setQuiz(data);
    setAnswers(new Array(5).fill(-1));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleNewQuiz() {
    setSubmitted(false);
    setQuiz(null);
    setAnswers([]);
    setTopic("");
  }

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-1">AI Quiz Builder</h1>
        <p className="text-muted">
          Generate a 5-question multiple-choice quiz from any topic.
        </p>
      </header>

      <TopicForm
        topic={topic}
        setTopic={setTopic}
        onGenerate={handleGenerate}
      />
      <ErrorAlert message={error} />

      {quiz ? (
        <QuizView
          quiz={quiz}
          answers={answers}
          setAnswers={setAnswers}
          submitted={submitted}
          onSubmit={handleSubmit}
          onNewQuiz={handleNewQuiz}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
