import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../stores/hooks";
import store from "../../stores/store";
import { characterValidationUpdate } from "../../stores/characterValidationSlice";
import { getFilteredCharactersFromCustomCharacters } from "../../ts/characters";

export default function CustomCharacters() {
  const { characterValidation: isValid } = useAppSelector(state => state);
  const [characters, setCharacters] = useState('');

  const updateCustomCharacters = ({
    target
  }: ChangeEvent<HTMLTextAreaElement>): void => {
    setCharacters(target.value);
    store.dispatch(characterValidationUpdate(
      getFilteredCharactersFromCustomCharacters(target.value).length > 0
    ));
  };

  return (
    <div className="custom-characters">
      <label htmlFor="custom-characters">
        Custom Characters
      </label>
      <textarea
        id="custom-characters"
        onChange={updateCustomCharacters}
        placeholder="Case sensitive..."
        required={!isValid}
        spellCheck={false}
        value={characters}
      />
    </div>
  );
};
