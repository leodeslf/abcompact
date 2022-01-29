export default function CopyButton({ toCopy, text = 'COPY' }) {
  return (
    <button
      title="Click to copy."
      onClick={() => navigator.clipboard.writeText(toCopy)}
    >
      {text}
    </button>
  );
}
