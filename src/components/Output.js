export default function Output({ fontFace }) {
  return (
    <section className="output">
      <h2>
        <label htmlFor="font-face">
          Font-face
        </label>
      </h2>
      <div className="width-fixer">
        <textarea
          id="font-face"
          className="font-face"
          value={fontFace}
          placeholder="@font-face {..."
          readOnly={true}
          rows="6"
          disabled={!fontFace.length}
        />
      </div>
    </section>
  );
}
