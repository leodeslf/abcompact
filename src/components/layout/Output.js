import { useSelector } from 'react-redux';
import getFontFaceListTotal from '../../js/getFontFaceListTotal';
import CopyButton from '../common/CopyButton';
import FontFaceItem from './fontFace/FontFaceItem';
import SavedBytesTd from '../common/SavedBytesTd';
import SavedWoff2RequestsTd from '../common/SavedWoff2RequestsTd';

const headers = [
  'Name',
  'Characters',
  'Saved Requests',
  'Saved Bytes',
  'CSS'
];

export default function Output() {
  const { fontFaceList } = useSelector(state => state);
  if (!fontFaceList.length) return <></>;

  const { generic, specific, saved } = getFontFaceListTotal(fontFaceList);

  return (
    <div className="output">
      <div className='font-face'>
        <h2>@font-face</h2>
        <table>
          <thead>
            <tr>
              {headers.map((header, i) => <th key={i}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {fontFaceList.map((fontFace, i) =>
              <FontFaceItem key={i}  {...fontFace} />
            )}
          </tbody>
          {fontFaceList.length > 1 &&
            <tfoot>
              <tr>
                <th colSpan={2}>Total</th>
                <SavedWoff2RequestsTd
                  {...{
                    from: generic.woff2Requests,
                    to: specific.woff2Requests,
                    saved: saved.woff2Requests,
                    savedPercentage: saved.woff2RequestsPercentage
                  }}
                />
                <SavedBytesTd
                  {...{
                    fromCss: generic.cssLength,
                    fromWoff2: generic.woff2Length,
                    toCss: specific.cssLength,
                    toWoff2: specific.woff2Length,
                    saved: saved.cssWoff2CombinedLength,
                    savedPercentage: saved.cssWoff2CombinedPercentage
                  }}
                />
                <td>
                  <CopyButton
                    toCopy={specific.cssText}
                    text={'COPY ALL'}
                  />
                </td>
              </tr>
            </tfoot>}
        </table>
      </div>
      {/* disclaimer about the "potenctial" savings */}
    </div>
  );
}
