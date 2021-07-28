import { useContext } from "react";
import { ModalWindowContext } from "../../ABChoose";
import NotCoveredChars from "../modals/NotCoveredChars";

export default function Coverage({ familyName, coverage }) {
  const { neededCharsCount, percentage } = coverage;

  return (
    (percentage === 100 &&
      <span className="font__feedback secondary">
        all&nbsp;({neededCharsCount})
      </span>) ||
    (percentage < 100 &&
      <CoverageBtn {...{ familyName, coverage }} />)
  );
}

function CoverageBtn({ familyName, coverage }) {
  const { updateModalWindow } = useContext(ModalWindowContext);
  const {
    neededCharsCount,
    notCoveredCharsCount,
    notCoveredChars,
    percentage
  } = coverage;

  let available = neededCharsCount - notCoveredCharsCount +
    '/' + neededCharsCount;

  return (
    <button
      className="font__feedback font__coverage btn"
      title="Click to see more info."
      onClick={() => updateModalWindow(
        NotCoveredChars({ familyName, notCoveredChars })
      )}
    >
      {available}&nbsp;<span className="secondary">|&nbsp;{percentage}%</span>
    </button>
  );
}
