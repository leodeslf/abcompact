type CharacterUnitIncludedProps = {
  characterUnit: string
};

export default function CharacterUnitIncluded({
  characterUnit
}: CharacterUnitIncludedProps) {
  return (
    <span
      title={`"${characterUnit}" = ${[...characterUnit]
        .map(character => `U+${((character
          .codePointAt(0)) as number)
          .toString(16)
          .toUpperCase()}`)
        .join(' ')
        }.`}
    >
      {characterUnit}
    </span>
  );
}
