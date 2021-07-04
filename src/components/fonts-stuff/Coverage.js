import { useContext } from "react";
import { ModalWindowContext } from "../../ABChoose";
import NotCoveredChars from "./NotCoveredChars";

export default function Coverage(font) {
  const { coverage, fontName, notCoveredChars } = font;

  const total = coverage === 100;
  const partial = coverage > 0 && coverage < 100;
  const empty = coverage === 0;

  const { updateModalWindow } = useContext(ModalWindowContext);

  return (
    !total && <>
      {partial && <>
        <button
          className={`font__coverage font__feedback font__feedback--warn font-btn`}
          title={`Some characters are missing, click to see details.`}
          onClick={() => {
            updateModalWindow(NotCoveredChars({ notCoveredChars, fontName }));
          }}
          role="status"
        >
          {coverage}%
        </button>
      </>}
      {empty &&
        <span
          className={`font__coverage font__feedback font__feedback--error`}
          title={`This font does not include any of the characters you need.`}
          role="status"
        >
          {coverage}%
        </span>}
    </>
  );
}
