import { forwardRef, useState } from "react";

type CustomCharsProps = {
  isRequired: boolean;
};

const CustomChars = forwardRef<
  HTMLTextAreaElement,
  CustomCharsProps
>(({
  isRequired
},
  ref
) => {
  const [chars, setChars] = useState('');

  return (
    <div className="custom-chars__container">
      <label htmlFor="custom-chars">
        Characters
      </label>
      <textarea
        id="custom-chars"
        required={isRequired}
        onChange={({ target }) => setChars(target.value)}
        placeholder="Case sensitive..."
        ref={ref}
        spellCheck={false}
        value={chars}
      />
    </div>
  );
});

export default CustomChars;
