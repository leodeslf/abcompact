import getFeedback from "./feedback";
import getCss from "./css";
import getSplittedUri from "./splittedUri";
import validateGoogleFontsUri from "./validateGoogleFontsUri";

/**
 * Validate, separate URI (if needed), and get data.
 * @param {string} fontUri Google Fonts URI.
 * @param {string} chars Selected characters.
 * @returns Fonts and it's data.
 */
export default async function requestFonts(fontUri, chars) {
  // Check if the original URI is working/available.
  const fontUriIsValid = await validateGoogleFontsUri(fontUri);
  if (!fontUriIsValid) throw new Error('Bad Font URI.');

  // Check if the original URI content makes sense.
  const uris = getSplittedUri(fontUri);
  if (!uris) throw new Error('Bad Font URI.');

  const fonts = [];
  for (const uri of uris) {
    /**
     * Test uris one by one to detect errors on a multi-family URI, as Google
     * Fonts does return the available ones, but, doesn't warns when we request
     * an nonexistent 'family'.
     * 
     * At this point, the only way the URI doesn't work may be a typo on the
     * family value or the access to Google Fonts is not available.
     */
    const css = await validateGoogleFontsUri(uri);
    fonts.push(css ?
      await getValidResponse(uri, chars, css) :
      getNotValidResponse(uri)
    );
  }

  return fonts;
}

/**
 * Return the font-face CSS and any relevant feedback.
 * @param {string} fontUri Google Fonts URI.
 * @param {string} chars Selected characters.
 * @param {string} defaultFontFaceCSS Default font-face CSS from Google Fonts.
 * @returns Object for a valid response.
 */
async function getValidResponse(fontUri, chars, defaultFontFaceCSS) {
  // Final font-face CSS applying the 'text' parameter.
  const css = await getCss(fontUri, chars);

  return {
    ok: true,
    css,
    ...await getFeedback(defaultFontFaceCSS, chars)
  };
}

/**
 * Return hard-coded response and get the 'family' value from the URI.
 * @param {string} fontUri Google Fonts URI.
 * @returns Object for a not valid response.
 */
function getNotValidResponse(fontUri) {
  // Get font name from the 'family' parameter in the URI.
  const fontName = fontUri
    .match(/family=([\da-zA-Z+]+)(:|&)/)[1]
    .replaceAll(/\+/g, ' ');

  return {
    ok: false,
    fontName
  }
}
