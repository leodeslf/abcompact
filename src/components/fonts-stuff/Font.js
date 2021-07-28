import CopyBtn from "./CopyBtn";
import Coverage from "./Coverage";
import NotFound from "./NotFound";
import SizeOptim from "./SizeOptim";

export default function Font(fontFace) {
  const { familyName, textFontFace, sizeOptim, coverage } = fontFace;
  const ok = textFontFace && coverage.percentage > 0;

  return (
    <tr className={`font${!ok ? ' font--not-ok' : ''}`}>
      <td className="font__name">
        {familyName}
      </td>
      {ok && <>
        <td><SizeOptim {...{ sizeOptim }} /></td>
        <td><Coverage {...{ familyName, coverage }} /></td>
        <td><CopyBtn data={textFontFace} /></td>
      </>}
      {!ok && <td colSpan="3"><NotFound /></td>}
    </tr>
  );
}
