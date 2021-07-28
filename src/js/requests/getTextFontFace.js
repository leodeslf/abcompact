import { textClient } from "./axiosClient";

/**
 * Get the font-face CSS from Google Fonts using the 'text' parameter
 * to filter the characters and get only the ones we need.
 * @param {string} fontURI Google Fonts URI.
 * @param {string} encodedChars Encoded characters.
 * @returns The font-face CSS or an error messaje.
 */
export default async function getTextFontFace(fontURI, encodedChars) {
  return await textClient.get(`${fontURI}&text=${encodedChars}`)
    .then(res => res.data)
    .catch(() => 'Unexpected error, please try again.');
}
