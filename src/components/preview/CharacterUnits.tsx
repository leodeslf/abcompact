import { memo } from "react";
import CharacterUnit from "./CharacterUnit";
import CharacterUnitPlaceholder from "./CharacterUnitPlaceholder";

// Works faster, not sure why.
const CharacterUnitMemo = memo(CharacterUnit);
const CharacterUnitPlaceholderMemo = memo(CharacterUnitPlaceholder);

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
        <CharacterUnitMemo key={i} {...{ characterUnit }} />
      ) : (
        <CharacterUnitPlaceholderMemo key={i} />
      )
    ))}
  </>);
}
