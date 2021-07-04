/**
 * Test a given Google Fonts URI to see if it's fine.
 * @param {string} uri Google Fonts URI to test.
 * @returns Text value (CSS) from the given URI, false if not available.
 */
export default async function validateGoogleFontsUri(uri) {
  return await fetch(uri)
    .then(res => res.text())
    .then(text => text)
    .catch(() => false);
}