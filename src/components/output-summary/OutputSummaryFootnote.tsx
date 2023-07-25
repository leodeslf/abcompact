import { useAppSelector } from "../../stores/hooks";
import { getPercentage, useReadableFileWeight } from "../../ts/gui";

export default function OutputSummaryFootnote() {
  const {
    requestStatus: {
      isFailed,
      isLoading
    },
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

  return !(isLoading || isFailed) ? (
    <p className="optimization-summary-footnote">
      {totalDifference >= 0 ? (<>
        You saved <strong>
          {roundedDifference} {differenceUnit}
        </strong> ({differenceAsPercentage}%)!
      </>) : (<>
        Bad, it's <strong>
          {-roundedDifference} {differenceUnit}
        </strong> ({-differenceAsPercentage}%) heavier than before.
      </>)}
    </p>
  ) : (<></>);
}
