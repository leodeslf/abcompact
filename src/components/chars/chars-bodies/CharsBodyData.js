import { useContext } from 'react';
import { CharsTabContext } from '../Chars';
import CharsOptionData from '../chars-options/CharsOptionData';

export default function CharsBodyData(dataItems) {
  const { charsTab } = useContext(CharsTabContext);
  const { id, groups } = dataItems;

  return (
    <div
      className="chars__body tabbed-menu__body"
      style={{ display: (charsTab !== id) ? 'none' : '' }}
      aria-hidden={charsTab !== id}
      role="tabpanel"
    >
      {groups.map((item, i) =>
        <CharsOptionData {...item} key={i} />
      )}
    </div>
  );
}
