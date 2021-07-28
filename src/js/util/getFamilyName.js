/**
 * Get the family name from the given URI.
 * @param {string} fontURI Google Fonts URI.
 * @returns {string} Family name.
 */
export default function getFamilyName(fontURI) {
  return fontURI.match(/family=([\da-zA-Z+]+)(:|&)/)[1].replaceAll(/\+/g, ' ');
}