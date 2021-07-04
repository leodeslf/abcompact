import CHARS_DATA from '../../../json/charsData.json';
import CHARS_UNICODE_RANGES from '../../../json/charsUnicodeRanges.json';
import CharsBodyCustomChars from './CharsBodyCustomChars';
import CharsBodyData from './CharsBodyData';
import CharsBodyUnicodeRange from './CharsBodyUnicodeRange';

export default function CharsBodies() {
  return (
    <div className="chars__bodies tabbed-menu__bodies">
      {/* Exception for custom characters input. */}
      <CharsBodyCustomChars />
      {CHARS_DATA.map((dataItems, i) =>
        <CharsBodyData {...dataItems} key={i} />)}
      {CHARS_UNICODE_RANGES.map((unicodeRangeItems, i) =>
        <CharsBodyUnicodeRange {...unicodeRangeItems} key={i} />)}
    </div>
  );
}
