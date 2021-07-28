import { createContext, useContext, useState } from 'react';
import { FontFaceSetContext } from '../ABChoose';
import getCharsFromIds from '../js/chars-util/charsFromIds';
import Chars from './chars/Chars';

export const CharsContext = createContext();

export default function Input({ loading }) {
  // Invalid (or empty) input messages.
  const [invFontURLMessage, setInvFontURLMessage] = useState(false);
  const [invCharsMessage, setInvCharsMessage] = useState(false);

  // Inputs.
  const [fontURL, setFontURL] = useState('');
  const [customChars, setCustomChars] = useState('');
  const [selectedUGroupIds, setSelectedUGroupIds] = useState([]);

  // Functions to update inputs from child components.
  const updateCustomChars = chars => setCustomChars(chars);
  const updateSelectedPresetIds = (id, toAdd) => {
    setSelectedUGroupIds(
      toAdd ?
        [...selectedUGroupIds, id] :
        selectedUGroupIds.filter(oldId => oldId !== id)
    );
  }

  // Submit (to update output).
  const { updateFontFaceSet } = useContext(FontFaceSetContext);
  const submit = e => {
    e.preventDefault();

    let chars = customChars + getCharsFromIds(selectedUGroupIds);
    let isInvalid = false;

    // Custom minimum input validations.
    if (!fontURL) {
      setInvFontURLMessage('Please, complete this field.');
      isInvalid = true;
    } else if (invFontURLMessage) {
      setInvFontURLMessage(false);
    }

    if (!chars) {
      setInvCharsMessage('Please, select/type the characters you need.');
      isInvalid = true;
    } else if (invCharsMessage) {
      setInvCharsMessage(false);
    }

    if (isInvalid) return false;

    updateFontFaceSet(chars, fontURL);
  }

  return (
    <form
      className="input white-box"
      onSubmit={submit}
    >
      <label
        className="white-box__title heading"
        htmlFor="font-url"
        aria-required="true"
        aria-invalid={invFontURLMessage}
        title="URL given by Google Fonts."
      >
        Font URL
        {invFontURLMessage &&
          <span
            className="invalid-input-message"
            role="status"
          >
            {invFontURLMessage}
          </span>
        }
      </label>
      <input
        id="font-url"
        type="text"
        placeholder="https://fonts.googleapis.com..."
        value={fontURL}
        onChange={e => setFontURL(e.target.value)}
        pattern="^https://fonts.googleapis.com/.+"
      />
      <span
        className="white-box__title heading"
        aria-required="true"
        aria-invalid={invCharsMessage}
        title="Select the characters you need."
      >
        Characters
        {invCharsMessage &&
          <span
            className="invalid-input-message"
            role="status"
          >
            {invCharsMessage}
          </span>
        }
      </span>
      <CharsContext.Provider
        value={{ customChars, updateCustomChars, updateSelectedPresetIds }}
      >
        <Chars />
      </CharsContext.Provider>
      <div className={`green-btn__container${loading ? ' loading' : ''}`}>
        <input
          className="green-btn"
          type="submit"
          title="Click to get your @font-faces."
          value="Get @font-face"
        />
      </div>
    </form>
  );
}
