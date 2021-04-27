import { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import Output from './components/Output';
import Footer from './components/Footer';
import getFontFace from './js/getFontFace';
import $ from 'jquery';

export default function ABCompact() {
  const [fontFace, setFontFace] = useState('');

  const submit = async (e, fontURI, customCharSet) => {
    e.preventDefault();

    // Encode final set of characters and get the font-face.
    const fontFace = await getFontFace(fontURI, customCharSet);
    if (fontFace) setFontFace(fontFace);

    // Copy results to clipboard.
    $('#font-face').get(0).select();
    document.execCommand("copy");
  }

  return (
    <>
      <Header />
      <main className="ABCompact">
        <Input submitHandler={submit} />
        <Output fontFace={fontFace} />
      </main>
      <Footer />
    </>
  );
}

// Docs: https://developers.google.com/fonts/docs/getting_started#optimizing_your_font_requests
