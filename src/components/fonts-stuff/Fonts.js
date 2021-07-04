import { FontsContext } from "../../ABChoose";
import { useContext } from "react";
import Font from "./Font";
import FontsPlaceholder from "./FontsPlaceholder";

export default function Fonts() {
  const { fonts } = useContext(FontsContext);

  return (
    fonts ?
      <div
        className="fonts"
        role="list"
      >
        {fonts.map((font, i) =>
          <Font {...font} key={i} />
        )}
      </div> :
      <FontsPlaceholder />
  );
}
