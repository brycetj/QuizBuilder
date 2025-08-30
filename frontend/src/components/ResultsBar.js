export default function ResultsBar({ score, total }) {
  const msg =
    score === total
      ? "Perfect!"
      : score >= 4
      ? "Great job!"
      : score >= 2
      ? "Nice start — review explanations to improve."
      : "Give it another go!";

  return (
    <div className="alert alert-info mt-3 mb-0" role="alert">
      <strong>Score:</strong> {score}/{total} {msg}
    </div>
  );
}
