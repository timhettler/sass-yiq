# YIQ Color Contrast

Most approaches to checking color contrast use the HSL color space. This often produces color pairings that - while technically correct - look just a little "off". The reason for this is that the eye is more sensitive to changes in the orange-blue range than in the purple-green range, so the percieved lightness of a color can change depending its wavelength.

The YIQ color space is designed to take this bias into account. It weighs the different parts of the color according to their impact on our perpection of the color's brightness. Color pairings appear more natural when utilizing this color space for contrast comparisons.

For information on color contrast and the YIQ color space:

- [**24 Ways:** Calculating Color Contrast](http://24ways.org/2010/calculating-color-contrast/)
- [**W3C:** Ensure that foreground and background color combinations provide sufficient contrast when viewed by someone having color deficits or when viewed on a black and white screen](http://www.w3.org/TR/AERT#color-contrast)
- [**Wikipedia:** YIQ](http://en.wikipedia.org/wiki/YIQ)

## Demo

Compare YIQ color contrast to HSL color contrast: http://timhettler.github.io/sass-yiq/demo/

## Installation

```
yarn add @timhettler/sass-yiq
```

## Usage

```scss
@use "@timhettler/sass-yiq" as yiq;

.container {
  @include yiq.contrasted(#fa5400, #000, #fff);
}
```

Details on available variables, functions, and mixins can be found in the [SassDoc documentation](http://timhettler.github.io/sass-yiq/)
