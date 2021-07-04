export default function RequestError() {
  return (
    <div
      className="warn"
      role="alert"
    >
      <span
        className="warn__title heading"
        role="heading"
        aria-level="3"
      >
        Oops!
      </span>
      <p>
        Font URI seems to be bad.
      </p>
    </div>
  );
}
