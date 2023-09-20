import { getStyleHeaders, getStyleTuples } from "./googleFontsApi";
import {
  generateCssUnicodeRange,
  getFontFaceRules,
  getWoff2Url
} from "./googleFontsCss";
import { familyPrefix } from "./gui";

function generateDefaultStyle(
  optimizedCss: string,
  unicodeRangeChunks: UnicodeRange[][]
): OptimizedFontStyle {
  return {
    cssProperties: {
      fontVariationSettings: ''
    },
    chunkedCssPropertiesList: getFontFaceRules(optimizedCss)
      .map((cssFontFaceRule, i) => ({
        unicodeRange: generateCssUnicodeRange(unicodeRangeChunks[i]),
        url: getWoff2Url(cssFontFaceRule)
      }))
  };
}

const styleHeaderToCssProperty = {
  ital: 'fontStyle',
  opsz: 'fontOpticalSizing',
  slnt: 'fontStyle',
  wdth: 'fontStretch',
  wght: 'fontWeight'
} as { [key in RegisteredAxisTag]: CamelCaseCssProperty };

function isRegisteredAxisTag(axisTag: string): axisTag is RegisteredAxisTag {
  return axisTag in styleHeaderToCssProperty;
}

const styleTupleValueToCssValue = {
  ital: (value: string): string => value === '0' ? 'normal' : 'italic',
  opsz: (): string => 'auto',
  slnt: (value: string): string =>
    value === '0' ? 'normal' : `oblique ${-Number(value)}deg`,
  wdth: (value: string): string => value.concat('%'),
  wght: (value: string): string => value
};

// Parse into CSS properties (from headers) and values (from tuple).
function generateCssProperties(
  styleHeaders: AxisTag[],
  styleTuple: string[]
): CssProperties {
  const fontVariationSettings = [];
  const cssProperties = <CssProperties>{
    fontVariationSettings: ''
  };

  for (let i = 0; i < styleHeaders.length; i++) {
    const styleHeader = styleHeaders[i];
    const styleTupleValue = styleTuple[i];

    fontVariationSettings.push(
      `"${styleHeader}" ${styleHeader === 'opsz' ? 'auto' : styleTupleValue}`
    );

    if (isRegisteredAxisTag(styleHeader)) {
      cssProperties[styleHeaderToCssProperty[styleHeader]] =
        styleTupleValueToCssValue[styleHeader](styleTupleValue);
    }
  }

  cssProperties.fontVariationSettings = fontVariationSettings.join(', ');

  return cssProperties;
}

const camelCaseCssPropertyToKebabCaseCssProperty: {
  [key in CssPropertyToMatch]: string;
} = {
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontWeight: 'font-weight'
};

function getStyleMatchingFontFaceRules(
  optimizedCss: string,
  cssProperties: CssProperties
): string[] {
  return getFontFaceRules(optimizedCss)
    .filter(fontFaceRule => {
      for (const cssProperty in camelCaseCssPropertyToKebabCaseCssProperty) {
        const cssPropertyValue = cssProperties?.[
          cssProperty as CssPropertyToMatch
        ];

        if (cssPropertyValue === undefined) {
          continue;
        }

        const fontFaceRuleValue = fontFaceRule
          .match(`${camelCaseCssPropertyToKebabCaseCssProperty?.[
            cssProperty as CssPropertyToMatch
          ]}: (.+);`)?.[1];

        if (fontFaceRuleValue !== cssPropertyValue) {
          return false;
        }
      }

      return true;
    });
}

function generateNonDefaultStyles(
  optimizedCss: string,
  unicodeRangeChunks: UnicodeRange[][],
  styleHeaders: AxisTag[],
  styleTuples: string[][]
): OptimizedFontStyle[] {
  return styleTuples
    .map(styleTuple => {
      const cssProperties = generateCssProperties(styleHeaders, styleTuple);
      const styleMatchingFontFaceRules = getStyleMatchingFontFaceRules(
        optimizedCss,
        cssProperties
      );
      return {
        cssProperties,
        chunkedCssPropertiesList: styleMatchingFontFaceRules
          .map<ChunkedCssProperties>((styleMatchingFontFaceRule, i) => ({
            unicodeRange: generateCssUnicodeRange(unicodeRangeChunks[i]),
            url: getWoff2Url(styleMatchingFontFaceRule)
          }))
      };
    });
}

