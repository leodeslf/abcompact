import { useAppSelector } from "../../stores/hooks";
import DefaultVsOptimizedTds from "./DefaultVsOptimizedTds";

export default function OptimizedFontBody({
  results: {
    charMoleculesBitmap,
    weightReport,
    optimizedCss,
    styles
  },
  family
}: OptimizedFontWithoutError) {
  const {
    requestMemo: {
      charMolecules: {
        length: amountOfRequiredCharMolecules
      }
    }
  } = useAppSelector(state => state);
  const amountOfMissingCharMolecules = charMoleculesBitmap
    .filter(bit => !bit)
    .length;

  return (
    <tr>
      <td>
        {family}{styles.length > 1 && <span role="status">
          {styles.length} styles
        </span>}{amountOfMissingCharMolecules > 0 && <span
          role="alert"
          title={`${amountOfMissingCharMolecules} character${amountOfMissingCharMolecules > 1 ? 's' : ''} missing.`}
        >
          {amountOfRequiredCharMolecules - amountOfMissingCharMolecules}
          /{amountOfRequiredCharMolecules} characters
        </span>}
      </td>
      <td>
        <button
          onClick={() => navigator.clipboard.writeText(optimizedCss)}
          title={`Click to copy ${family}${family[family.length - 1] === 's' ? '\'' : '\'s'} CSS to the clipboard.`}
        >
          Copy
        </button>
      </td>
      {<DefaultVsOptimizedTds {...{
        defaultWeight: weightReport.css.default + weightReport.woff2.default,
        optimizedWeight: weightReport.css.optimized + weightReport.woff2.optimized
      }} />}
    </tr>
  );
}
