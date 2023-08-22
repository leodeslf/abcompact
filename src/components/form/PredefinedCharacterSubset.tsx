import { useState } from 'react';

type PredefinedCharactersSubsetProps = {
  id: number,
  label: string
};

export default function PredefinedCharacterSubset({
  id,
  label
}: PredefinedCharactersSubsetProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      aria-checked={checked}
      htmlFor={`subset-${id}`}
      role="checkbox"
      title={label}
    >
      <input
        checked={checked}
        id={`subset-${id}`}
        onChange={({ target }) => setChecked(target.checked)}
        type="checkbox"
        value={id}
      />
      {label}
    </label>
  );
};
