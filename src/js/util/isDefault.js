/**
 * Check if the font-face is the default one.
 * @param {string} fontFace Font-face CSS.
 * @returns Returns true/false.
 */
export default function isDefault(fontFace) {
  if (!fontFace) return false;
  return (fontFace.slice(0, 2) === '/*') ? true : false; // *
}

/**
 * Check if the font-face contains all its subsets (default) or it's specific
 * for the desired characters.
 *
 * The 'text' parameter can be "ignored", depending upon which and how many
 * characters we use (not specified), getting the default font-face.
 *
 * By default, Google Fonts returns each subset headed with its respective
 * commented name, e.g.: /* latin *\/. Results with the 'text' parameter
 * doesn't contain any comment. So, if there is a comment at the start, it is a
 * default font-face CSS response.
 */
