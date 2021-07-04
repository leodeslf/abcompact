import { useContext } from 'react';
import { CharsTabContext } from '../Chars';

export default function CharsTitleCustomChars() {
  const { updateCharsTab } = useContext(CharsTabContext);

  return (
    <div
      className="chars__title"
      role="tab"
    >
      <input
        id={`tabbed-menu__tab-radio--custom-chars`}
        className="tabbed-menu__tab-radio"
        name="tabbed-menu__tab-radio--chars"
        type="radio"
        defaultChecked
        onChange={e => {
          if (e.target.checked) updateCharsTab('custom-chars');
        }}
      />
      <label
        htmlFor="tabbed-menu__tab-radio--custom-chars"
        className="tabbed-menu__tab-label"
      >
        Custom
      </label>
    </div>
  );
}
