export default function CopyBtn({ data }) {
  return (
    <button
      className="font__copy-btn"
      onClick={() => navigator.clipboard.writeText(data)}
      title="Click to copy this @font-face to Clipboard."
    >
      Copy
    </button>
  );
}
