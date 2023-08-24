import 'mocha';
import { expect } from 'chai';
import {
  getFamilyValues,
  getFamily,
  getStyleHeaders,
  getStyleTuples,
  googleFontsUrlRegex
} from '../../src/ts/googleFontsApi.js';
import {
  montserratOpenSansRobotoGoogleFontsUrl,
  openSansRobotoStylesGoogleFontsUrl,
  robotoGoogleFontsUrl,
  robotoStylesGoogleFontsUrl,
  robotoWrappedGoogleFontsUrl
} from '../mocks/googleFontsApi.js';

describe('Google Fonts API', () => {
  describe('Google Fonts URL', () => {
    it('fails to read a GF URL from a broken link', () => {
      expect('https://fonts.googleapis.com/css2?family=Robotodisplay=swap')
        .to.not.match(googleFontsUrlRegex)
        .and.to.be.null;
    });
    it('reads a (default style) GF URL', () => {
      expect(robotoGoogleFontsUrl)
        .to.match(googleFontsUrlRegex)
        .and.to.include(robotoGoogleFontsUrl);
    });
    it('reads a GF URL containing multiple families', () => {
      expect(montserratOpenSansRobotoGoogleFontsUrl)
        .to.match(googleFontsUrlRegex)
        .and.to.include(montserratOpenSansRobotoGoogleFontsUrl);
    });
    it('reads a GF URL containing non-default styles', () => {
      expect(robotoStylesGoogleFontsUrl)
        .to.match(googleFontsUrlRegex)
        .and.to.include(robotoStylesGoogleFontsUrl);
    });
    it('reads a GF URL wrapped by irrelevant text', () => {
      expect(robotoWrappedGoogleFontsUrl)
        .to.match(googleFontsUrlRegex)
        .and.to.include(robotoGoogleFontsUrl);
    });
  });

  describe('Family values', () => {
    it('gets a list of family values from a GF URL', () => {
      expect(getFamilyValues(montserratOpenSansRobotoGoogleFontsUrl))
        .to.be.an('array')
        .that.deep.equals([
          'Montserrat',
          'Open+Sans',
          'Roboto'
        ]);
    });
    it('gets a list of family values from a GF URL including non-default styles', () => {
      expect(getFamilyValues(openSansRobotoStylesGoogleFontsUrl))
        .that.deep.equals([
          'Open+Sans',
          'Roboto:ital,wght@0,500;1,400'
        ]);
    });
  });

  describe('Font names', () => {
    it('gets the font name from a family value', () => {
      expect(getFamily('Roboto+Mono:ital,wght@0,500;1,400'))
        .to.equal('Roboto Mono');
    });
  });

  describe('Axis tags', () => {
    it('Fails to get style headers when asking for a default family value', () => {
      expect(getStyleHeaders('Roboto'))
        .to.be.null;
    });
    it('gets style headers when the family value includes any style(s)', () => {
      expect(getStyleHeaders('Roboto:ital,wght@0,500;1,400'))
        .to.be.an('array')
        .that.deep.equals(['ital', 'wght']);
    });
    // This should actually not happen at runtime:
    it('Fails to get style tuples when asking for a default family value', () => {
      expect(getStyleTuples('Roboto'))
        .to.be.null;
    });
    it('gets a list of tuples when the family value includes any style(s)', () => {
      expect(getStyleTuples('Roboto:ital,wght@0,500;1,400'))
        .to.be.an('array')
        .that.deep.equals([['0', '500'], ['1', '400']]);
    });
  });
});
