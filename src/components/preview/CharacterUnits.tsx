import { Fragment } from "react";
import CharacterUnitMissing from "./CharacterUnitMissing";
import CharacterUnitIncluded from "./CharacterUnitIncluded";

type CharacterUnitsProps = {
  category: "included" | "missing",
  characterUnits: string[],
  characterCoverageBitmap: BitmapValues[]
};

export default function CharacterUnits({
  category,
  characterUnits,
  characterCoverageBitmap
}: CharacterUnitsProps) {
  const bitToMatch = (category === "included" ? 1 : 0);

  return (<>
    {characterUnits.map((characterUnit, i) => (
      <Fragment key={i}>
        {bitToMatch === characterCoverageBitmap[i] ? (
          <CharacterUnitIncluded characterUnit={characterUnit} />
        ) : (
          <CharacterUnitMissing />
        )}
      </Fragment>
    ))}
  </>);
}
