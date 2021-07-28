import getSortedSet from "../../js/util/getSortedSet";

export default function NotCoveredChars({ familyName, notCoveredChars }) {
  return (
    <article className="not-covered-chars">
      <h2 className="white-box__title heading">
        Not Covered Characters
      </h2>
      <p>
        <strong>{familyName}</strong> does not include any of the following
        characters.
      </p>
      <div className="not-covered-chars__chars">
        {getSortedSet(notCoveredChars).split('').map(item =>
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
