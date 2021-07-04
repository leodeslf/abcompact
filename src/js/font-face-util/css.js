import sortedAndUnique from "../util/sortedAndUnique";
import trueEncoder from "../util/trueEncoder";

/**
 * Get the font-face from Google Fonts with the 'text' parameter
 * to filter the characters and get only the ones we need. Returns false
 * if request is bad or can't be done. Returs false if URI is bad.
 * @param {string} fontUri Google Fonts URI.
 * @param {string} chars Selected characters.
 * @returns The font-face CSS from Google Fonts or false.
 */
export default async function getCss(fontUri, chars) {
  return await fetch(fontUri + '&text=' + trueEncoder(sortedAndUnique(chars)))
    .then(res => res.text())
    .then(text => text)
    // At this point we don't expect any error.
    .catch(() => 'Unexpected error.');
}
