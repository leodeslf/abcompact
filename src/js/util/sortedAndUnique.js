/**
 * Sort characters and avoid repeating them.
 * @param {string} string Characters.
 * @returns New array.
 */
export default function sortedAndUnique(string) {
  return [...new Set(string.split('').sort())].join('');
}
