/**
 * Check if the characters belong to any given range.
 * @param {number[][]} coveredRanges Ranges covered by the font-face.
 * @param {string} chars Selected characters.
 * @returns Not covered characters.
 */
function getNotCoveredChars(coveredRanges, chars) {
  let notCovered = '';

  // Search each character in each range.
  chars.split('').forEach(char => {
    const code = char.charCodeAt(0);
    let covered = false;

    // Check for all the available covered ranges.
    coveredRanges.forEach(range => {
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
 * @param {string} defaultFontFace Default font-face CSS.
 * @returns Array of ranges in integer format.
 */
function getCoveredRanges(defaultFontFace) {
  /**
   * RegEx to take the unicode ranges from the font-face. E.g.: U+0000-FFFF or
   * U+0000 (a range, or a single character).
   */
  const rangesRE = /U\+[\dA-F]{4}-[\dA-F]{4}|U\+[\dA-F]{4}/g;
  const coveredRanges = defaultFontFace.match(rangesRE);

  // RegEx to take only the hexadecimal values (without 'U+' and '-').
  const rangesHexRE = /[\dA-F]{4}/g;
  const coveredRangesHex = coveredRanges.map(item => item.match(rangesHexRE));

  return coveredRangesHex.map(bounds => [
    parseInt('0x' + (bounds[0]), 16),
    parseInt('0x' + (bounds[1] ? bounds[1] : bounds[0]), 16)
  ]);
}

/**
 * Calculate the percentage of required characters covered by the given
 * font-face CSS. Get to know which of these characters are not covered. Also
 * get the font-family name.
 * @param {string} defaultFontFace Default font-face CSS.
 * @param {string} chars Selected characters.
 * @returns Amount of needed characters, amount of not covered characters,
 * percentage of needed characters covered by the font-face, and the not
 * covered characters (if any).
 */
export default function getCoverage(defaultFontFace, chars) {
  // Percentage of needed characters included by the given font-face.
  let percentage = 100;

  // Match the selected characters with the covered range of characters.
  const notCoveredChars = getNotCoveredChars(
    getCoveredRanges(defaultFontFace), chars
  );

  // If there are not covered characters, update coverage value.
  if (notCoveredChars.length)
    percentage = (
      100 - notCoveredChars.length / chars.length * 100
    ).toFixed(0);

  return {
    neededCharsCount: chars.length,
    notCoveredCharsCount: notCoveredChars.length,
    notCoveredChars,
    percentage,
  };
}
