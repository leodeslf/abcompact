import trueEncoder from "../util/trueEncoder";

const fontToTest = 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'

/**
 * Check selected characters on a predefined font, to see if Google Fonts
 * returns the default font-face CSS (which contains all it's subsets).
 * 
 * The 'text' parameter can be ignored, depending on which and how many
 * characters we use (not specified), in this cases, we get the default
 * font-face CSS.
 * 
 * By default, Google Fonts returns each subset headed with it's respective
 * commented name, e.g.: /* latin *\/. Results with the 'text' parameter
 * doesn't contain any comment. So, if there is a comment, it's default.
 * @param {string} chars Characters to use.
 * @returns If test was successfully done, returns true/false,
 * if not, returns null.
 */
export default async function returnsDefault(chars) {
  return await fetch(fontToTest + '&text=' + trueEncoder(chars))
    .then(res => res.text())
    .then(text => (text.slice(0, 2) === '/*') ? true : false)
    .catch(() => null);
}
