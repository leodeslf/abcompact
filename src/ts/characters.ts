import predefinedCharacterSubsets from
  '../json/predefinedCharacterSubsets.json';

function getCharactersFromUnicodeRange({ start, end }: UnicodeRange): string {
  let characters: string = '';
  let index: number = parseInt('0x'.concat(start));
  const lastIndex = parseInt('0x'.concat(end));

  do {
    characters = characters.concat(String.fromCodePoint(index));
  } while (++index <= lastIndex)

  return characters;
}

/**
 * Similar to a bitmap, this function returns and array of 0s or 1s that
 * represent the availability of each Character Unit: if all the characters from
 * a Unit are included, it counts as included (1); if any character from
 * the Unit is missing, the Unit is missing (0).
 */
function getCharacterCoverageBitmap(
  characterUnits: string[],
  availableCharacters: string[]
): BitmapValues[] {
  const characterCoverageBitmap = characterUnits.map(characterUnit => {
    const characterUnitCharacters = [...characterUnit];

    for (const unitCharacter of characterUnitCharacters) {
      if (!availableCharacters.includes(unitCharacter)) {
        return 0;
      }
    }

    return 1;
  });

  if (!characterCoverageBitmap.includes(1)) {
    throw Error('no required character is available for this font');
  }

  return characterCoverageBitmap;
}

function getAvailableCharacterUnits(
  characterUnits: string[],
  characterCoverageBitmap: BitmapValues[]
): string[] {
  return characterUnits.filter((_, index) =>
    characterCoverageBitmap[index] === 1);
}

function getCharacterChunks(characterUnits: string[]): string[] {
  const encodedCharacterChunks: string[] = [];
  const amountOfCharacterUnits = characterUnits.length;
  let characterUnitsIndex: number = 0;

  do {
    let characterChunk: string = '';

    while (
      characterChunk.length + characterUnits[characterUnitsIndex]?.length <= 800 &&
      characterUnitsIndex < amountOfCharacterUnits
    ) {
      characterChunk = characterChunk.concat(
        characterUnits[characterUnitsIndex++]
      );
    }

    encodedCharacterChunks.push(characterChunk);
  } while (characterUnitsIndex < amountOfCharacterUnits)

  return encodedCharacterChunks;
}

function getEncodedCharacterChunks(characterUnits: string[]): string[] {
  return getCharacterChunks(characterUnits)
    .map(characterChunk => encodeURIComponent(characterChunk));
}

// Control characters from (Basic) ASCII and Supplement-ASCII.
const blackListedCharacters = getCharactersFromUnicodeRanges([
  { start: "0", end: "1F" },
  { start: "80", end: "9F" }
]);

function filterBlackListedCharacters(
  characters: string
): string {
  let whiteListedCharacters: string = characters;

  for (const blackListedCharacter of blackListedCharacters) {
    if (whiteListedCharacters.includes(blackListedCharacter)) {
      whiteListedCharacters = whiteListedCharacters
        .replaceAll(blackListedCharacter, '');
    }
  }

  return whiteListedCharacters;
}

function getCharactersFromUnicodeRanges(unicodeRanges: UnicodeRange[]): string {
  return unicodeRanges.reduce((characters, unicodeRange) =>
    characters.concat(getCharactersFromUnicodeRange(unicodeRange)),
    ''
  );
}

function characterUnitDecimalValue(characterUnit: string): number {
  return Number(
    [...characterUnit]
      .map(character => String(character.codePointAt(0)).padStart(6, '0'))
      .reverse()
      .join('')
  );
}

function sortCharacterUnits(
  characterUnitA: string,
  characterUnitB: string
): number {
  return (
    characterUnitDecimalValue(characterUnitA) -
    characterUnitDecimalValue(characterUnitB)
  );
}

/**
 * Reference:
 * 
 * - https://www.unicode.org/emoji/charts/
 * - https://www.unicode.org/emoji/charts/full-emoji-list.html
 * - https://www.unicode.org/emoji/charts/emoji-ordering.html
 * - https://www.unicode.org/reports/tr51/#EBNF_and_Regex
 * - https://unicode.org/reports/tr18/#Hex_notation
 */
const emojisRegex = /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u200D(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;

function getCharacterUnits(characters: string): string[] {
  const emojis: string[] = (characters.match(emojisRegex) || [])
    .filter(emoji => emoji.length > 1);
  let lengthOneCharacters: string = characters;

  for (const emoji of emojis) {
    lengthOneCharacters = lengthOneCharacters.replace(emoji, '');
  }

  return [...new Set(
    lengthOneCharacters
      .split('')
      .concat(emojis)
  )].sort(sortCharacterUnits);
}

function getCharacterUnitsFromInputElements(
  customCharactersElement: HTMLTextAreaElement,
  predefinedCharacterSubsetsElements: HTMLFieldSetElement
): string[] {
  const predefinedCharacterSubsetsValue = [
    ...predefinedCharacterSubsetsElements.getElementsByTagName('input')
  ]
    .filter(({ checked }) => checked)
    .map(({ value }) => getCharactersFromUnicodeRanges(
      predefinedCharacterSubsets
        .filter((subset) => subset.id === Number(value))[0].unicodeRanges
    ))
    .join('');

  return getCharacterUnits(
    filterBlackListedCharacters(customCharactersElement.value)
      .concat((predefinedCharacterSubsetsValue))
  );
}

export {
  filterBlackListedCharacters,
  getAvailableCharacterUnits,
  getCharacterChunks,
  getCharacterCoverageBitmap,
  getCharactersFromUnicodeRange,
  getCharactersFromUnicodeRanges,
  getCharacterUnits,
  getCharacterUnitsFromInputElements,
  getEncodedCharacterChunks
};
