import { useContext } from 'react';
import { CharsTabContext } from '../Chars';
import CharsOptionUnicodeRange from '../chars-options/CharsOptionUnicodeRange';

export default function CharsBodyUnicodeRange(unicodeRangeItems) {
  const { charsTab } = useContext(CharsTabContext);
  const { id, groups } = unicodeRangeItems;

  return (
    <div
      className="chars__body tabbed-menu__body"
      style={{ display: (charsTab !== id) ? 'none' : '' }}
      aria-hidden={charsTab !== id}
      role="tabpanel"
    >
      {groups.map((item, i) =>
        <CharsOptionUnicodeRange {...item} key={i} />
      )}
    </div>
  );
}
