import getSavedPercentage from "./getSavedPercentage";

const dataShape = {
  cssLength: 0,
  cssText: '',
  cssWoff2CombinedLength: 0,
  woff2Length: 0,
  woff2Requests: 0
};

function accumulateProps(source, accumulator, propsToAvoid = []) {
  for (let prop in source) {
    if (propsToAvoid.includes(prop)) continue;
    accumulator[prop] += source[prop];
  }
}

function getFontFaceListTotal(fontFaceList) {
  const fontFaceListTotal = {
    generic: { ...dataShape },
    specific: { ...dataShape },
    saved: {
      cssLength: 0,
      cssWoff2CombinedLength: 0,
      cssWoff2CombinedPercentage: 0,
      woff2Length: 0,
      woff2Requests: 0,
      woff2RequestsPercentage: 0
    }
  };

  for (const fontFace of fontFaceList) {
    const { generic, error, specific, saved } = fontFace;
    if (error) continue;

    accumulateProps(generic, fontFaceListTotal.generic, ['cssText']);
    accumulateProps(specific, fontFaceListTotal.specific);
    accumulateProps(saved, fontFaceListTotal.saved,
      ['cssWoff2CombinedPercentage', 'woff2RequestsPercentage']);
  }

  fontFaceListTotal.saved.cssWoff2CombinedPercentage = getSavedPercentage(
    fontFaceListTotal.specific.cssWoff2CombinedLength,
    fontFaceListTotal.generic.cssWoff2CombinedLength
  );
  fontFaceListTotal.saved.woff2RequestsPercentage = getSavedPercentage(
    fontFaceListTotal.specific.woff2Requests,
    fontFaceListTotal.generic.woff2Requests
  );

  return fontFaceListTotal;
}

export default getFontFaceListTotal;
