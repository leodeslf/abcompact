function getCssTextStyles(cssText) {
  return cssText.match(/@font-face([^}])+}/gm);
}

export default getCssTextStyles;
