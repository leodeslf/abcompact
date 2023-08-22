import { forwardRef, useEffect, useState } from "react";
import { filterBlackListedCharacters } from "../../ts/characters";

type CustomCharactersProps = {
  isRequired: boolean;
};

const CustomCharacters = forwardRef<
  HTMLTextAreaElement,
  CustomCharactersProps
>(({
  isRequired
},
  ref
) => {
  const [characters, setCharacters] = useState('');

  return (
    <div className="custom-characters__container">
      <label htmlFor="custom-characters">
        Characters
      </label>
      <textarea
        id="custom-characters"
        required={isRequired}
        onChange={({ target }) => setCharacters(target.value)}
        placeholder="Case sensitive..."
        ref={ref}
        spellCheck={false}
        value={characters}
      />
    </div>
  );
});

export default CustomCharacters;
