import { useState } from "react";

export default function GoogleFontsUrl() {
  const [googleFontsUrl, setGoogleFontsUrl] = useState('');

  return (<>
    <label htmlFor="google-fonts-url">
      Google Fonts URL
    </label>
    <input
      autoComplete="on"
      autoFocus={true}
      id="google-fonts-url"
      onChange={({ target }) => setGoogleFontsUrl(target.value)}
      pattern=".*https://fonts\.googleapis\.com/css2\?(family=[+,-.:;@\dA-Za-z]+&)+display=swap.*"
      placeholder="https://fonts.googleapis.com..."
      required={true}
      spellCheck="false"
      type="text"
      value={googleFontsUrl}
    />
  </>);
};
