/**
 * Get the characters from a given unicode range.
 * @param {string} start Inclusive.
 * @param {string} end Inclusive.
 * @returns String of characters from the given range.
 */
export default function getCharsFromRange(start, end) {
  const chars = [];
  const startInt = parseInt('0x' + start, 16);
  const endInt = parseInt('0x' + end, 16);

  for (let i = startInt; i <= endInt; i++) {
    chars[i - startInt] = String.fromCharCode(i);
  }

  return chars.join('');
}
