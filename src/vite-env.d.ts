/// <reference types='vite/client' />

type UnicodeRange = {
  start: string,
  end: string
};

type RequestMemo = {
  googleFontsUrl: string,
  characterUnits: string[]
};

type RequestStatus = {
  currentProgress: number,
  isFailed: boolean,
  isLoading: boolean,
  progressPhases: number
};

type CharacterAndUnicodeRangeChunk = {
  characters: string,
  unicodeRanges: UnicodeRange[]
};

// Registered == Standard (has a respective/equivalent CSS property).
type RegisteredAxisTag = (
  'ital' |
  'opsz' |
  'slnt' |
  'wght' |
  'wdth'
);

// Defined by Google Fonts.
type CustomAxisTag = (
  'YTAS' |
  'BNCE' |
  'CASL' |
  'XTRA' |
  'CRSV' |
  'YTDE' |
  'EHLT' |
  'ELGR' |
  'ELSH' |
  'EDPT' |
  'YTFI' |
  'FILL' |
  'FLAR' |
  'GRAD' |
  'HEXP' |
  'INFM' |
  'YTLC' |
  'MONO' |
  'MUTA' |
  'XROT' |
  'YROT' |
  'ROND' |
  'SOFT' |
  'SPAC' |
  'XOPQ' |
  'YOPQ' |
  'YTUC' |
  'WONK' |
  'YEAR'
);

type AxisTag = RegisteredAxisTag | CustomAxisTag;

type CamelCaseCssProperty = (
  'fontOpticalSizing' |
  'fontStretch' |
  'fontStyle' |
  'fontWeight'
);

// type CamelCaseCssPropertyToMatch = (
//   'fontStretch' |
//   'fontStyle' |
//   'fontWeight'
// );

// type KebabCaseCssPropertyToMatch = (
//   'font-stretch' |
//   'font-style' |
//   'font-weight'
// );

type Bit = 0 | 1;

type WeightReport = {
  default: number,
  optimized: number,
  difference: number
};

type FilesWeight = {
  css: WeightReport,
  woff2: WeightReport
};

type CssPropertyToMatch = (
  'fontStretch' |
  'fontStyle' |
  'fontWeight'
);

type CssProperties = {
  [key in CssPropertyToMatch]?: string
} & {
  fontOpticalSizing?: string,
  fontVariationSettings: string,
  unicodeRange?: string[]
};

type ChunkedCssProperties = {
  unicodeRange: string,
  url: string
};

type OptimizedFontStyle = {
  cssProperties: CssProperties,
  chunkedCssPropertiesList: ChunkedCssProperties[]
};

type OptimizedFontResults = {
  characterCoverageBitmap: Bit[],
  weightReport: FilesWeight,
  optimizedCss: string,
  styles: OptimizedFontStyle[]
};

type OptimizedFontCore = {
  id: number,
  family: string
};

type OptimizedFont = OptimizedFontCore & {
  errorMessage?: string,
  results?: OptimizedFontResults
};

type OptimizedFontWithError = OptimizedFontCore & {
  errorMessage: string,
};

type OptimizedFontWithoutError = OptimizedFontCore & {
  results: OptimizedFontResults
};

type FontWeightValues = (
  '100' |
  '200' |
  '300' |
  '400' |
  '500' |
  '600' |
  '700' |
  '800' |
  '900' |
  '1000'
);

type FontWidthValues = (
  '25%' |
  '50%' |
  '62.5%' |
  '75%' |
  '87.5%' |
  '100%' |
  '112.5%' |
  '125%' |
  '150%'
);
