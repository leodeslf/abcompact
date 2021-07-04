export default function CssIsDefaultError() {
  return (
    <div
      className="warn"
      role="alert"
      name="warn"
    >
      <span
        className="warn__title heading"
        role="heading"
        aria-level="3"
      >
        Default @font-face detected!
      </span>
      <p>
        Due to the amount of choosen <strong>Characters</strong>, Google Fonts returned
        the default <strong>@font-face</strong>, which includes all the
        available ones (not only the ones you need).
      </p>
      <p>
        All the fonts listed below happens to have the same issue.
      </p>
    </div>
  );
}
