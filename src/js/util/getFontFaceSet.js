import { baseLength, sizeSet } from '../requests/axiosClient';
import getSplittedURI from './getSplittedUri';
import getSortedSet from './getSortedSet';
import getFamilyName from './getFamilyName';
import getDefaultFontFace from '../requests/getDefaultFontFace';
import getTextFontFace from '../requests/getTextFontFace';
import getSizeOptim from './getSizeOptim';
import getCoverage from './getCoverage';
import isDefault from './isDefault';

/**
 * Validate, split URL (if needed), and get data.
 * @param {string} fontURL Google Fonts URL.
 * @param {string} chars Selected characters.
 * @returns Font-face set and its data.
 */
export default async function getFontFaceSet(fontURL, chars) {
  const originalURI = fontURL.slice(baseLength);
  const URIS = getSplittedURI(originalURI);
  if (!URIS) throw new Error('Bad Font URL.');

  const encodedChars = encodeURIComponent(getSortedSet(chars));
  const fontFaceSet = [];

  for (const URI of URIS) {
    const familyName = getFamilyName(URI);
    const defaultFontFace = await getDefaultFontFace(URI);
    let textAndFeedback;

    /**
     * Wait to get both responses "default" and "text". Get the size
     * difference in bytes, the character coverage, and the actual "text"
     * font-face.
     */
    if (defaultFontFace) {
      textAndFeedback = await getTextFontFace(URI, encodedChars)
        .then(textFontFace => {
          const i = sizeSet.findIndex(res =>
            res.id === URI.slice(0, URI.indexOf('&display=')
            ));
          return {
            textFontFace,
            sizeOptim: getSizeOptim(sizeSet[i]),
            coverage: getCoverage(defaultFontFace, chars),
          };
        });
    }

    let fontFace = { familyName };
    if (textAndFeedback) fontFace = { ...fontFace, ...textAndFeedback };
    fontFaceSet.push(fontFace);
  }
console.log(fontFaceSet)
  return {
    fontFaceSet,
    isDefault: isDefault(fontFaceSet[0].textFontFace)
  };
}

/**
 * *
 *
 * Get the font-face CSS (if any) for each individual url, as Google Fonts
 * doesn't warns at all when part of the URL is bad.
 *
 * Validating the original URL is just a filter, it does return true when at
 * least one family name is valid, even when others are not.
 *
 * For the individual URLs to be bad, there should be a typo on the family
 * name, it doesn't actually exists, or the service is not available.
 */

/**
 * Naming for font-face CSS responses:
 * - Default: the one requested without the `text` parameter.
 * - Text: the one requested with the `text` parameter.
 */
