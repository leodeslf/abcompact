import { memo } from "react";
import CharMolecule from "./CharMolecule";
import CharMoleculePlaceholder from "./CharMoleculePlaceholder";

const CharMoleculeMemo = memo(CharMolecule);
const CharMoleculePlaceholderMemo = memo(CharMoleculePlaceholder);

type CharMoleculesProps = {
  bitToMatch: Bit,
  charMoleculesBitmap: Bit[],
  charMolecules: string[]
};

export default function CharMolecules({
  bitToMatch,
  charMoleculesBitmap,
  charMolecules
}: CharMoleculesProps) {
  return (<>
    {charMolecules.map((charMolecule, i) => (
      (charMoleculesBitmap[i] === bitToMatch) ? (
        <CharMoleculeMemo key={i} {...{ charMolecule }} />
      ) : (
        <CharMoleculePlaceholderMemo key={i} />
      )
    ))}
  </>);
}
