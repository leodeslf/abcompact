/**
 * RegEx to get all the values from different family parameters from the
 * original URI.
 */
const familiesRE = /family=[\da-zA-Z+,:;@]+&/g;

/**
 * Returns an array of URIs, one per each font family from the given URI.
 * @param {string} fontUri Google Fonts link.
 * @returns Array of URIs or false if no 'family' was found.
 */
export default function getSplittedUri(fontUri) {
  // Check if URI contains at least one family name (if not, URI is bad).
  const families = fontUri.match(familiesRE);
  if (!families) return false;

  return families.map(family =>
    'https://fonts.googleapis.com/css2?' + family + 'display=swap'
  );
}
