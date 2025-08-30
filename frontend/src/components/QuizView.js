import QuestionCard from "./QuestionCard";
import ResultsBar from "./ResultsBar";

export default function QuizView({
  quiz,
  answers,
  setAnswers,
  submitted,
  onSubmit,
  onNewQuiz,
}) {
  function onSelect(i, j) {
    const next = [...answers];
    next[i] = j;
    setAnswers(next);
  }

  const score = submitted
    ? quiz.questions.reduce(
        (acc, q, i) => (answers[i] === q.correctIndex ? acc + 1 : acc),
        0
      )
    : 0;

  return (
    <form
      className="card p-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-2">
        <h2 className="h5 mb-0">Topic: {quiz.topic}</h2>
        <small className="text-muted">
          Choose one answer per question, then submit.
        </small>
      </div>

      <ol className="list-group list-group-numbered mb-3">
        {quiz.questions.map((q, i) => (
          <QuestionCard
            key={i}
            index={i}
            question={q}
            selected={answers[i]}
            onSelect={onSelect}
            submitted={submitted}
          />
        ))}
      </ol>

      {!submitted ? (
        <button type="submit" className="btn btn-success">
          Submit Quiz
        </button>
      ) : (
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary" onClick={onNewQuiz}>
            New Quiz
          </button>
        </div>
      )}

      {submitted && <ResultsBar score={score} total={quiz.questions.length} />}
    </form>
  );
}
