import { ChangeEvent, useState } from 'react';
import {
  characterValidationUpdate
} from '../../stores/characterValidationSlice';
import store from '../../stores/store';

type PredefinedCharactersSubsetProps = {
  id: number,
  label: string
};

export default function PredefinedCharacterSubset({
  id,
  label
}: PredefinedCharactersSubsetProps) {
  const [checked, setChecked] = useState(false);

  function updatePredefinedCharacters({
    target: { checked }
  }: ChangeEvent<HTMLInputElement>): void {
    setChecked(checked);
    store.dispatch(characterValidationUpdate(checked));
  }

  return (
    <label
      className='predefined-character-subsets__subset'
      htmlFor={`subset-${id}`}
      role="checkbox"
      title={label}
    >
      <input
        checked={checked}
        id={`subset-${id}`}
        onChange={updatePredefinedCharacters}
        type="checkbox"
        value={id}
      />
      {label}
    </label>
  );
};
