import { useAppSelector } from "../../stores/hooks";
import { getPercentage, useReadableFileWeight } from "../../ts/gui";

export default function OutputSummaryFootnote() {
  const {
    outputSummary: {
      css,
      woff2
    }
  } = useAppSelector(state => state);
  const totalDifference = css.difference + woff2.difference;
  const [
    roundedDifference,
    differenceUnit
  ] = useReadableFileWeight(totalDifference);
  const differenceAsPercentage = getPercentage(
    css.default + woff2.default,
    totalDifference
  );

  return (
    <p>
      {totalDifference >= 0 ? (
        <span role="status" className="ok">
          You saved&nbsp;<strong>
            {roundedDifference} {differenceUnit}
          </strong>&nbsp;({differenceAsPercentage}%)!
        </span>
      ) : (
        <span role="alert" className="error">
          Bad, it's&nbsp;<strong>
            {-roundedDifference} {differenceUnit}
          </strong>&nbsp;({-differenceAsPercentage}%) heavier than before.
        </span>
      )}
    </p>
  );
}
