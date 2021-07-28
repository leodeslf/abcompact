import { defaultClient } from "./axiosClient";

/**
 * Get the font-face CSS from Google Fonts or false if it's not available.
 * @param {string} fontURI Google Fonts URI.
 * @returns The font-face CSS or false.
 */
export default async function getDefaultFontFace(fontURI) {
  return await defaultClient.get(fontURI)
    .then(res => res.data)
    .catch(() => false);
}
