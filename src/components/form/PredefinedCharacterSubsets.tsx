import { ChangeEvent, forwardRef } from 'react';
import predefinedCharacterSubsets from
  '../../json/predefinedCharacterSubsets.json';
import PredefinedCharacterSubset from './PredefinedCharacterSubset';

type PredefinedCharacterSubsetsProps = {
  amountOfSelectedSubsets: number,
  setAmountOfSelectedSubsets: (amount: number) => void;
};

const PredefinedCharacterSubsets = forwardRef<
  HTMLFieldSetElement,
  PredefinedCharacterSubsetsProps
>(({
  amountOfSelectedSubsets,
  setAmountOfSelectedSubsets
},
  ref
) => {
  function updateAmountOfSelectedSubsets(
    event: ChangeEvent<HTMLFieldSetElement>
  ): void {
    if (event.target instanceof HTMLInputElement) {
      const { checked } = event.target;
      setAmountOfSelectedSubsets(amountOfSelectedSubsets + (checked ? 1 : -1));
    }
  }

  return (
    <fieldset
      ref={ref}
      onChange={updateAmountOfSelectedSubsets}
    >
      <legend>
        Predefined Subsets
      </legend>
      <ul>
        {predefinedCharacterSubsets.map(({ id, name }) => (
          <li key={id}>
            <PredefinedCharacterSubset
              id={id}
              key={id}
              label={name}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
});

export default PredefinedCharacterSubsets;
