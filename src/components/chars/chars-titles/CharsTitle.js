import { useContext } from 'react';
import { CharsTabContext } from '../Chars';

export default function CharsTitle({ id, title }) {
  const { updateCharsTab } = useContext(CharsTabContext);

  return (
    <div
      className="chars__title"
      role="tab"
    >
      <input
        id={`tabbed-menu__tab-radio--${id}`}
        className="tabbed-menu__tab-radio"
        name="tabbed-menu__tab-radio--chars"
        type="radio"
        onChange={e => {
          if (e.target.checked) updateCharsTab(id)
        }}
      />
      <label
        htmlFor={`tabbed-menu__tab-radio--${id}`}
        className="tabbed-menu__tab-label"
      >
        {title}
      </label>
    </div>
  );
}
