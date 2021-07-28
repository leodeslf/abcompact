import { FontFaceSetContext } from "../../ABChoose";
import { useContext } from "react";
import Font from "./Font";

export default function Fonts() {
  const { fontFaceSet } = useContext(FontFaceSetContext);

  return (
    <table className="fonts">
      <tbody>
        <tr>
          <th>Name</th>
          <th title="Up to.">Saved</th>
          <th title="Included.">Characters</th>
          <th></th>
        </tr>
        {fontFaceSet.map((fontFace, i) =>
          <Font {...fontFace} key={i} />
        )}
      </tbody>
    </table>
  );
}
