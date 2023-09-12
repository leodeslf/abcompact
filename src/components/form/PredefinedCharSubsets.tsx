import { ChangeEvent, forwardRef, memo } from 'react';
import PredefinedCharSubset from './PredefinedCharSubset';
import predefinedCharSubsets from '../../json/predefinedCharSubsets.json';

const PredefinedCharSubsetMemo = memo(PredefinedCharSubset);

type PredefinedCharSubsetsProps = {
  amountOfSelectedSubsets: number,
  setAmountOfSelectedSubsets: (amount: number) => void;
};

const PredefinedCharSubsets = forwardRef<
  HTMLFieldSetElement,
  PredefinedCharSubsetsProps
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
        Subsets
      </legend>
      <ul>
        {predefinedCharSubsets.map(({ id, name }) => (
          <li key={id}>
            <PredefinedCharSubsetMemo
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

export default PredefinedCharSubsets;
