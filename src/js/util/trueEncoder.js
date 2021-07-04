/**
 * A reserved set of characters that may have a specific purpose in a URI,
 * and should be encoded if not intended to be used as a semantic character.
 *
 * They need to be hard-coded as encodeURI() doesn't encode them, it returns
 * the same character.
 * 
 * E.g.: encodeURI('#') === '#' (should be '%23').
 */

const reserved = [
  '#', '&', '+', ',', '/',
  ':', ';', '=', '?', '@'
];
const reservedEncoded = [
  '%23', '%26', '%2b', '%2C', '%2F',
  '%3A', '%3B', '%3D', '%3F', '%40'
];

/**
 * Encode characters, including URI's semantic ones.
 * @param {string} decoded 
 * @returns Encoded string of unique characters.
 */
export default function trueEncoder(decoded) {
  return decoded.split('').map(char => {
    if (reserved.includes(char)) {
      // Encode from hard-coded or encodeURI().
      char = reservedEncoded[reserved.indexOf(char)];
    } else {
      // Or just use the built-in encoder.
      char = encodeURI(char);
    }

    return char;
  }).join('');
}
