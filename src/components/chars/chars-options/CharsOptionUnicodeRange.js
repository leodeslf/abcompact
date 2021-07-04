import { useContext } from 'react';
import { CharsContext } from '../../Input';

export default function OptionUnicodeRange(item) {
  const { updateSelectedPresetIds } = useContext(CharsContext);
  const { id, rangeTitle } = item;

  return (
    <div className="chars__option">
      <input
        className="option__checkbox"
        id={`option--${id}`}
        type="checkbox"
        defaultChecked={false}
        onChange={e => updateSelectedPresetIds(id, e.target.checked)}
      />
      <label
        className="option__label"
        htmlFor={`option--${id}`}
        title={rangeTitle}>
        {rangeTitle.replaceAll(/ /g, '-')}
      </label>
    </div>
  );
}
