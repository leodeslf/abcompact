import 'mocha';
import { expect } from 'chai';
import {
  getAvailableCharacters,
  getUsedCssBlocks,
  getWoff2Urls
} from '../../src/ts/googleFontsCss.js';
import {
  montserratCss,
  montserratCyrillicLatinCss,
  notoColorEmojiCss,
  robotoCss,
  robotoWoff2Urls,
  robotoOneToThreeCss,
  robotoOneToThreeWoff2Urls
} from '../mocks/googleFontsCss.js';

describe('Google Fonts CSS', () => {
  describe('Available Characters', () => {
    it('gets available characters from a given CSS', () => {
      expect(getAvailableCharacters(montserratCss))
        .to.include('Ѡ')
        .and.to.include('Ʊ')
        .and.to.include('ꟿ')
        .but.not.to.include('ツ');
    });
    it('gets available characters from a given CSS including emojis', () => {
      expect(getAvailableCharacters(notoColorEmojiCss))
        .to.include('👩')
        .and.to.include('🏽')
        .and.to.include('‍')
        .and.to.include('💻');
    });
  });

  describe('Used CSS Blocks (@font-face at-rules)', () => {
    it('falis if no CSS block is used', () => {
      // Montserrat does not include japanese characters.
      expect(getUsedCssBlocks(montserratCss, ['ツ']))
        .to.be.an('string')
        .that.is.empty;
    });
    it('gets (only) used CSS blocks from', () => {
      expect(getUsedCssBlocks(montserratCss, ['0', 'Б']))
        .to.equal(montserratCyrillicLatinCss);
    });
  });

  describe('WOFF2 URL', () => {
    it('gets all WOFF2 URLs from a given CSS', () => {
      expect(getWoff2Urls(robotoCss))
        .to.be.an('array')
        .that.has.lengthOf(7)
        .and.deep.equals(robotoWoff2Urls);
    });
    it('gets all WOFF2 URLs from a given CSS for specific characters', () => {
      expect(getWoff2Urls(robotoOneToThreeCss))
        .to.deep.equal(robotoOneToThreeWoff2Urls);
    });
  });
});
