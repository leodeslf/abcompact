/**
 * A reserved set of characters that may have a specific purpose in a URI,
 * and should be encoded if not intended to be used as a semantic character.
 *
 * They need to be hard-coded as encodeURI() doesn't encode them, it returns
 * the same character, e.g.: encodeURI('#') === '#' (should be '%23').
 */
const reserved = [
  '#', '$', '&', '+', ',',
  '/', ':', ';', '=', '?'
];
const reservedEncoded = [
  '%23', '%24', '%26', '%2b', '%2C',
  '%2F', '%3A', '%3B', '%3D', '%3F'
];

export default function trueEncoder(decoded) {
  const encoded = [];

  decoded.split('').sort().forEach(item => {
    // Encode from hard-coded or encodeURI().
    if (reserved.includes(item)) {
      item = reservedEncoded[reserved.indexOf(item)];
    } else {
      item = encodeURI(item);
    }

    // Avoid repeated characters.
    if (!encoded.includes(item)) {
      encoded.push(item);
    }
  });

  return encoded.join('');
}
