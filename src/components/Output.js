import { createContext } from "react";
import Fonts from "./fonts-stuff/Fonts";
import CopyAllButton from "./CopyAllButton";

export const ActiveTabContext = createContext();

export default function Output() {

  return (
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
