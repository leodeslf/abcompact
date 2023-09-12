import {
  generateUnicodeRangesFromCss,
  getFontFaceRules
} from "./googleFontsCss";

function generateCharsFromUnicodeRange({ start, end }: UnicodeRange): string {
  let chars: string = '';
  let index: number = parseInt('0x'.concat(start));
  const lastIndex = parseInt('0x'.concat(end));

  do {
    chars = chars.concat(String.fromCodePoint(index));
  } while (++index <= lastIndex)

  return chars;
}

function generateCharsFromUnicodeRanges(unicodeRanges: UnicodeRange[]): string {
  return unicodeRanges
    .reduce((chars, unicodeRange) =>
      chars.concat(generateCharsFromUnicodeRange(unicodeRange)),
      ''
    );
}

// Control characters from (Basic) ASCII and Supplement-ASCII.
const blackListedChars = generateCharsFromUnicodeRanges([
  { start: "0", end: "1F" },
  { start: "80", end: "9F" }
]);

function getWhiteListedChars(chars: string): string {
  let whiteListedChars: string = chars;

  for (const blackListedChar of blackListedChars) {
    if (whiteListedChars.includes(blackListedChar)) {
      whiteListedChars = whiteListedChars
        .replaceAll(blackListedChar, '');
    }
  }

  return whiteListedChars;
}

/**
 * 1. Sort items by the amount of atom as an overall organization.
 * 2. Re-sort items sharing the same length from first to last atom.
 * 3. Re-sort by first atom to keep results (emojis) visually homogeneous.
 * 
 * Radix-like sorting algorithm.
 */
function sortCharMolecules(charMolecules: string[]): string[] {
  charMolecules.sort((a, b) => [...a].length - [...b].length);
  const largestRadix = charMolecules.at(-1)?.length as number;

  for (let radix = 1; radix < largestRadix; radix++) {
    charMolecules.sort((a, b) => {
      const charAtomsA = [...a];
      const charAtomsB = [...b];
      return charAtomsA.length === charAtomsB.length ?
        (charAtomsA[radix]?.codePointAt(0) || 0) -
        (charAtomsB[radix]?.codePointAt(0) || 0) :
        0;
    });
  }

  charMolecules.sort((a, b) => {
    const charAtomsA = [...a];
    const charAtomsB = [...b];
    return charAtomsA.length === charAtomsB.length ?
      (charAtomsA[0].codePointAt(0) as number) -
      (charAtomsB[0].codePointAt(0) as number) :
      0;
  });

  return charMolecules;
}

/**
 * Sorted and unique atoms, an atom can be:
 * 
 * - A single-length character or
 * - A double-length character (does not get divided by iterators).
 */
function generateCharAtoms(chars: string): {
  charAtoms: string[],
  charAtomToCharAtomIndexMap: CharAtomToCharAtomIndexMap
} {
  const charAtoms = sortCharMolecules([...new Set(chars)]);
  return {
    charAtoms,
    charAtomToCharAtomIndexMap: charAtoms
      .reduce<
        CharAtomToCharAtomIndexMap
      >((charAtomToCharAtomIndexMap, charAtom, i) => {
        charAtomToCharAtomIndexMap[charAtom] = i;
        return charAtomToCharAtomIndexMap;
      },
        {}
      )
  };
}

/**
 * Reference:
 * 
 * - https://www.unicode.org/reports/tr51/#EBNF_and_Regex
 * - https://unicode.org/reports/tr18/#Hex_notation
 * 
 * Related:
 * 
 * - https://unicode.org/Public/emoji/15.0/
 * - https://www.unicode.org/emoji/charts/
 * - https://www.unicode.org/emoji/charts/emoji-ordering.html
 * - https://www.unicode.org/emoji/charts/emoji-ordering.txt
 * - https://www.unicode.org/emoji/charts/full-emoji-list.html
 * - https://www.unicode.org/emoji/charts/full-emoji-list.txt
 */
