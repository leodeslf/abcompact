import CHARS_DATA from '../../../json/charsData.json';
import CHARS_UNICODE_RANGES from '../../../json/charsUnicodeRanges.json';
import CharsTitleCustomChars from './CharsTitleCustomChars';
import CharsTitle from './CharsTitle';

export default function CharsTitles() {
  return (
    <div className="chars__titles tabbed-menu__tabs" >
      {/* Exception for custom characters input. */}
      <CharsTitleCustomChars />
      {[...CHARS_DATA, ...CHARS_UNICODE_RANGES].map(({ id, title }) =>
        <CharsTitle {...{ id, title }} key={id} />)}
    </div>
  );
}
