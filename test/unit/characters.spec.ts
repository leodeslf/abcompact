import 'mocha';
import { expect } from 'chai';
import {
  getAvailableCharacterUnits,
  getCharacterChunks,
  getCharacterCoverageBitmap,
  getCharactersFromUnicodeRange,
  getCharactersFromUnicodeRanges,
  getCharacterUnits
} from '../../src/ts/characters.js';
import {
  emptyString,
  mixedCharacters,
  mixedCharactersAndEmojisWithVariations,
  nonLengthOneEmojis,
  lengthOneCharacters,
  lengthOneEmojis
} from '../mocks/characters.js';

/**
 * Character Unit: a single character or a single emoji.
 * 
 * From the user's point of view any input or output character, emoji or not, is
 * a single item, let's call it Character Unit. A Character Unit is the shortest
 * string a user can type or select. Thus, even when emojis have a length of two
 * (or more), they are considered a single Character Unit.
 * 
 * However, the common length of a string is still needed in some places.
 */

describe('Characters', () => {
  describe('string segmentation into Character Units', () => {
    it('segments an empty string (returns an empty array)', () => {
      expect(getCharacterUnits(emptyString))
        .to.be.an('array')
        .that.is.empty;
    });
    it('segments length-one characters', () => {
      expect(getCharacterUnits(lengthOneCharacters))
        .to.have.lengthOf(3);
    });
    it('segments length-one emojis', () => {
      expect(getCharacterUnits(lengthOneEmojis))
        .to.have.lengthOf(3);
    });
    it('segments non length-one emojis', () => {
      expect(getCharacterUnits(nonLengthOneEmojis))
        .to.have.lengthOf(3);
    });
    it('segments mixed (length-one and non length-one) characters', () => {
      expect(getCharacterUnits(mixedCharacters))
        .to.have.lengthOf(9);
    });
    it('segments, sorts, and avoids item repetition', () => {
      expect(getCharacterUnits(mixedCharactersAndEmojisWithVariations))
        .to.have.lengthOf(33)
        .and.to.deep.equal([
          '#', '$', '1', '2', '3', '@', 'a', 'b', 'c', '👨', '👩', '👫', '👬', '👭', '👨🏻', '👩🏻', '👨🏿', '👩🏿', '👨🏻‍🤝‍👨🏻', '👩🏻‍🤝‍👩🏻', '👩🏻‍🤝‍🧑🏻', '👨🏿‍🤝‍👨🏿', '👩🏿‍🤝‍👩🏿', '👩🏿‍🤝‍🧑🏿', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩', '👨🏻‍❤️‍💋‍👨🏻', '👩🏻‍❤️‍💋‍👨🏻', '👩🏻‍❤️‍💋‍👩🏻', '👨🏿‍❤️‍💋‍👨🏿', '👩🏿‍❤️‍💋‍👨🏿', '👩🏿‍❤️‍💋‍👩🏿'
        ]);
    });
  });

  describe('Characters from Unicode Ranges', () => {
    it('gets characters from a single Unicode Range', () => {
      expect(getCharactersFromUnicodeRange({ start: '30', end: '39' }))
        .to.be.a('string')
        .that.equals('0123456789');
    });
    it('gets characters from multiple Unicode Ranges', () => {
      expect(getCharactersFromUnicodeRanges([
        { start: '2460', end: '2473' },
        { start: '30A0', end: '30AF' },
        { start: '21D0', end: '21D9' }
      ]))
        .to.equal('①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳゠ァアィイゥウェエォオカガキギク⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙');
    });
  });

  describe('Character Coverage Bitmap', () => {
    it('works with length-one Character Units', () => {
      expect(getCharacterCoverageBitmap(['@', 'a', 'b'], ['a', 'b', 'c']))
        .to.be.an('array')
        .that.deep.equals([0, 1, 1]);
    });
    it('works with non length-one Character Units (emojis)', () => {
      expect(getCharacterCoverageBitmap(['👩🏽‍💻', '👨🏽‍💻'], ['👩', '🏽', '‍', '💻']))
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
    it('distributes characters through irregular chunk sizes', () => {
      // Maximum chunk size: 800 characters
      const characterChunks = getCharacterChunks([
        ...(new Array(1599)).fill('0'),
        '👩'
      ]);

      expect(characterChunks)
        .to.be.an('array')
        .that.has.lengthOf(3);
      expect(characterChunks[0])
        .to.be.a('string')
        .that.has.lengthOf(800);
      expect(characterChunks[1])
        .to.have.lengthOf(799);
      expect(characterChunks[2])
        .to.have.lengthOf(2);
    });
  });
});
