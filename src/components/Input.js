import { useState } from 'react';
import CharPresets from './CharPresets';

export default function Input({ submitHandler }) {
  const [fontURI, setFontURI] = useState('');
  const [customCharSet, setCustomCharSet] = useState('');

  return (
    <section className="input">
      <form
        onSubmit={e => submitHandler(e, fontURI, customCharSet)}
        autoComplete="off"
      >
        <div className="font-uri">
          <h2>
            <label htmlFor="font-uri">Font URI</label>
          </h2>
          <input
            id="font-uri"
            type="text"
            placeholder="https://fonts.googleapis.com..."
            value={fontURI}
            onChange={e => setFontURI(e.target.value)}
            required={true}
            pattern="^https://fonts.googleapis.com/.+"
          />
        </div>
        <div className="custom-char-set">
          <h2>
            <label htmlFor="custom-char-set">Characters</label>
          </h2>
          <div className="width-fixer">
            <textarea
              id="custom-char-set"
              value={customCharSet}
              placeholder="All the characters that will use the font."
              onChange={e => setCustomCharSet(e.target.value)}
              rows="3"
            />
          </div>
        </div>
        <div className="char-presets">
          <h2>Presets</h2>
          <CharPresets />
        </div>
        <input type="submit" value="Generate & Copy" />
      </form>
    </section>
  );
}
