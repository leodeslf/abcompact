type CharMoleculeProps = {
  charMolecule: string
};

export default function CharMolecule({ charMolecule }: CharMoleculeProps) {
  return (
    <span
      title={`"${charMolecule}" = ${[...charMolecule]
        .map(charAtom => `U+${(charAtom.codePointAt(0) as number)
          .toString(16)
          .toUpperCase()}`
        ).join(' ')
        }.`}
    >
      {charMolecule}
    </span>
  );
}
