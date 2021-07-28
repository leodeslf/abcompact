export default function CopyBtn({ data }) {
  return (
    <button
      className="font__copy-btn"
      onClick={() => navigator.clipboard.writeText(data)}
      title="Click to copy this font to Clipboard."
    >
      <span className="copy-btn__back-paper"></span>
      <span className="copy-btn__front-paper"></span>
    </button>
  );
}
