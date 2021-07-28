import { useContext } from "react";
import { FontFaceSetContext } from "../ABChoose";

export default function CopyAllButton() {
  const { fontFaceSet } = useContext(FontFaceSetContext);

  let allFontFaceCSS = '';
  if (fontFaceSet) fontFaceSet.forEach(font => {
    if (font.ok) allFontFaceCSS += font.textFontFace;
  });

  return (
    fontFaceSet ?
      <button
        className="green-btn"
        title="Click to copy all to Clipboard."
        onClick={() => navigator.clipboard.writeText(allFontFaceCSS)}
      >
        Copy all to Clipboard
      </button> :
      <span
        className="green-btn placeholder"
        aria-hidden="true"
      >
        Copy all to Clipboard
      </span>
  );
}
