export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Request failed:</strong> {message}
    </div>
  );
}
