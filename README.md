# Deglyph

>Optimize your Google Fonts requests

## About

Deglyph delivers optimized **CSS for the fonts and characters we need**, potentially **saving up to 95%** (counting both CSS and WOFF2 files). It makes use of the `text` parameter from Google Fonts URLs to subset a given font, while giving feedback about improvements and preview the results.

## How to Deglyphy?

1. Bring the Google Fonts URL (copy either the `<link>` or `@import` code);
1. Choose the characters you need;
1. Click optimize and get your CSS.

That's it!

## Why to Deglyphy?

You cannot optimize what you cannot measure.

And yes, we absolutely need to optimize fonts, they are getting **larger than images**, the amount of requests is also considerable. In bytes we can easily **save from 5 KB up to 2 MB per font** depending on the font and the characters.

## When to Deglyphy?

**Always we can**. If we can is because we know what we need.

We cannot make everyone happy by delivering fonts covering every possible character. Also, **fonts don't always look the way we expect** in different languages/scripts, that's a good reason to use Deglyph for subsetting. The most notorious use case is **when we need a font for a single word** (or even a single glyph).

## Pros and Cons of Deglyphying

✅ Pros:

- **Less bytes**;
- **Less request** (potentially);
- **Feedback** about optimization.

❌ Cons:

- **Static CSS** (updates may be required, not likely to happen);
- Possible **false positive character coverage** (see below).

Some included characters may not be true as Google Fonts uses a generic set of `unicode-ranges` on its CSS. Thus, it may "say" there is a glyph available when the font does not actually include such a glyph. Low-level font analysis is required to get rid of this issue, which Deglyph doesn't do.

## Author

[Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile").
