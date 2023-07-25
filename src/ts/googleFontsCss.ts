import { getCharactersFromUnicodeRange } from "./characters.js";

const defaultCssRegex = /\/\* .+ \*\/\n@font-face/;
const fontFaceCssRegex = /@font-face/;

function getCssUnicodeRanges(css: string): string[] {
  return css.match(/U\+[\dA-Fa-f]{1,5}(-[\dA-Fa-f]{1,5})?/g) as string[];
}

function parseCssUnicodeRange(cssUnicodeRange: string): UnicodeRange {
  const boundaries = cssUnicodeRange.match(/[\dA-Fa-f]{1,6}/g) as string[];

  return {
    start: boundaries[0],
    end: boundaries[boundaries.length > 1 ? 1 : 0]
  };
}

function getParsedCssUnicodeRanges(css: string): UnicodeRange[] {
  return getCssUnicodeRanges(css).map(parseCssUnicodeRange);
}

function getAvailableCharacters(css: string): string[] {
  return getParsedCssUnicodeRanges(css)
    .map(getCharactersFromUnicodeRange)
    .map(charactersFromUnicodeRange => [...charactersFromUnicodeRange])
    .flat();
}

function removeDuplicatedCssBlocks(css: string): string {
  return [...new Set(
    css.match(/(\/\*.+\*\/\n)?.+ {\n([^}]+\n)+}(\n)?/g) as string[]
  )].join('');
}

function getFontFaceRules(css: string): string[] {
  return css.match(/(\/\*.+\*\/\n)?@font-face {\n([^}]+\n)+}(\n)?/g) as string[];
}

function getUsedCssBlocks(css: string, requiredCharacters: string[]): string {
  const cssFontFaceRules = getFontFaceRules(css);
  return cssFontFaceRules.filter(cssFontFaceRule => {
    const unicodeRanges = getParsedCssUnicodeRanges(cssFontFaceRule);

    // If any character of a given block is required, it's used; else it's not.
    for (const requiredCharacter of requiredCharacters) {
      const codePoint = requiredCharacter.codePointAt(0) as number;

      for (const unicodeRange of unicodeRanges) {
        if (
          codePoint >= parseInt('0x'.concat(unicodeRange.start)) &&
          codePoint <= parseInt('0x'.concat(unicodeRange.end))
        ) {
          return true;
        }
      }
    }

    return false;
  }).join('');
}

function getWoff2Urls(css: string): string[] {
  return css
    .match(/https:\/\/fonts\.gstatic\.com\/.+(\.woff2|&v=v\d+)/g) as string[];
}

export {
  defaultCssRegex,
  fontFaceCssRegex,
  getAvailableCharacters,
  getCssUnicodeRanges,
  getFontFaceRules,
  getUsedCssBlocks,
  getWoff2Urls,
  parseCssUnicodeRange,
  removeDuplicatedCssBlocks
}
