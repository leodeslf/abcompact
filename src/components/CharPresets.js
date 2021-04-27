import CHAR_PRESETS from "../js/charPresets";

export default function CharPresets() {
  return (
    <ul>
      {CHAR_PRESETS.map(({ name, items }, i) =>
        <li className="char-preset" key={i}>
          <input
            id={'char-preset--' + i}
            value={i}
            name="char-preset"
            type="checkbox"
            defaultChecked={false}
          />
          <label
            htmlFor={'char-preset--' + i}
            title={name}
          >
            {items}
          </label>
        </li>
      )}
    </ul>
  );
}
