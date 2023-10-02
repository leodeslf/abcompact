![Fontima's cover image.](https://raw.githubusercontent.com/leodeslf/fontima/master/assets/cover_1270x760_compressed.png "Fontima's cover image.")

# Fontima

>Optimizing Google Fonts Subsets

## About

✨ **[Fontima](https://fontima.com/) delivers fine-grained CSS for Google Fonts subsets**.

It is based on the `text` URL parameter used to *subset a font* by specifying which characters we need from it. Fontima lets you do that while optimizing the CSS on the fly producing *better, measurable results* to get: **the characters you need**; **from the families you want**; **only when required**. And it does it with just a few clicks.

## Why Fontima?

🎯 **We need to optimize fonts**.

We often say "images weight too much," so we use a battery of tools to optimize them. The problem is that **fonts are as large or even larger than images**. Fontima exists to address that issue, it can *save you up to +95% on font files* (CSS + WOFF2) and *prevent undesired, automatic downloads* by including the appropriate `unicode-range` value on each `@font-face` rule.

## How to Use Fontima?

💡 It's easy:

1. Bring the code from Google Fonts,
1. Choose the characters,
1. Get your CSS.

That's it!

## Pros and Cons of Using Fontima

✔️ Pros:

- **Download lighter files**;
- **Download fewer files** (for most cases);
- **Download fonts only when required**.

❌ Cons:

- **Some fonts can not be optimized by GF**\*;
- **Fonts may have missing glyphs** they are supposed to include;
- **Static CSS** (instead of using a static URL to get the CSS dynamically).

\*Specially the ones with *non-standard/unregistered [variable axes](https://fonts.google.com/knowledge/glossary/axis_in_variable_fonts "Axis (in variable fonts)")* and an *[optical size](https://fonts.google.com/knowledge/glossary/optical_size_axis "Optical Size axis (opsz)")* value different than `none`, cases in which Google Fonts returns the default CSS.

## Author

[Leonardo de S. Leal F.](https://github.com/leodeslf "GitHub profile")
