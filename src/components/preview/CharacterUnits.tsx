import { memo } from "react";
import CharacterUnitIncluded from "./CharacterUnitIncluded";
import CharacterUnitMissing from "./CharacterUnitMissing";

// Works faster, not sure why.
const CharacterUnitIncludedMemo = memo(CharacterUnitIncluded);
const CharacterUnitMissingMemo = memo(CharacterUnitMissing);

type CharacterUnitsProps = {
  bitToMatch: Bit,
  characterCoverageBitmap: Bit[],
  characterUnits: string[]
};

export default function CharacterUnits({
  bitToMatch,
  characterCoverageBitmap,
  characterUnits
}: CharacterUnitsProps) {
  return (<>
    {characterUnits.map((characterUnit, i) => (
      (characterCoverageBitmap[i] === bitToMatch) ? (
        <CharacterUnitIncludedMemo key={i} {...{ characterUnit }} />
      ) : (
        <CharacterUnitMissingMemo key={i} />
      )
    ))}
  </>);
}
