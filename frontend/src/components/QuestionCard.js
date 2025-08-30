export default function QuestionCard({
  index,
  question,
  selected,
  onSelect,
  submitted,
}) {
  const isCorrect = submitted && selected === question.correctIndex;
  const itemClass = submitted
    ? isCorrect
      ? "list-group-item list-group-item-success"
      : "list-group-item list-group-item-danger"
    : "list-group-item";

  return (
    <li className={itemClass}>
      <p className="mb-2 fw-semibold">{question.prompt}</p>
      {question.options.map((opt, j) => (
        <div className="form-check" key={j}>
          <input
            className="form-check-input"
            type="radio"
            name={`q${index}`}
            id={`q${index}-o${j}`}
            value={j}
            checked={selected === j}
            onChange={() => onSelect(index, j)}
            disabled={submitted}
          />
          <label className="form-check-label" htmlFor={`q${index}-o${j}`}>
            <strong className="me-1">{String.fromCharCode(65 + j)}.</strong>{" "}
            {opt}
          </label>
          {submitted && j === question.correctIndex && (
            <span className="badge bg-success ms-2">Correct</span>
          )}
        </div>
      ))}

      {submitted && (
        <div className="mt-2">
          <div className="fw-semibold">Explanation</div>
          <div className="text-muted">{question.explanation}</div>
        </div>
      )}
    </li>
  );
}
