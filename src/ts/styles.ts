import { getStyleHeaders, getStyleTuples } from "./googleFontsApi.js";
import { getFontFaceRules, getWoff2Urls } from "./googleFontsCss.js";
import { familyPrefix } from "./gui.js";

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

function defaultStyle(optimizedCss: string): OptimizedFontStyle {
  return {
    cssProperties: { fontVariationSettings: '' },
    urls: getWoff2Urls(optimizedCss)
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
function parseStyleHeadersAndTuple(
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
      `"${styleHeader}" ${styleHeader === 'opsz' ? '30' : styleTupleValue}`
    );

    if (isRegisteredAxisTag(styleHeader)) {
      cssProperties[styleHeaderToCssProperty[styleHeader]] =
        styleTupleValueToCssValue[styleHeader](styleTupleValue);
    }
  }

  cssProperties.fontVariationSettings = fontVariationSettings.join(', ');

  return cssProperties;
}

const camelCaseCssPropertyToKebabCaseCssProperty = {
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontWeight: 'font-weight'
} as { [key in CamelCaseCssPropertyToMatch]: KebabCaseCssPropertyToMatch };

function isCamelCaseCssPropertyToMatch(
  camelCaseCssProperty: string
): camelCaseCssProperty is CamelCaseCssPropertyToMatch {
  return camelCaseCssProperty in camelCaseCssPropertyToKebabCaseCssProperty;
}

function getMatchingWoff2Urls(
  optimizedCss: string,
  cssProperties: CssProperties
): string[] {
  const fontFaceRules = getFontFaceRules(optimizedCss);
  const matchingWoff2Urls: string[] = [];

  for (const fontFaceRule of fontFaceRules) {
    let amountOfMatchedValues: number = 0;

    for (const cssProperty in cssProperties) {
      // Omit for irrelevant properties (optical sizing & variation settings).
      if (!isCamelCaseCssPropertyToMatch(cssProperty)) {
        amountOfMatchedValues++;
        continue;
      }

      const cssValue = fontFaceRule
        .match(
          `${camelCaseCssPropertyToKebabCaseCssProperty[cssProperty]
          }: ([^;]+);`)
        ?.[1];

      if (cssValue === cssProperties[cssProperty]) {
        amountOfMatchedValues++;
      }
    }

    if (Object.entries(cssProperties).length === amountOfMatchedValues) {
      matchingWoff2Urls.push(...getWoff2Urls(fontFaceRule));
    }
  }

  return matchingWoff2Urls;
}

function nonDefaultStyles(
  optimizedCss: string,
  styleHeaders: AxisTag[],
  styleTuples: string[][]
): OptimizedFontStyle[] {
  const fontStyles: OptimizedFontStyle[] = [];

  for (const styleTuple of styleTuples) {
    const cssProperties = parseStyleHeadersAndTuple(styleHeaders, styleTuple);
    fontStyles.push({
      cssProperties,
      urls: getMatchingWoff2Urls(optimizedCss, cssProperties)
    });
  }

  return fontStyles;
}

function getFontStyles(
  familyValue: string,
  optimizedCss: string
): OptimizedFontStyle[] {
  const styleHeaders = getStyleHeaders(familyValue);

  // Single, default style.
  if (styleHeaders === null) {
    return [defaultStyle(optimizedCss)];
  }

  // Possibly multiple, non-default style(s).
  return nonDefaultStyles(
    optimizedCss,
    styleHeaders,
    getStyleTuples(familyValue) as string[][]
  );
}

/**
 * Firefox needs quotes to be passed manually; Chrome adds them automatically.
 * 
 * Firefox e.g.: 'Foo Bar' --> "Foo Bar"
 * Chrome e.g.: 'Foo Bar' --> '"Foo Bar"'
 */
let familyWrapper: string = '';
if (navigator.userAgent.toLowerCase().indexOf('gecko/') > -1) {
  familyWrapper = '"';
}

/**
 * Reference:
 * 
 * - https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
 * - https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API
 * - https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet
 * - https://developer.mozilla.org/en-US/docs/Web/API/FontFace
 * - https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face
 */
async function loadFontStyles(
  family: string,
  fontStyles: OptimizedFontStyle[]
): Promise<true | void> {
  for (const fontStyle of fontStyles) {
    for (const url of fontStyle.urls) {
      // Font name is changed in order to avoid any override.
      const fontFace = new FontFace(
        `${familyWrapper}${familyPrefix}${family}${familyWrapper}`,
        `url(${url})`,
        {
          display: "swap",
          style: fontStyle.cssProperties.fontStyle,
          weight: fontStyle.cssProperties.fontWeight,
          stretch: fontStyle.cssProperties.fontStretch,
        }
      );

      try {
        await fontFace.load();
        document.fonts.add(fontFace);
      } catch (error) {
        throw Error('failed to load styles');
      }
    }
  }
}

export {
  defaultStyle,
  getFontStyles,
  getMatchingWoff2Urls,
  loadFontStyles,
  nonDefaultStyles,
  parseStyleHeadersAndTuple,
  styleHeaderToReadableName,
  styleTupleValueToCssValue,
  weightToWeightName,
  widthToWidthName
};
