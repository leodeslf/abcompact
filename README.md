# Fontima

>Optimize your Google Fonts requests

## About

[Fontima](https://fontima.com/) delivers **fine-grained CSS for the fonts and characters you need**. It is possible to **save up to 90%** on request (for both CSS and WOFF2 files) and to avoid unnecessary, automatic font downloads with just a few clicks.

## Why Use Fontima?

>If you can not measure it, you can not improve it. -Lord Kelvin

We often *attack* images with a battery of optimization tools, what we don't realize is that fonts are as large or even larger than images. Fontima *requests font subsets* and *optimizes those requests* on the fly. It gives you *useful feedback* such as **how much you saved**, missing character warnings, font previews, and of course the optimized CSS.

## When to Use Fontima?

Use it as long as you **have a clear idea of what the characters wearing a given font will be**. Some examples would be: a web/app logo; a set of math symbols; or even a set of languages (in case the web/app is not intended to be worldwide used e.g.: a local web or a private business app).

## How to Use Fontima?

1. Bring the code given by Google Fonts;
1. Choose the characters you need;
1. Get your optimized CSS.

That's it!

## Pros and Cons of Using Fontima

✔️ Pros:

- Download **lighter files**,
- Download **fewer files** (for most cases),
- Download **only required glyphs when they're required**.

❌ Cons:

- **Some fonts can not be optimized by GF**\*,
- **Fonts may have missing glyphs** they are supposed to include,
- **Static CSS** instead of a static URL for dynamic CSS.

\*Specially the ones with *non-standard/unregistered [variable axes](https://fonts.google.com/knowledge/glossary/axis_in_variable_fonts "Axis (in variable fonts)")* and an *[optical size](https://fonts.google.com/knowledge/glossary/optical_size_axis "Optical Size axis (opsz)")* value different than `none`, cases in which Google Fonts will return the default CSS.

## Author

[Leonardo de S. Leal F.](https://github.com/leodeslf "GitHub profile")
