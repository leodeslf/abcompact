import Fonts from "./fonts-stuff/Fonts";
import CopyAllButton from "./CopyAllButton";
import { useContext } from "react";
import { FontFaceSetContext } from "../ABChoose";

export default function Output() {
  const { fontFaceSet } = useContext(FontFaceSetContext);

  return (
    fontFaceSet &&
    <div className="output white-box">
      <span
        className="white-box__title heading"
        role="heading"
        aria-level="2"
      >
        @font-face
      </span>
      <Fonts />
      <CopyAllButton />
    </div>
  );
}
