# ABChoose

[![Netlify Status](https://api.netlify.com/api/v1/badges/cf03fa1a-0cb2-4c92-a163-20c07ce40fc0/deploy-status)](https://app.netlify.com/sites/abchoose/deploys)

Save on Google Fonts' requests by getting only what you need.

## About

A tool to reduce the weight and potentially the duration of request from Google Fonts, by asking for a specific set of characters instead of getting the entire font-face with hundreds or even thousands of unused characters.

Ref. at Google Fonts docs. [Optimizing your font requests](https://developers.google.com/fonts/docs/getting_started#optimizing_your_font_requests).

<!-- 
## Features

Let the user select:

- Predefined sets of characters.
- Ranges of characters.
- Or, a custom set of characters.

Given a `<link>`/`@import` provided by Google Fonts (or the relevant part of it, the fonts' url):

- Identify all the individual font names.
- For each font name, return:
  - The CSS optimization in bytes and %.
  - The optimized CSS.
  - The `@font-face` optimization in bytes and %.
  - Not included characters (if any).
  - Warn if it was not found.
  - Warn if no needed characters are included.
- Warn if Google Fonts returns the default CSS.
 -->

## Author

[Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile").

## License

MIT License.
