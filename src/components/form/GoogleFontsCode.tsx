import { forwardRef, useState } from "react";

const GoogleFontsCode = forwardRef<HTMLInputElement, {}>((_, ref) => {
  const [googleFontsCode, setGoogleFontsCode] = useState('');

  return (<>
    <label htmlFor="google-fonts-code">
      Google Fonts Code
    </label>
    <input
      autoComplete="on"
      autoFocus={true}
      id="google-fonts-code"
      onChange={({ target }) => setGoogleFontsCode(target.value)}
      pattern=".*https://fonts\.googleapis\.com/css2\?(family=[+,-.:;@\dA-Za-z]+&)+display=swap.*"
      placeholder="https://fonts.googleapis.com..."
      ref={ref}
      required={true}
      spellCheck="false"
      type="text"
      value={googleFontsCode}
    />
  </>);
});

export default GoogleFontsCode;
