import { useContext } from "react";
import { FontsContext } from "../ABChoose";

export default function CopyAllButton() {
  const { fonts } = useContext(FontsContext);

  let allCss = '';
  if (fonts) fonts.forEach(font => {
    if (font.ok) allCss += font.css;
  });

  return (
    fonts ?
      <button
        className="green-btn"
        title="Click to copy all to Clipboard."
        onClick={() => navigator.clipboard.writeText(allCss)}
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
