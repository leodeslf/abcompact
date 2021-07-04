/**
 * Get the amount of characters covered by the specified font-face
 * and get to know which of them are not covered.
 * @param {string} defaultCss Default font-face CSS from Google Fonts.
 * @param {string} chars Selected characters.
 * @returns Coverage, font-face name, and not covered characters.
 */
export default async function getFeedback(defaultCss, chars) {
  // Percentage of needed characters included by the given font-face.
  let coverage = 100;

  const fontName = defaultCss.match(/font-family: '(.*)';/)[1];

  /**
   * Find covered ranges of characters, then, match it with the selected set of
   * characters.
   */
  const notCoveredChars = getNotCoveredChars(defaultCss, chars);

  // If there are not covered characters, update coverage value.
  if (notCoveredChars.length) {
    coverage = Math.round(100 - notCoveredChars.length / chars.length * 100);
  }

  return { coverage, fontName, notCoveredChars };
}

/**
 * Check if the characters belong to any given range.
 * @param {string} defaultCss Default font-face CSS from Google Fonts.
 * @param {string} chars Selected characters.
 * @returns Uncovered characters or false.
 */
function getNotCoveredChars(defaultCss, chars) {
  const ranges = getCoveredRanges(defaultCss);
  let notCovered = '';

  // Search each character in each range.
  chars.split('').forEach(char => {
    const code = char.charCodeAt(0);
    let covered = false;

    // Check for all the available ranges.
    ranges.forEach(range => {
      // If it's in range, it's fine.
      if ((code >= range[0]) && (code <= range[1])) covered = true;
    });

    // If not covered by any range, add it to notCovered chars.
    if (!covered) notCovered += char;
  });

  return notCovered;
}

/**
 * Make an array of ranges with the pattern [number, number] from the
 * hexadecimal values of the covered ranges from the given font-face.
 * @param {string} fontFace CSS @font-face.
 * @returns Array of ranges in integer format.
 */
function getCoveredRanges(fontFace) {
  /**
   * RegEx to take the unicode ranges from the font-face. E.g.: U+0000-FFFF or
   * U+0000 (a range, or a single character).
   */
  const rangesRE = /U\+[\dA-F]{4}-[\dA-F]{4}|U\+[\dA-F]{4}/g;
  const coveredRanges = fontFace.match(rangesRE);

  // RegEx to take only the hexadecimal values (without 'U+' and '-').
  const rangesHexRE = /[\dA-F]{4}/g;
  const coveredRangesHex = coveredRanges.map(item => item.match(rangesHexRE));

  return coveredRangesHex.map(bounds => [
    parseInt('0x' + (bounds[0]), 16),
    parseInt('0x' + (bounds[1] ? bounds[1] : bounds[0]), 16)
  ]);
}
