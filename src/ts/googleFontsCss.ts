function getCssUnicodeRangeValue(css: string): string {
  return css.match(/unicode-range: (.+);/)?.[1] as string;
}

function getCssUnicodeRangeLine(css: string): string[] {
  return [...new Set(
    (css.match(/unicode-range: .+;/g) as string[]).map(getCssUnicodeRangeValue)
  )];
}

function getCssUnicodeRanges(css: string): string[] {
  return getCssUnicodeRangeLine(css)
    .map(cssUnicodeRangeLine => cssUnicodeRangeLine
      .match(/U\+[\dA-Fa-f]{1,6}(-[\dA-Fa-f]{1,6})?/g) as string[]
    )
    .flat();
}

function generateUnicodeRangeFromCss(cssUnicodeRange: string): UnicodeRange {
  const boundaries = cssUnicodeRange.match(/[\dA-Fa-f]{1,6}/g) as string[];
  return {
    start: boundaries[0],
    end: boundaries[boundaries.length > 1 ? 1 : 0]
  };
}

function generateUnicodeRangesFromCss(css: string): UnicodeRange[] {
  return getCssUnicodeRanges(css).map(generateUnicodeRangeFromCss);
}

function getFontFaceRules(css: string): string[] {
  return css.match(/(\/\*.+\*\/\n)?@font-face([^}]+\n)+}(\n)?/g) as string[];
}

function getWoff2Url(css: string): string {
  return (css.match(/https:.+(\.woff2|&v=v\d+)/) as string[])[0];
}

function getWoff2Urls(css: string): string[] {
  return (css.match(/src: url\((.+)\) format\('woff2'\);/g) as string[])
    .map(getWoff2Url);
}

function generateCssUnicodeRange(unicodeRanges: UnicodeRange[]): string {
  return unicodeRanges
    .map(({ start, end }) => `U+${start}${start === end ? '' : `-${end}`}`)
    .join(', ');
}

export {
  generateCssUnicodeRange,
  generateUnicodeRangesFromCss,
  getFontFaceRules,
  getCssUnicodeRangeValue,
  getWoff2Url,
  getWoff2Urls,
};