const emojisOrAnyRegex = /(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u200D(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*)|[^]/gu;

/**
 * Sorted and unique molecules, a molecule can be:
 * 
 * - A single-length character,
 * - A double-length character (is not divided by iterators), or
 * - A multi-character sequence (is divided by iterators, e.g.: complex emoji).
 */
function generateCharMolecules(chars: string): string[] {
  return sortCharMolecules(
    [...new Set(chars.match(emojisOrAnyRegex) as string[])]
  );
}

function generateCharMoleculeToCharAtomsDataMap(
  charAtomToCharAtomIndexMap: CharAtomToCharAtomIndexMap,
  charMolecules: string[],
): CharMoleculeToCharAtomsDataMap {
  const charMoleculeToCharAtomsDataMap: CharMoleculeToCharAtomsDataMap = {};
  charMolecules.forEach(charMolecule => {
    const charAtoms = sortCharMolecules([...new Set(charMolecule)]);
    const charAtomIndices = charAtoms
      .map(charAtom => charAtomToCharAtomIndexMap[charAtom]);
    charMoleculeToCharAtomsDataMap[charMolecule] = {
      charAtoms,
      charAtomIndices,
      charAtomIndicesAsString: charAtomIndices.toString()
    }
  });
  return charMoleculeToCharAtomsDataMap;
}

function generateCharReport(
  charMolecules: string[],
  charMoleculeToCharAtomsDataMap: CharMoleculeToCharAtomsDataMap,
  defaultCss: string,
  amountOfStyles: number
): {
  charMoleculesBitmap: Bit[],
  charMoleculesAvailable: string[],
  usedCssFontFaceRules: string
} {
  const charAtomToMissingCharMoleculeIndicesMap:
    CharAtomToCharMoleculeIndicesMap = {};
  charMolecules.forEach((charMolecule, i) => {
    for (
      const charAtom of charMoleculeToCharAtomsDataMap[charMolecule].charAtoms
    ) {
      if (!charAtomToMissingCharMoleculeIndicesMap[charAtom]) {
        charAtomToMissingCharMoleculeIndicesMap[charAtom] = [i];
      } else {
        charAtomToMissingCharMoleculeIndicesMap[charAtom].push(i);
      }
    }
  });
  const fontFaceRules = getFontFaceRules(defaultCss);
  const amountOfFontFaceRules = fontFaceRules.length;
  const fontFaceRulesFirstStyle = fontFaceRules
    .slice(0, amountOfFontFaceRules / amountOfStyles);
  const amountOfFontFaceRulesPerStyle = fontFaceRulesFirstStyle.length;
  const usedFontFaceRules: string[] = [];

  // Every style includes the same characters, so loop through the 1ts one only.
  for (let i = 0; i < amountOfFontFaceRulesPerStyle; i++) {
    let fontFaceRuleIsUsed: boolean = false;
    const fontFaceRuleChars = generateCharsFromUnicodeRanges(
      generateUnicodeRangesFromCss(fontFaceRulesFirstStyle[i])
    );

    // If it has a matching character: it's a used one. Add it for every style.
    for (const fontFaceRuleChar of fontFaceRuleChars) {
      if (charAtomToMissingCharMoleculeIndicesMap[fontFaceRuleChar]) {
        charAtomToMissingCharMoleculeIndicesMap[fontFaceRuleChar] = [];

        if (!fontFaceRuleIsUsed) {
          for (let j = 0; j < amountOfStyles; j++) {
            usedFontFaceRules.push(fontFaceRules[
              i + j * amountOfFontFaceRulesPerStyle
            ]);
          }

          fontFaceRuleIsUsed = true;
        }
      }
    }
  }

  if (usedFontFaceRules.length === 0) {
    throw Error('no required character is available for this font');
  }

  const charMoleculesBitmap = Array<Bit>(charMolecules.length).fill(1);
  new Set(
    Object
      .values(charAtomToMissingCharMoleculeIndicesMap)
      .filter(missingCharMoleculeIndices => missingCharMoleculeIndices.length)
      .flat()
  ).forEach(missingCharMoleculeIndices =>
    charMoleculesBitmap[missingCharMoleculeIndices] = 0
  );
  return {
    charMoleculesBitmap,
    charMoleculesAvailable: charMolecules
      .filter((_, i) => charMoleculesBitmap[i] === 1),
    usedCssFontFaceRules: usedFontFaceRules.join('')
  };
}

/**
 * The parameter `chars` has unique and previously sorted characters.
 */
function generateUnicodeRangesFromChars(chars: string): UnicodeRange[] {
  let codePoints: number[] = [...chars]
    .map(char => char.codePointAt(0) as number);
  const singleCodePointRangeBoundaryCharacters = codePoints
    .filter((codePoint, i, array) =>
      codePoint - (array?.[i - 1] || -Infinity) > 1 &&
      (array?.[i + 1] || +Infinity) - codePoint > 1
    );
  const allCodePointRangeBoundaryCharacters = codePoints
    .filter((codePoint, i, array) =>
      codePoint - (array?.[i - 1] || -Infinity) > 1 ||
      (array?.[i + 1] || +Infinity) - codePoint > 1
    );
  const amountOfRangeBoundaries = allCodePointRangeBoundaryCharacters.length;
  const unicodeRanges: UnicodeRange[] = [];

  for (let i = 0; i < amountOfRangeBoundaries;) {
    const start = allCodePointRangeBoundaryCharacters[i].toString(16);
    let end: string;

    if (
      singleCodePointRangeBoundaryCharacters.includes(
        allCodePointRangeBoundaryCharacters[i]
      ) ||
      i + 1 === amountOfRangeBoundaries
    ) {
      end = start;
      i++;
    } else {
      end = allCodePointRangeBoundaryCharacters[i + 1].toString(16);
      i += 2;
    }

    unicodeRanges.push({ start, end });
  }

  return unicodeRanges;
}

function generateRequestChunks(
  charAtoms: string[],
  charMolecules: string[],
  charMoleculeToCharAtomsDataMap: CharMoleculeToCharAtomsDataMap
): {
  charChunks: string[],
  unicodeRangeChunks: UnicodeRange[][]
} {
  const charAtomIndicesAsStringToAssignedChunkIndexMap: {
    [charAtomIndicesAsString: string]: number
  } = {};
  const charAtomIndicesChunks: number[][] = [[]];
  let amountOfChunks: number = charAtomIndicesChunks.length;
  const amountOfCharMolecules = charMolecules.length;

  for (let i = 0; i < amountOfCharMolecules; i++) {
    const charMolecule = charMolecules[i];
    const {
      charAtomIndices,
      charAtomIndicesAsString
    } = charMoleculeToCharAtomsDataMap[charMolecule];
    let charMoleculeIsAssigned: boolean = false;
    let notAssignedCharAtomIndices: number[] = [...charAtomIndices];
    let assignableChunkIndex: number = -1;

    for (let j: number = 0; j < amountOfChunks; j++) {
      // Already assigned.
      if (charAtomIndicesAsStringToAssignedChunkIndexMap[
        charAtomIndicesAsString
      ]) {
        charMoleculeIsAssigned = true;
        break;
      }

      const charAtomIndicesChunk = charAtomIndicesChunks[j];

      // Not assigned, but chunk is full.
      if (charAtomIndicesChunk.length === 800) {
        continue;
      }

      // Check which characters are already assigned if any.
      for (const charAtomIndex of charAtomIndices) {
        if (charAtomIndicesChunk.includes(charAtomIndex)) {
          notAssignedCharAtomIndices = notAssignedCharAtomIndices
            .filter(notAssignedCharAtomIndex =>
              notAssignedCharAtomIndex !== charAtomIndex
            );
          assignableChunkIndex = j;
        }
      }

      // Not assigned characters do not fit, reset values.
      if (
        (charAtomIndicesChunk.length + notAssignedCharAtomIndices.length) > 800
      ) {
        notAssignedCharAtomIndices = [...charAtomIndices];
        assignableChunkIndex = -1;
      }

      // Assign them all to this chunk if none is assigned yet.
      if (notAssignedCharAtomIndices.length === charAtomIndices.length) {
        assignableChunkIndex = j;
      }
    }

    // Some characters need to be assigned, changes need to be made.
    if (!charMoleculeIsAssigned) {
      // Missing characters did not fit any chunk, create a new one.
      if (assignableChunkIndex === -1) {
        assignableChunkIndex =
          charAtomIndicesChunks.push([]) - 1;
        amountOfChunks++;
      }

      const charAtomIndicesChunk = charAtomIndicesChunks[assignableChunkIndex];
      charAtomIndicesChunk.push(...notAssignedCharAtomIndices);
      charAtomIndicesAsStringToAssignedChunkIndexMap[
        charAtomIndicesAsString
      ] = assignableChunkIndex;
    }
  }

  const charChunks = charAtomIndicesChunks
    .map(charAtomIndicesChunk =>
      charAtomIndicesChunk
        .sort((a, b) => a - b)
        .map(charAtomIndex => charAtoms[charAtomIndex])
        .join('')
    );
  return {
    charChunks,
    unicodeRangeChunks: charChunks.map(generateUnicodeRangesFromChars)
  };
}

export {
  generateCharAtoms,
  generateCharMolecules,
  generateCharMoleculeToCharAtomsDataMap,
  generateCharReport,
  generateCharsFromUnicodeRange,
  generateCharsFromUnicodeRanges,
  generateRequestChunks,
  generateUnicodeRangesFromChars,
  getWhiteListedChars,
  sortCharMolecules,
};
