import { useAppSelector } from "../../stores/hooks";
import DefaultVsOptimizedTds from "./DefaultVsOptimizedTds";

export default function OptimizedFontBody({
  results: {
    characterCoverageBitmap,
    filesWeight,
    optimizedCss,
    styles
  },
  name
}: OptimizedFontWithoutError) {
  const {
    requestMemo: {
      characterUnits: {
        length: requiredCharacterUnits
      }
    }
  } = useAppSelector(state => state);
  const missingCharacterUnits = characterCoverageBitmap
    .filter(item => !item)
    .length;

  return (
    <tr>
      <td>
        {name}{styles.length > 1 && <span role="status">
          {styles.length} styles
        </span>}{missingCharacterUnits > 0 && <span
          role="alert"
          title={`${missingCharacterUnits} character${missingCharacterUnits > 1 ? 's' : ''} missing.`}
        >
          {requiredCharacterUnits - missingCharacterUnits}
          /{requiredCharacterUnits} characters
        </span>}
      </td>
      <td>
        <button
          onClick={() => navigator.clipboard.writeText(optimizedCss)}
          title={`Click to copy ${name}${name[name.length - 1] === 's' ? '\'' : '\'s'} CSS to the clipboard.`}
        >
          Copy
        </button>
      </td>
      {<DefaultVsOptimizedTds {...{
        defaultWeight: filesWeight.css.default + filesWeight.woff2.default,
        optimizedWeight: filesWeight.css.optimized + filesWeight.woff2.optimized
      }} />}
    </tr>
  );
}
