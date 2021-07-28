/**
 * RegEx to get all the values from different family parameters from the
 * original URI.
 */
const familiesRE = /family=[\da-zA-Z+,:;@]+&/g;

/**
 * Returns an array of URIs, one per each font family from the given URI.
 * @param {string} fontURI Google Fonts URI.
 * @returns Array of URIs.
 */
export default function getSplittedURI(fontURI) {
  // Check if URI contains at least one family name (if not, URI is bad).
  return fontURI.match(familiesRE).map(family =>
    'css2?' + family + 'display=swap'
  );
}
