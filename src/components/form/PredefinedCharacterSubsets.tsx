import predefinedCharacterSubsets from
  '../../json/predefinedCharacterSubsets.json';
import PredefinedCharacterSubset from './PredefinedCharacterSubset';

export default function PredefinedCharacterSubsets() {
  return (
    <fieldset>
      <legend>
        Predefined Character Subsets
      </legend>
      <ul className="predefined-character-subsets__subsets">
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
}
