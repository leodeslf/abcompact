export default function FontsPlaceholder() {
  const pieces = [1, 2, 3];

  return (
    <div
      className="fonts"
      aria-hidden="true"
    >
      {pieces.map(i =>
        <div
          className="font"
          key={i}
        >
          <span className="font__name placeholder">
            Font Element
          </span>
          <span className="font__copy-btn placeholder">Copy</span>
        </div>)}
    </div>
  )
}