function getStyles(
  familyValue: string,
  optimizedCss: string,
  unicodeRangeChunks: UnicodeRange[][]
): OptimizedFontStyle[] {
  const styleHeaders = getStyleHeaders(familyValue);

  if (styleHeaders === null) {
    return [generateDefaultStyle(optimizedCss, unicodeRangeChunks)];
  }

  return generateNonDefaultStyles(
    optimizedCss,
    unicodeRangeChunks,
    styleHeaders,
    getStyleTuples(familyValue) as string[][]
  );
}

/**
 * Firefox needs quotes to be passed manually in order to work. Chrome does not
 * need them, in fact, additional quotes become part of the actual family name.
 * 
 * Agent|Input Name|Actual Name|E.g. from CSS
 * --:|:-:|:-:|:-:
 * Firefox|"Foo Bar"|Error|n/a
 * Firefox|"\\"Foo Bar\\""|Foo Bar|"Foo Bar"
 * |||
 * Chrome |"Foo Bar"|Foo Bar|"Foo Bar"
 * Chrome |"\\"Foo Bar\\""|"Foo Bar"|"\\"Foo Bar\\""
 */
const familyWrapper = /gecko\//.test(navigator.userAgent.toLowerCase()) ?
  '"' :
  '';

/**
 * Reference:
 * 
 * - https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
 * - https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API
 * - https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet
 * - https://developer.mozilla.org/en-US/docs/Web/API/FontFace
 * - https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face
 */
async function loadStyles(
  family: string,
  styles: OptimizedFontStyle[]
): Promise<void> {
  for (const style of styles) {
    for (const chunkedCssPropertiesItem of style.chunkedCssPropertiesList) {
      const fontFace = new FontFace(
        `${familyWrapper}${familyPrefix}${family}${familyWrapper}`,
        `url(${chunkedCssPropertiesItem.url})`,
        {
          display: "swap",
          style: style.cssProperties?.fontStyle,
          weight: style.cssProperties?.fontWeight,
          stretch: style.cssProperties?.fontStretch,
          unicodeRange: chunkedCssPropertiesItem.unicodeRange
        }
      );

      try {
        await fontFace.load();
        document.fonts.add(fontFace);
      } catch (error) {
        throw Error('a Google Fonts\' WOFF2 file seems to be corrupted');
      }
    }
  }
}

const styleHeaderToReadableName = {
  ital: 'Style',
  opsz: 'Optical Size',
  slnt: 'Style',
  wght: 'Weight',
  wdth: 'Width',
  YTAS: 'Ascender Height',
  BNCE: 'Bounce',
  CASL: 'Casual',
  XTRA: 'Counter Width',
  CRSV: 'Cursive',
  YTDE: 'Descender Depth',
  EHLT: 'Edge Highlight',
  ELGR: 'Element Grid',
  ELSH: 'Element Shape',
  EDPT: 'Extrusion Depth',
  YTFI: 'Figure Height',
  FILL: 'Fill',
  FLAR: 'Flair',
  GRAD: 'Grade',
  HEXP: 'Hyper Expansion',
  INFM: 'Informality',
  YTLC: 'Lowercase Height',
  MONO: 'Monospace',
  MUTA: 'Mutation',
  XROT: 'Rotation in X',
  YROT: 'Rotation in Y',
  ROND: 'Roundness',
  SOFT: 'Softness',
  SPAC: 'Spacing',
  XOPQ: 'Thick Stroke',
  YOPQ: 'Thin Stroke',
  YTUC: 'Uppercase Height',
  WONK: 'Wonky',
  YEAR: 'Year'
};

const weightToWeightName = {
  '100': 'Thin',
  '200': 'ExtraLight',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'ExtraBold',
  '900': 'Black',
  '1000': 'ExtraBlack'
};

const widthToWidthName = {
  '25%': 'SuperCondensed',
  '50%': 'UltraCondensed',
  '62.5%': 'ExtraCondensed',
  '75%': 'Condensed',
  '87.5%': 'SemiCondensed',
  '100%': 'Normal',
  '112.5%': 'SemiExpanded',
  '125%': 'Expanded',
  '150%': 'ExtraExpanded'
};

export {
  generateCssProperties,
  generateDefaultStyle,
  generateNonDefaultStyles,
  getStyleMatchingFontFaceRules,
  getStyles,
  loadStyles,
  styleHeaderToReadableName,
  styleTupleValueToCssValue,
  weightToWeightName,
  widthToWidthName,
};
