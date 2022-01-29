import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../stores/charCoverageModalContentSlice";
import toggleBodyOverflow from "../../js/toggleBodyOverflow";
import getWoff2Urls from '../../js/getWoff2Urls';
import getCssTextStyles from "../../js/getCssTextStyles";
import { useState } from "react";

export default function CharCoverageModal() {
  const dispatch = useDispatch();
  const { charCoverageModalContent, lastRequest } = useSelector(state => state);
  const { chars, cssText, title } = charCoverageModalContent;
  const { included } = chars;

  const styles = [];
  const cssTextStyles = getCssTextStyles(cssText);
  let defaultStyleIndex = 0;

  for (const cssTextStyle of cssTextStyles) {
    const style = cssTextStyle.match(/font-style: (normal|italic);/)[1];
    const weight = cssTextStyle.match(/font-weight: (\d*);/)[1];
    const font = new FontFace(
      title,
      `url(${getWoff2Urls(cssTextStyle)})`,
      { style, weight, display: 'swap', }
    );
    font.load().then(() => document.fonts.add(font));
    if (style === 'normal' && weight === '400') {
      defaultStyleIndex = styles.length;
    }
    styles.push({ style, weight });
  }

  const [activeStyleIndex, setActiveStyle] = useState(defaultStyleIndex);

  function closeModal() {
    dispatch(clear());
    toggleBodyOverflow();
  }

  return (
    <div
      className="char-coverage__modal"
      onClick={(e) => (e.currentTarget === e.target) && closeModal()}
    >
      <section className="char-coverage__content">
        <div className="char-coverage__header">
          <h2>{title}</h2>
          <button
            onClick={closeModal}
            title="Click (or click outside) to close."
          >
            close
          </button>
        </div>
        {styles.length > 1 &&
          <fieldset>
            <legend>Styles</legend>
            <div className="char-coverage__styles">
              {styles.map(({ style, weight }, i) =>
                <label
                  key={i}
                  htmlFor={`char-coverage__style--${i}`}
                  className={`char-coverage__style ${i === activeStyleIndex ?
                    'selected' : ''}`}
                >
                  {style === 'italic' ? 'i-' : ''}{weight}
                  <input
                    type="radio"
                    name="char-coverage__style"
                    onChange={() => setActiveStyle(i)}
                    checked={i === activeStyleIndex}
                    id={`char-coverage__style--${i}`}
                  />
                </label>
              )}
            </div>
          </fieldset>
        }
        <fieldset className="char-coverage__chars-fieldset">
          <legend>Characters</legend>
          <div className="char-coverage__chars">
            {lastRequest.chars.split('').map((char, i) =>
              <span
                key={i}
                className={`char-coverage__char ${!included.includes(char) ?
                  'missing' : ''}`}
                style={included.includes(char) === true ? {
                  fontFamily: title,
                  fontStyle: styles[activeStyleIndex].style,
                  fontWeight: styles[activeStyleIndex].weight
                } : {}}
              >
                {char}
              </span>
            )}
          </div>
        </fieldset>
      </section>
    </div>
  );
}
