import axios from "axios";
import { defaultCssRegex, fontFaceCssRegex } from "./googleFontsCss.js";

/**
 * Equivalent regex for HTML (tested manually):
 * .*https://fonts\.googleapis\.com/css2\?(family=[+,-.:;@\dA-Za-z]+&)+display=swap.*
 */
const googleFontsUrlRegex = /.*(https:\/\/fonts\.googleapis\.com\/css2\?(family=[+,-.:;@\dA-Za-z]+&)+display=swap).*/;

// At this point, the URL was already validated, so we seal the type to string.
function getGoogleFontsUrl(googleFontsUrlInput: string): string {
  return googleFontsUrlInput.match(googleFontsUrlRegex)?.[1] as string;
}

// Each family includes the font name and its styles (if any).
function getFamilyValues(googleFontsUrl: string): string[] {
  return (googleFontsUrl
    .match(/family=[^&]+&/g) as string[])
    .map(match => match.slice(7, -1));
}

function getFontName(familyValue: string): string {
  return (
    familyValue.match(/([^:]+):?/)?.[1] as string
  ).replace(/\+/g, ' ') as string;
}

function generateGoogleFontsUrl(family: string): string {
  return `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
}

const axiosInstance = axios.create();

async function getCss(googleFontsUrl: string): Promise<string> {
  return await axiosInstance
    .get(googleFontsUrl)
    .then(({ data }) => {
      if (fontFaceCssRegex.test(data)) {
        return data;
      }

      throw null;
    })
    .catch(() => {
      throw Error('failed to fetch CSS files');
    });
}

async function getOptimizedCss(
  googleFontsUrl: string,
  characterChunks: string[]
): Promise<string> {
  let optimizedCss: string = '';

  for (const characterChunk of characterChunks) {
    const optimizedCssChunk = await getCss(
      `${googleFontsUrl}&text=${characterChunk}`
    );

    if (defaultCssRegex.test(optimizedCssChunk)) {
      throw Error('this font couldn\'t be optimized by Google Fonts');
    }

    optimizedCss += optimizedCssChunk;
  }

  return optimizedCss;
}

// Weight = content length = file size in bytes.
async function getWoff2Weight(woff2Url: string): Promise<number> {
  return await axiosInstance
    .get(woff2Url)
    .then(({ headers }) => Number(headers['content-length']))
    .catch(() => {
      throw Error('failed to fetch WOFF2 files')
    });
}

async function getTotalWoff2Weight(woff2Urls: string[]): Promise<number> {
  let totalWoff2Weight: number = 0;

  for (const woff2Url of woff2Urls) {
    totalWoff2Weight += await getWoff2Weight(woff2Url);
  }

  return totalWoff2Weight;
}

function getStyleHeaders(familyValue: string): AxisTag[] | null {
  return familyValue
    .match(/:(.+)@/)?.[1]
    .split(',') as AxisTag[] ||
    null;
}

function getStyleTuples(familyValue: string): string[][] | null {
  return familyValue
    .match(/@(.+)/)?.[1]
    .split(';')
    .map(tuple => tuple.split(','))
    || null;
}

export {
  generateGoogleFontsUrl,
  getCss,
  getFamilyValues,
  getFontName,
  getGoogleFontsUrl,
  getOptimizedCss,
  getStyleHeaders,
  getStyleTuples,
  getTotalWoff2Weight,
  getWoff2Weight,
  googleFontsUrlRegex
};
