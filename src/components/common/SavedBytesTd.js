import getUnit from "../../js/getUnit";

export default function SavedBytesTd({
  fromCss, fromWoff2, toCss, toWoff2, saved, savedPercentage
}) {
  return (
    <td
      className={`bytes ${saved > 0 ?
        'good' : saved < 0 ?
          'bad' : 'regular'}`}
      title={`From ${getUnit(fromCss)} to ${getUnit(toCss)} on CSS.\nFrom ${getUnit(fromWoff2)} to ${getUnit(toWoff2)} on Woff2.`}
    >
      {`${getUnit(saved)} (${savedPercentage}%)`}
    </td>
  );
}
