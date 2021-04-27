import $ from 'jquery';
import CHAR_PRESETS from './charPresets';
import trueEncoder from './trueEncoder';

export default async function getFontFace(fontURI, customChars) {
  const checkedPresets = $('input[name="char-preset"]:checked');

  // If there is something to use:
  if (checkedPresets.length || customChars.length) {
    // All the chars. to encode, starting by the custom
    // ones through all the selected presets.
    let decoded = customChars;
    checkedPresets.each((_, element) => {
      // Values correspond to the index in CHAR_SETS.
      decoded += CHAR_PRESETS[element.value].items;
    });

    const fontFaceURI = fontURI + '&text=' + trueEncoder(decoded);

    // Return font-face style-sheet or false.
    return await fetch(fontFaceURI)
      .then(res => res.text())
      .then(text => text)
      .catch(err => {
        console.error('Error getting the font-face:' + err);
        alert('Sorry, something went wrong while getting the font-face from Google Fonts at ' + fontFaceURI + '.');
        return false;
      });
  } else {
    alert('Please, select at least one preset of characters or use the Characters field to define a custom one.');
  }
}
