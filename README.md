![Fontima's cover image.](https://drive.google.com/file/d/1ohpdVBh_vnWDPboGl5i6kfO6NC5OXl51/view?usp=drive_link "Fontma's cover image.")

# Fontima

>Optimize your Google Fonts requests

## About

**[Fontima](https://fontima.com/) delivers fine-grained font CSS**.

It is based on the `text` URL parameter from Google Fonts, the one we use to *subset a font* by specifying which characters (actually glyphs) we need from it. Fontima lets you do that with just a couple of clicks while optimizing the CSS on the fly, producing *better, measurable results* to **get the characters you need from the families you want when they are required**.

## Why Fontima?

**Fonts need to be optimized**.

We often say "images weight too much," so we use a battery of tools to optimize them. The problem is that **fonts are as large or even larger than images**. Fontima exists to address that issue, it can *save you up to +95% on font files* (CSS + WOFF2) and *prevent undesired, automatic downloads* by including the appropriate `unicode-range` value on each `@font-face` rule.

## How to Use Fontima?

1. Bring the code given by Google Fonts,
1. Choose the characters you need,
1. Click Optimize to get your CSS.

That's it!

## Do I Need Fontima?

Prerequisite: **have a clear idea of what the characters wearing a given font family will be**.

It could be used for a web logo; a set of math symbols; a set of languages for any web/app that is not intended to be worldwide used (e.g.: a local web or a private business app); a single character, etc.

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
