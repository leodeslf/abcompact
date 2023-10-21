/// <reference types="cypress" />

import {
  generateCharAtoms,
  generateCharMolecules,
  generateCharMoleculeToCharAtomsDataMap,
  generateCharReport,
  generateCharsFromUnicodeRange,
  generateCharsFromUnicodeRanges,
  generateRequestChunks,
  generateUnicodeRangesFromChars,
  sortCharMolecules,
} from '../../src/ts/chars';

describe('Characters', () => {
  const expectedCharMolecules = [
    '!', '#', '1', '2', '3', '@', 'a', 'b', 'c', '♻', '✔', '❤', '🌍', '🌎', '🌏',
    '👩🏽‍❤️‍👩🏻', '👩🏽‍❤️‍👩🏽', '👩🏽‍❤️‍👩🏿'
  ];
  describe('Sorting', () => {
    it('sorts "character molecules"', () => {
      expect(sortCharMolecules([
        '🌎', '👩🏽‍❤️‍👩🏽', '3', 'b', '!', '✔', '👩🏽‍❤️‍👩🏿', '2', '🌏',
        '#', 'c', '♻', '👩🏽‍❤️‍👩🏻', '❤', 'a', '1', '🌍', '@',
      ]))
        .to.be.an('array')
        .that.deep.equals(expectedCharMolecules);
    });
  });
  describe('Segmentation', () => {
    const inputString = 'abc123!@#❤♻✔🌎🌍🌏👩🏽‍❤️‍👩🏻👩🏽‍❤️‍👩🏽👩🏽‍❤️‍👩🏿';
    const expectedCharAtoms = [
      '!', '#', '1', '2', '3', '@', 'a', 'b', 'c', '‍', '♻', '✔', '❤', '️', '🌍',
      '🌎', '🌏', '🏻', '🏽', '🏿', '👩'
    ];
    const expectedCharAtomToCharAtomIndexMap = {
      '1': 2, '2': 3, '3': 4, '!': 0, '#': 1, '@': 5, 'a': 6, 'b': 7, 'c': 8,
      '‍': 9, '♻': 10, '✔': 11, '❤': 12, '️': 13, '🌍': 14, '🌎': 15, '🌏': 16,
      '🏻': 17, '🏽': 18, '🏿': 19, '👩': 20
    };
    const expectedCharMoleculeToCharAtomsDataMap = {
      "1": {
        "charAtoms": ["1"],
        "charAtomIndices": [2],
        "charAtomIndicesAsString": "2"
      },
      "2": {
        "charAtoms": ["2"],
        "charAtomIndices": [3],
        "charAtomIndicesAsString": "3"
      },
      "3": {
        "charAtoms": ["3"],
        "charAtomIndices": [4],
        "charAtomIndicesAsString": "4"
      },
      "!": {
        "charAtoms": ["!"],
        "charAtomIndices": [0],
        "charAtomIndicesAsString": "0"
      },
      "#": {
        "charAtoms": ["#"],
        "charAtomIndices": [1],
        "charAtomIndicesAsString": "1"
      },
      "@": {
        "charAtoms": ["@"],
        "charAtomIndices": [5],
        "charAtomIndicesAsString": "5"
      },
      "a": {
        "charAtoms": ["a"],
        "charAtomIndices": [6],
        "charAtomIndicesAsString": "6"
      },
      "b": {
        "charAtoms": ["b"],
        "charAtomIndices": [7],
        "charAtomIndicesAsString": "7"
      },
      "c": {
        "charAtoms": ["c"],
        "charAtomIndices": [8],
        "charAtomIndicesAsString": "8"
      },
      "♻": {
        "charAtoms": ["♻"],
        "charAtomIndices": [10],
        "charAtomIndicesAsString": "10"
      },
      "✔": {
        "charAtoms": ["✔"],
        "charAtomIndices": [11],
        "charAtomIndicesAsString": "11"
      },
      "❤": {
        "charAtoms": ["❤"],
        "charAtomIndices": [12],
        "charAtomIndicesAsString": "12"
      },
      "🌍": {
        "charAtoms": ["🌍"],
        "charAtomIndices": [14],
        "charAtomIndicesAsString": "14"
      },
      "🌎": {
        "charAtoms": ["🌎"],
        "charAtomIndices": [15],
        "charAtomIndicesAsString": "15"
      },
      "🌏": {
        "charAtoms": ["🌏"],
        "charAtomIndices": [16],
        "charAtomIndicesAsString": "16"
      },
      "👩🏽‍❤️‍👩🏻": {
        "charAtoms": ["‍", "❤", "️", "🏻", "🏽", "👩"],
        "charAtomIndices": [9, 12, 13, 17, 18, 20],
        "charAtomIndicesAsString": "9,12,13,17,18,20"
      },
      "👩🏽‍❤️‍👩🏽": {
        "charAtoms": ["‍", "❤", "️", "🏽", "👩"],
        "charAtomIndices": [9, 12, 13, 18, 20],
        "charAtomIndicesAsString": "9,12,13,18,20"
      },
      "👩🏽‍❤️‍👩🏿": {
        "charAtoms": ["‍", "❤", "️", "🏽", "🏿", "👩"],
        "charAtomIndices": [9, 12, 13, 18, 19, 20],
        "charAtomIndicesAsString": "9,12,13,18,19,20"
      }
    };
    it('generates a "character atoms" list and its respective index map', () => {
      const {
        charAtoms,
        charAtomToCharAtomIndexMap
      } = generateCharAtoms(inputString);
      expect(charAtoms)
        .to.be.an('array')
        .that.deep.equals(expectedCharAtoms);
      expect(charAtomToCharAtomIndexMap)
        .to.be.an('object')
        .that.deep.equals(expectedCharAtomToCharAtomIndexMap);
    });
    it('generates a "character molecules" list', () => {
      expect(generateCharMolecules(inputString))
        .to.be.an('array')
        .that.deep.equals(expectedCharMolecules);
    });
    it('generates a "character molecule to character atoms data" map', () => {
      expect(generateCharMoleculeToCharAtomsDataMap(
        expectedCharAtomToCharAtomIndexMap,
        expectedCharMolecules
      ))
        .to.deep.equal(expectedCharMoleculeToCharAtomsDataMap);
    });
  });
  describe('Generation', () => {
    it('generates characters from a given "unicode range"', () => {
      const katakanaUnicodeRange = { start: '30A0', end: '30FF' };
      expect(generateCharsFromUnicodeRange(katakanaUnicodeRange))
        .to.equal('゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ');
    });
    it('generates characters from a given "unicode range" list', () => {
      const cyrillicUnicodeRange = { start: '400', end: '4FF' };
      const cyrillicSupplementUnicodeRange = { start: '500', end: '52F' };
      expect(generateCharsFromUnicodeRanges([
        cyrillicUnicodeRange,
        cyrillicSupplementUnicodeRange
      ]))
        .to.be.a('string')
        .that.contains('Љ')
        .and.contains('Ԉ');
    });
    it('generates a "unicode range" list from a given string', () => {
      expect(generateUnicodeRangesFromChars('𝄞𝅗𝅥𝅘𝅥𝅮𝅘𝅥𝅯𝅘𝅥𝅰𝅘𝅥𝅲𝆔𝆕'))
        .to.deep.equal([
          { start: '1d11e', end: '1d11e' }, // 𝄞...
          { start: '1d15e', end: '1d15e' }, // ...𝅗𝅥...
          { start: '1d160', end: '1d162' }, // ...𝅘𝅥𝅮𝅘𝅥𝅯𝅘𝅥𝅰...
          { start: '1d164', end: '1d164' }, // ...𝅘𝅥𝅲...
          { start: '1d194', end: '1d195' }  // ...𝆔𝆕
        ]);
    });
  });
  describe('Analysis', () => {
    it('generates a "character report"', () => {
      const {
        charMoleculesAvailable,
        charMoleculesBitmap,
        usedCssFontFaceRules
      } = generateCharReport(/* ... */);
      expect(charMoleculesAvailable);
      expect(charMoleculesBitmap);
      expect(usedCssFontFaceRules);
    });
  });
  describe('Splitting', () => {
    it('splits a given string into "request chunks"', () => {
      const {
        charChunks,
        unicodeRangeChunks
      } = generateRequestChunks(/* ... */);
      expect(charChunks);
      expect(unicodeRangeChunks);
    });
  });
});

