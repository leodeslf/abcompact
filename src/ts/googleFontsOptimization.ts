import {
  generateGoogleFontsUrl,
  generateOptimizedCss,
  getCss,
  getFamily,
  getFamilyValues,
  getTotalWoff2Weight,
} from "./googleFontsApi";
import { getStyles, loadStyles } from "./styles";
import { getWoff2Urls } from "./googleFontsCss";
import {
  generateCharAtoms,
  generateCharMolecules,
  generateCharMoleculeToCharAtomsDataMap,
  generateCharReport,
  generateCharsFromUnicodeRanges,
  generateRequestChunks,
  getWhiteListedChars,
} from "./chars";
import store from "../stores/store";
import {
  requestStatusFinish,
  requestStatusInitialize,
  requestStatusUpdateProgress
} from "../stores/requestStatusSlice";
import { requestMemoSet } from "../stores/requestMemoSlice";
import {
  optimizedFontsAdd,
  optimizedFontsClear
} from "../stores/optimizedFontsSlice";
import {
  optimizedCssAdd,
  optimizedCssClear
} from "../stores/optimizedCssSlice";
import {
  outputSummaryAdd,
  outputSummaryClear
} from "../stores/outputSummarySlice";

async function getWeightReport(
  defaultCss: string,
  optimizedCss: string,
  defaultCssInUse: string
): Promise<[css: WeightReport, woff2: WeightReport]> {
  const defaultWoff2Urls = getWoff2Urls(defaultCssInUse);
  const defaultWoff2Weight = await getTotalWoff2Weight(defaultWoff2Urls);
  const optimizedWoff2Urls = getWoff2Urls(optimizedCss);
  const optimizedWoff2Weight = await getTotalWoff2Weight(optimizedWoff2Urls);

  return [
    {
      default: defaultCss.length,
      optimized: optimizedCss.length,
      difference: defaultCss.length - optimizedCss.length
    },
    {
      default: defaultWoff2Weight,
      optimized: optimizedWoff2Weight,
      difference: defaultWoff2Weight - optimizedWoff2Weight
    }
  ];
}

async function* getOptimizedFonts(
  familyValues: string[],
  charAtoms: string[],
  charMolecules: string[],
  charMoleculeToCharAtomsDataMap: CharMoleculeToCharAtomsDataMap
): AsyncGenerator<OptimizedFont, void, unknown> {
  let index: number = 0;

  for (const familyValue of familyValues) {
    const id = index++;
    const family = getFamily(familyValue);

    try {
      if (charMolecules.length === 0) {
        throw Error('no printing characters were specified');
      }

      const googleFontsUrl = generateGoogleFontsUrl(familyValue);
      const defaultCss = await getCss(googleFontsUrl);
      const {
        charMoleculesBitmap,
        charMoleculesAvailable,
        usedCssFontFaceRules
      } = generateCharReport(
        charMolecules,
        charMoleculeToCharAtomsDataMap,
        defaultCss,
        (familyValue.match(/@(.*)+/)?.[1] || '').split(';').length
      );
      const { charChunks, unicodeRangeChunks } = generateRequestChunks(
        charAtoms,
        charMoleculesAvailable,
        charMoleculeToCharAtomsDataMap,
      );
      const optimizedCss = await generateOptimizedCss(
        googleFontsUrl,
        charChunks,
        unicodeRangeChunks
      );
      const styles = getStyles(familyValue, optimizedCss, unicodeRangeChunks);
      await loadStyles(family, styles);
      const [cssWeightReport, woff2WeightReport] = await getWeightReport(
        defaultCss,
        optimizedCss,
        usedCssFontFaceRules
      );
      yield <OptimizedFontWithoutError>{
        id,
        family,
        results: {
          charMoleculesBitmap,
          weightReport: {
            css: cssWeightReport,
            woff2: woff2WeightReport,
          },
          optimizedCss: optimizedCss,
          styles
        }
      };
    } catch (error) {
      console.error(error);
      yield <OptimizedFontWithError>{
        id,
        family,
        errorMessage: error instanceof Error ?
          error.message :
          'an unexpected error occurred'
      };
    }
  }
}

async function requestOptimizedFonts(
  googleFontsUrl: string,
  inputChars: string,
  inputUnicodeRanges: UnicodeRange[]
): Promise<void> {
  const familyValues = getFamilyValues(googleFontsUrl);
  const allInputChars = getWhiteListedChars(inputChars)
    .concat(generateCharsFromUnicodeRanges(inputUnicodeRanges));
  const {
    charAtoms,
    charAtomToCharAtomIndexMap
  } = generateCharAtoms(allInputChars);
  const charMolecules = generateCharMolecules(allInputChars);
  const charMoleculeToCharAtomsDataMap = generateCharMoleculeToCharAtomsDataMap(
    charAtomToCharAtomIndexMap,
    charMolecules
  );
  const optimizedFonts = getOptimizedFonts(
    familyValues,
    charAtoms,
    charMolecules,
    charMoleculeToCharAtomsDataMap
  );
  store.dispatch(requestStatusInitialize(familyValues.length));
  store.dispatch(requestMemoSet({ googleFontsUrl, charMolecules }));
  store.dispatch(outputSummaryClear());
  store.dispatch(optimizedCssClear());
  store.dispatch(optimizedFontsClear());
  let amountOfErrors: number = 0;

  for await (const optimizedFont of optimizedFonts) {
    store.dispatch(optimizedFontsAdd(Object.freeze(optimizedFont)));
    store.dispatch(requestStatusUpdateProgress());

    if ('results' in optimizedFont && optimizedFont.results) {
      store.dispatch(outputSummaryAdd(optimizedFont.results.weightReport));
      store.dispatch(optimizedCssAdd(optimizedFont.results.optimizedCss));
    } else {
      amountOfErrors++;
    }
  }

  store.dispatch(requestStatusFinish(amountOfErrors === familyValues.length));
}

export { requestOptimizedFonts };
