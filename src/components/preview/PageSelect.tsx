import { useAppSelector } from "../../stores/hooks";
import { previewCharMoleculesPerPage } from "../../ts/gui";

type PageSelectProps = {
  pageIndex: number,
  setPageIndex: (index: number) => void
};

export default function PageSelect({
  pageIndex,
  setPageIndex
}: PageSelectProps) {
  const {
    requestMemo: {
      charMolecules
    }
  } = useAppSelector(state => state);
  const amountOfPages = Math.ceil(
    charMolecules.length / previewCharMoleculesPerPage
  );

  if (amountOfPages === 1) {
    return <></>;
  }

  return (
    <span>
      <label htmlFor="page-selector">
        Page <select
          id="page-selector"
          onChange={event => setPageIndex(+event.target.value)}
          value={pageIndex}
        >
          {(new Array(amountOfPages)).fill(0).map((_, i) => (
            <option
              key={i}
              value={i}
            >
              {i + 1}
            </option>
          ))}
        </select>
      </label> of {amountOfPages}
    </span>
  );
}
