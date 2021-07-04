import { useContext } from 'react';
import { CharsContext } from '../../Input';
import { CharsTabContext } from '../Chars';

export default function CharsBodyCustomChars() {
  const { charsTab } = useContext(CharsTabContext);
  const { customChars, updateCustomChars } = useContext(CharsContext);

  return (
    <div
      className="chars__body tabbed-menu__body textarea-container"
      style={{ display: (charsTab !== 'custom-chars') ? 'none' : '' }}
      aria-hidden={charsTab !== 'custom-chars'}
      role="tabpanel"
    >
      <textarea
        value={customChars}
        placeholder="Type the ones you need from that font/s (case sensitive)."
        onChange={e => updateCustomChars(e.target.value)}
        rows="4"
        aria-label="Custom characters"
      />
    </div>
  );
}
