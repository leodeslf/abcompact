import getUrlsByFamily from "./getUrlsByFamily";
import getDataAndLength from "./getDataAndLength";
import getWoff2Urls from "./getWoff2Urls";
import getIncludedAndMissingChars from "./getIncludedAndMissingChars";
import getUnicodeRangesAsIntegers from "./getUnicodeRangesAsIntegers";
import getSavedPercentage from "./getSavedPercentage";

const dataShape = {
  cssLength: 0,
  cssWoff2CombinedLength: 0,
  woff2Length: 0,
  woff2Requests: 0
}

async function* getFontFaceList(url, chars) {
  const individualUrls = getUrlsByFamily(url);

  for (let url of individualUrls) {
    const fontFace = {
      chars: {
        included: '',
        missing: ''
      },
      error: false,
      generic: { ...dataShape },
      name: url.match(/family=([+\dA-Za-z]+)(:|&)/)[1].replaceAll(/\+/g, ' '),
      specific: {
        ...dataShape,
        cssText: ''
      },
      styles: 0,
      saved: {
        cssLength: 0,
        woff2Length: 0,
        cssWoff2CombinedLength: 0,
        cssWoff2CombinedPercentage: 0,
        woff2Requests: 0,
        woff2RequestsPercentage: 0
      }
    };

    // Get the generic/default response.
    const generic = await getDataAndLength(url);
    if (!generic) {
      fontFace.error = 'network/request error';
      yield fontFace;
      continue;
    }
    fontFace.chars = getIncludedAndMissingChars(
      getUnicodeRangesAsIntegers(generic.data), chars
    );
    if (!fontFace.chars.included) {
      fontFace.error = 'no characters found';
      yield fontFace;
      continue;
    }
    fontFace.generic.cssLength = generic.length;
    const genericWoff2Urls = getWoff2Urls(generic.data);
    for (const woff2Url of genericWoff2Urls) {
      const woff2 = await getDataAndLength(woff2Url);
      if (!woff2) { // It shouldn't but it may fail.
        fontFace.error = 'network/request error';
        yield fontFace;
        break;
      }
      fontFace.generic.woff2Length += woff2.length;
      fontFace.generic.woff2Requests++;
    }
    if (fontFace.error) continue;
    fontFace.generic.cssWoff2CombinedLength = generic.length +
      fontFace.generic.woff2Length;

    // Get the specific/optimized response and compare it with the generic one.
    const specific = await getDataAndLength(
      `${url}&text=${encodeURIComponent(chars)}`
    );
    if (!specific) {
      fontFace.error = 'network/request error';
      yield fontFace;
      continue;
    }
    fontFace.styles = specific.data.match(/src: url/g).length;
    fontFace.specific.cssText = specific.data;
    fontFace.specific.cssLength = specific.length;
    const specificWoff2Urls = getWoff2Urls(specific.data);
    for (const woff2Url of specificWoff2Urls) {
      const woff2 = await getDataAndLength(woff2Url);
      if (!woff2) { // It shouldn't but it may fail.        
        fontFace.error = 'network/request error';
        yield fontFace;
        break;
      }
      fontFace.specific.woff2Length += woff2.length;
      fontFace.specific.woff2Requests++;
    }
    if (fontFace.error) continue;
    fontFace.specific.cssWoff2CombinedLength = specific.length +
      fontFace.specific.woff2Length;
    fontFace.saved.cssLength = generic.length - specific.length;
    fontFace.saved.woff2Length = fontFace.generic.woff2Length -
      fontFace.specific.woff2Length;
    fontFace.saved.cssWoff2CombinedLength = fontFace.saved.cssLength +
      fontFace.saved.woff2Length;
    fontFace.saved.cssWoff2CombinedPercentage = getSavedPercentage(
      fontFace.specific.cssWoff2CombinedLength,
      fontFace.generic.cssWoff2CombinedLength
    );
    fontFace.saved.woff2Requests = fontFace.generic.woff2Requests -
      fontFace.specific.woff2Requests;
    fontFace.saved.woff2RequestsPercentage = getSavedPercentage(
      fontFace.specific.woff2Requests, fontFace.generic.woff2Requests
    );

    yield fontFace;
  }
}

export default getFontFaceList;
