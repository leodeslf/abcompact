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
    it('generates a "character molecule to character atom" indices map', () => {
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
      expect(generateCharReport());
    });
  });
  describe('Splitting', () => {
    it('splits a given string into several string chunks', () => {
      expect(generateRequestChunks());
    });
  });
});
