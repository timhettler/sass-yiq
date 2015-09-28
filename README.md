# YIQ Color Contrast

A naive approach to determing whether a color is "light" or "dark" by checking the lightness value in the HSL color space. It works sometimes, but often produces color pairings that - while technically correct - just look a little "off". The reason for this is that the eye is more sensitive to changes in the orange-blue range than in the purple-green range, so the percieved lightness of a color can change depending its wavelength.

The YIQ color space is designed to take this bias into account. It weighs the different parts of the color according to their impact on our perpection of the color's brightness. By utilizing this color space when doing contrast comparison, the result is a color pairing that appears more natural.

For information on color contrast and the YIQ color space:

* [**24 Ways:** Calculating Color Contrast](http://24ways.org/2010/calculating-color-contrast/)
* [**W3C:** Ensure that foreground and background color combinations provide sufficient contrast when viewed by someone having color deficits or when viewed on a black and white screen](http://www.w3.org/TR/AERT#color-contrast)
* [**Wikipedia:** YIQ](http://en.wikipedia.org/wiki/YIQ)

## Installation options

### NPM

  ```
  npm install sass-yiq
  ```

### Bower

  ```
  bower install sass-yiq
  ```

## Usage & Configuration

  ```scss
  @import 'sass-yiq'
  ```

Details on available variables, functions, and mixins can be found in the [SassDoc documentation](http://timhettler.github.io/sass-yiq/sassdoc)

### Demo

Check out how the YIQ color contrast compares to HSL color contrast: http://timhettler.github.io/sass-yiq/demo/
