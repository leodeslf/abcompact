import { useState } from "react";

export default function GoogleFontsCode() {
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
      required={true}
      spellCheck="false"
      type="text"
      value={googleFontsCode}
    />
  </>);
};
