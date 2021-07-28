/**
 * Get the characters sorted and not duplicated in a new string.
 * @param {string} string Characters.
 * @returns New string.
 */
export default function getSortedSet(string) {
  return [...new Set(string.split('').sort())].join('');
}
