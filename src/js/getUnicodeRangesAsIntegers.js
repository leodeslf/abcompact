function getUnicodeRangesAsIntegers(cssText) {
  const unicodeRanges = cssText.match(/U\+[\dA-F]{4}(-[\dA-F]{4}){0,1}/g);
  const unicodeRangesDividedByBounds = unicodeRanges.map(range =>
    range.match(/[\dA-F]{4}/g)
  );

  return unicodeRangesDividedByBounds.map(bounds => [
    parseInt('0x' + bounds[0]),
    parseInt('0x' + (bounds[1] ? bounds[1] : bounds[0])),
  ]);
}

export default getUnicodeRangesAsIntegers;
