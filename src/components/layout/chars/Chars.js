import { useState } from "react";
import CustomChars from "./CustomChars";
import CharSet from "./CharSet";
import charsData from '../../../json/charsData.json';
import charsRange from '../../../json/charsRange.json';

const charsAll = [
  ...charsData,
  ...charsRange
];
const titles = [
  'Custom',
  ...charsAll.map(({ name }) => name)
];

export default function Chars() {
  const [tab, setTab] = useState(0);

  return (
    <fieldset className="chars">
      <legend>Characters</legend>
      <div className="chars__sets tabbed-box">
        <ul className="tabbed-box__tab-titles">
          {titles.map((title, i) =>
            <li
              key={i}
              className={`tabbed-box__tab-title ${tab === i ?
                'selected' : ''}`}
            >
              <label
                htmlFor={`chars__tab-title--${i}`}
              >
                {title}
                <input
                  id={`chars__tab-title--${i}`}
                  name="chars__tab-titles"
                  type="radio"
                  checked={tab === i}
                  onChange={() => setTab(i)}
                />
              </label>
            </li>
          )}
        </ul>
        <div className="tabbed-box__tab-contents">
          <div className={`tabbed-box__tab-content ${tab === 0 ?
            'selected' : ''}`}>
            <CustomChars />
          </div>
          {charsAll.map(({ sets }, i) =>
            <div
              className={`tabbed-box__tab-content ${tab === (i + 1) ? 'selected' : ''}`}
              key={i}
            >
              <CharSet {...{ sets, id: i }} />
            </div>
          )}
        </div>
      </div>
    </fieldset>
  );
}
