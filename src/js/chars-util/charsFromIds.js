import U_GROUPS_DATA from '../../json/charsData.json';
import U_GROUPS_RANGES from '../../json/charsUnicodeRanges.json';
import getCharsFromRange from './charsFromUnicodeRange';

const allGroups = [];
U_GROUPS_DATA.forEach(({ groups }) =>
  allGroups.push(...groups.map(item => item))
);
U_GROUPS_RANGES.forEach(({ groups }) =>
  allGroups.push(...groups.map(item => item))
);

/**
 * Identify and get the characters from the given IDs.
 * @param {string[]} ids Array of IDs.
 * @returns String of characters.
 */
export default function getCharsFromIds(ids) {
  let chars = '';

  ids.forEach(id => {
    const group = allGroups.find(group => group.id === id);
    if (group.data) {
      chars += group.data;
    } else {
      chars += getCharsFromRange(group.range[0], group.range[1])
    }
  });

  return chars;
}
