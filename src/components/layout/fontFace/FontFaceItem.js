import CopyButton from '../../common/CopyButton';
import SavedBytesTd from '../../common/SavedBytesTd';
import SavedWoff2RequestsTd from '../../common/SavedWoff2RequestsTd';
import FontFaceErrorDescription from './FontFaceErrorDescription';
import FontFaceChars from './FontFaceChars';

export default function FontFaceItem({
  chars, error, generic, name, specific, styles, saved
}) {
  return (
    <tr className={`font-face__item ${error ? 'has-error' : ''}`}>
      <td>
        {`${name} ${styles > 1 ? '(' + styles + ' styles)' : ''}`}
      </td>
      {error ?
        <FontFaceErrorDescription description={error} /> :
        <>
          <FontFaceChars
            {...{
              chars,
              cssText: specific.cssText,
              title: name
            }}
          />
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
            <CopyButton toCopy={specific.cssText} />
          </td>
        </>}
    </tr >
  );
}