/* 
describe('Character Coverage Bitmap', () => {
  it('identifies missing length-one Character Units', () => {
    expect(getCharacterCoverageBitmap(
      ['@', 'a', 'b'],
      ['a', 'b', 'c']
    ))
      .to.be.an('array')
      .that.deep.equals([0, 1, 1]);
  });
  it('identifies missing multi-character Character Units (emojis)', () => {
    expect(getCharacterCoverageBitmap(
      ['👩🏽‍💻', '👨🏽‍💻'],
      ['👩', '🏽', '‍', '💻']
    ))
      .to.deep.equal([1, 0]);
  });
});

describe('Available Character Units (depends on a Character Coverage)', () => {
  it('filters spected items', () => {
    expect(getAvailableCharacterUnits(['@', 'a', 'b', '👩🏽‍💻', '👨🏽‍💻'], [0, 1, 1, 1, 0]))
      .to.be.an('array')
      .that.deep.equals(['a', 'b', '👩🏽‍💻']);
  });
});

describe('Character Chunk', () => {
  const _856CharacterUnits = generateCharacterUnits(
    getCharactersFromUnicodeRanges([
      { start: '400', end: '4FF' }, // Cyrillic
      { start: '3041', end: '3096' }, // Hiragana
      { start: '3099', end: '309F' }, // Hiragana
      { start: '2F00', end: '2FD5' }, // Kangxi Radicals
      { start: '30A0', end: '30FF' }, // Katakana
      { start: '20', end: '7E' }, // Latin Basic ASCII
      { start: 'A0', end: 'FF' }, // Latin Supplement ASCII
    ]).concat('👋👋🏻👋🏼👋🏽👋🏾👋🏿') // == the waving hand and all five modifiers
  );

  it('delivers the chunks and their unicode ranges', () => {
    const characterAndUnicodeRangeChunks = getCharacterAndUnicodeRangeChunks(
      _856CharacterUnits
    );

    expect(characterAndUnicodeRangeChunks)
      .to.be.an('array')
      .that.has.lengthOf(2);
    expect(characterAndUnicodeRangeChunks[0].characters)
      .to.be.a('string')
      .that.has.lengthOf(800)
      .and.contains('👋');
    expect(characterAndUnicodeRangeChunks[1].characters)
      .to.have.lengthOf(56)
      .and.to.contain(' ');
    expect(characterAndUnicodeRangeChunks[1].unicodeRanges)
      .to.be.deep.equal({
        start: '20',
        end: (parseInt('0x20') + 55).toString(16)
      });
  });
});
*/
