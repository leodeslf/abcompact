import sortedAndUnique from "../../js/util/sortedAndUnique";

export default function NotCoveredChars({ notCoveredChars, fontName }) {
  return (
    <article className="not-covered-chars">
      <h2 className="white-box__title heading">
        Not Covered Characters
      </h2>
      <p>
        <strong>{fontName}</strong> does not include any of the following
        characters.
      </p>
      <div className="not-covered-chars__chars">
        {sortedAndUnique(notCoveredChars).split('').map(item =>
          <div
            className="not-covered-chars__char"
            key={item.charCodeAt(0)}
          >
            <span>
              {item}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
