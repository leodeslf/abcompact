import {
  generateGoogleFontsUrl,
  getCss,
  getFamilyValues,
  getFontName,
  getOptimizedCss,
  getTotalWoff2Weight
} from "./googleFontsApi";
import { getFontStyles, loadFontStyles } from "./styles";
import {
  getAvailableCharacters,
  getUsedCssBlocks,
  getWoff2Urls,
  removeDuplicatedCssBlocks
} from "./googleFontsCss";
import {
  getAvailableCharacterUnits,
  getCharacterCoverageBitmap,
  getEncodedCharacterChunks
} from "./characters";
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

function errorFont(
  optimizedFontCore: OptimizedFontCore,
  errorMessage: string
): OptimizedFontWithError {
  return {
    ...optimizedFontCore,
    errorMessage
  };
}

async function getWeightData(
  defaultCss: string,
  optimizedCss: string,
  availableCharacterUnits: string[]
): Promise<[WeightReport, WeightReport]> {
  const usedCss = getUsedCssBlocks(
    defaultCss,
    [...availableCharacterUnits.join('')]
  );
  const defaultWoff2Urls = getWoff2Urls(usedCss);
  const defaultWoff2Weight = await getTotalWoff2Weight(defaultWoff2Urls);
  const optimizedWoff2Urls = getWoff2Urls(optimizedCss);
  const optimizedWoff2Weight = await getTotalWoff2Weight(optimizedWoff2Urls);

  return [
    {
      default: usedCss.length,
      optimized: optimizedCss.length,
      difference: usedCss.length - optimizedCss.length
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
  characterUnits: string[]
): AsyncGenerator<OptimizedFont, void, unknown> {
  let index: number = 0;

  for (const familyValue of familyValues) {
    const fontId = index++;
    const fontName = getFontName(familyValue);

    try {
      const googleFontsUrl = generateGoogleFontsUrl(familyValue);
      const defaultCss = await getCss(googleFontsUrl);
      const availableCharacters = getAvailableCharacters(defaultCss);
      const characterCoverageBitmap = getCharacterCoverageBitmap(
        characterUnits,
        availableCharacters
      );
      const availableCharacterUnits = getAvailableCharacterUnits(
        characterUnits,
        characterCoverageBitmap
      );
      const encodedCharacterChunks = getEncodedCharacterChunks(
        availableCharacterUnits
      );
      const optimizedCss = await getOptimizedCss(
        googleFontsUrl,
        encodedCharacterChunks
      );
      const cleanOptimizedCss = removeDuplicatedCssBlocks(optimizedCss);
      const [cssWeightData, woff2WeightData] = await getWeightData(
        defaultCss,
        cleanOptimizedCss,
        availableCharacterUnits
      );
      const fontStyles = getFontStyles(familyValue, cleanOptimizedCss);
      await loadFontStyles(fontName, fontStyles);

      yield <OptimizedFont>{
        id: fontId,
        name: fontName,
        results: {
          characterCoverageBitmap,
          filesWeight: {
            css: cssWeightData,
            woff2: woff2WeightData,
          },
          optimizedCss: cleanOptimizedCss,
          styles: fontStyles
        }
      };
    } catch (error) {
      yield errorFont(
        { id: fontId, name: fontName },
        error instanceof Error ? error.message : 'an unspected error ocurred'
      );
    }
  }
}

async function requestOptimizedFonts(
  googleFontsUrl: string,
  characterUnits: string[]
): Promise<void> {
  const familyValues = getFamilyValues(googleFontsUrl);
  const optimizedFonts = getOptimizedFonts(familyValues, characterUnits);
  let amountOfErrors: number = 0;
  store.dispatch(requestStatusInitialize(familyValues.length));
  store.dispatch(requestMemoSet({ googleFontsUrl, characterUnits }));
  store.dispatch(outputSummaryClear());
  store.dispatch(optimizedCssClear());
  store.dispatch(optimizedFontsClear());

  for await (const optimizedFont of optimizedFonts) {
    store.dispatch(optimizedFontsAdd(Object.freeze(optimizedFont)));
    store.dispatch(requestStatusUpdateProgress());

    if ("results" in optimizedFont && optimizedFont.results) {
      store.dispatch(outputSummaryAdd(optimizedFont.results.filesWeight));
      store.dispatch(optimizedCssAdd(optimizedFont.results.optimizedCss));
    } else {
      amountOfErrors++;
    }
  }

  store.dispatch(requestStatusFinish(amountOfErrors === familyValues.length));
}

export { requestOptimizedFonts };
