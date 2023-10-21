import 'mocha';
import { expect } from 'chai';
import {
  // loadFontStyles,
  getDefaultStyle,
  getNonDefaultStyles,
  getStyleMatchingCssFontFaceRules,
  parseStyleHeadersAndTuple
} from '../../src/ts/styles.js';
import {
  loraItalicSemiBoldWoff2Urls,
  loraRegularNormalAndItalicSemiBoldCss,
  loraRegularNormalWoff2Urls,
  robotoCss,
  robotoFlexRegularAndSemiBoldCss,
  robotoFlexRegularWoff2Urls,
  robotoFlexSemiBoldWoff2Urls,
  robotoNonDefaultStylesOneToThreeCss,
  robotoOneToThreeItalic500Woff2Urls,
  robotoWoff2Urls,
} from '../mocks/googleFontsCss.js';

describe('Styles', () => {
  describe('Parse Style Headers and Style Tuple', () => {
    it('parses a tuple and its respective headers into a style object', () => {
      expect(parseStyleHeadersAndTuple(
        ['ital', 'opsz', 'wdth', 'wght'],
        ['1', '8...144', '120', '800']
      ))
        .to.deep.equal({
          fontOpticalSizing: 'auto',
          fontStretch: '120%',
          fontStyle: 'italic',
          fontVariationSettings: '"ital" 1, "opsz" auto, "wdth" 120, "wght" 800',
          fontWeight: '800',
        });
      expect(parseStyleHeadersAndTuple(
        ['slnt', 'wght', 'wdth'],
        ['-5', '200', '90']
      ))
        .to.deep.equal({
          fontStretch: '90%',
          fontStyle: 'oblique 5deg',
          fontVariationSettings: '"slnt" -5, "wght" 200, "wdth" 90',
          fontWeight: '200',
        });
    });
  });

  describe('(Style) Matching WOFF2 URLs', () => {
    it('gets only WOFF2 URLs that correspond to the given style object', () => {
      expect(getStyleMatchingCssFontFaceRules(
        robotoNonDefaultStylesOneToThreeCss,
        {
          fontStyle: 'italic',
          fontWeight: '500',
          fontVariationSettings: '"ital" 1, "wght" 500'
        }
      ))
        .to.be.an('array')
        .that.contains(`@font-face {
font-family: 'Roboto';
font-style: italic;
font-weight: 500;
font-display: swap;
src: url(https://fonts.gstatic.com/l/font?kit=KFOjCnqEu92Fr1Mu51S7ABc4GMLDp7s&skey=c985e17098069ce0&v=v30) format('woff2');
`);
    });
  });

  describe('Default Style', () => {
    it('produces a style object for default styles (font-weight = 400, font-style = normal)', () => {
      expect(getDefaultStyle(
        robotoCss,
        []
      ))
        .to.deep.equal({
          cssProperties: { fontVariationSettings: '' },
          chunkedCssPropertiesList: [{
            unicodeRange: '',
            urls: robotoWoff2Urls
          }]
        });
    });
  });

  describe('Non-Default Styles', () => {
    it('produces a style object for a non-default (and/or multiple) styles', () => {
      expect(getNonDefaultStyles(
        loraRegularNormalAndItalicSemiBoldCss,
        [],
        ['ital', 'wght'],
        [
          ['0', '400'],
          ['1', '600'],
        ]
      ))
        .to.deep.contain([
          {
            cssProperties: {
              fontStyle: 'normal',
              fontVariationSettings: '"ital" 0, "wght" 400',
              fontWeight: '400'
            },
            urls: loraRegularNormalWoff2Urls
          },
          {
            cssProperties: {
              fontStyle: 'italic',
              fontVariationSettings: '"ital" 1, "wght" 600',
              fontWeight: '600'
            },
            urls: loraItalicSemiBoldWoff2Urls
          }
        ]);
    });
    it('produces a style object for a non-default (and/or multiple) styles including font-optical-size', () => {
      expect(getNonDefaultStyles(
        robotoFlexRegularAndSemiBoldCss,
        [],
        ['opsz', 'wght'],
        [
          ['8..144', '400'],
          ['8..144', '600'],
        ]
      ))
        .to.deep.contain([
          {
            cssProperties: {
              fontOpticalSizing: 'auto',
              fontVariationSettings: '"opsz" auto, "wght" 400',
              fontWeight: '400'
            },
            urls: robotoFlexRegularWoff2Urls
          },
          {
            cssProperties: {
              fontOpticalSizing: 'auto',
              fontVariationSettings: '"opsz" auto, "wght" 600',
              fontWeight: '600'
            },
            urls: robotoFlexSemiBoldWoff2Urls
          }
        ]);
    });
  });

  // ! Mocha can not run this because it does not recognizes `FontFace` :(
  // describe('Loads a style to the DOM', () => {
  //   it('loads a style to the DOM', async () => {
  //     expect(await loadFontStyles(
  //       'Roboto',
  //       [
  //         {
  //           cssProperties: { fontVariationSettings: '' },
  //           urls: robotoWoff2Urls
  //         }
  //       ]
  //     ))
  //       .to.not.throw;
  //   });
  // });
});
