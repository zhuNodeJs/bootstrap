---
layout: docs
title: RTL
description: Learn how to enable support for right-to-left text in Bootstrap across our layout, components, and utilities.
group: getting-started
toc: true
---

## Get familiar

We recommend getting familiar with Bootstrap first by reading through our [Getting Started Introduction page]({{< docsref "/getting-started/introduction" >}}). Once you've run through it, continue reading here for how to enable RTL.

You may also want to read up on [the RTLCSS project](https://rtlcss.com/), as it powers our approach to RTL.

## Required HTML

There are two strict requirements for enabling RTL in Bootstrap-powered pages.

1. Set `dir="rtl"` on the `<html>` element.
2. Add an appropriate `lang` attribute, like `lang="ar"`, on the `<html>` element.

From there, you'll need to include an RTL version of our CSS. For example, here's the stylesheet for our compiled and minified CSS with RTL enabled:

{{< highlight html >}}
<link rel="stylesheet" href="{{< param "cdn.css_rtl" >}}" integrity="{{< param "cdn.css_rtl_hash" >}}" crossorigin="anonymous">
{{< /highlight >}}

### Starter template

You can see the above requirements reflected in this modified RTL starter template.

{{< highlight html >}}
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{< param "cdn.css_rtl" >}}" integrity="{{< param "cdn.css_rtl_hash" >}}" crossorigin="anonymous">

    <title>مرحبا بالعالم!</title>
  </head>
  <body>
    <h1>مرحبا بالعالم!</h1>

    <!-- Optional JavaScript -->
    <!-- Popper.js first, then Bootstrap JS -->
    <script src="{{< param "cdn.popper" >}}" integrity="{{< param "cdn.popper_hash" >}}" crossorigin="anonymous"></script>
    <script src="{{< param "cdn.js" >}}" integrity="{{< param "cdn.js_hash" >}}" crossorigin="anonymous"></script>
  </body>
</html>
{{< /highlight >}}

## Customize from source

When it comes to [customization]({{< docsref "/customize/sass" >}}), the preferred way is to take advantage of variables, maps, and mixins. This approach works the same for RTL, even if it's post-processed from the compiled files, thanks to [how RTLCSS works](https://rtlcss.com/learn/getting-started/why-rtlcss/).

### Custom RTL values

Using [RTLCSS value directives](https://rtlcss.com/learn/usage-guide/value-directives/), you can make a variable output a different value for RTL. For example, to decrease the weight for `$font-weight-bold` throughout the codebase, you may use the `/*rtl: {value}*/` syntax:

{{< highlight scss >}}
$font-weight-bold: 700 #{/*rtl:600*/} !default;
{{< /highlight >}}

Which would ouput to the following for our default CSS and RTL CSS:

{{< highlight css >}}
/* bootstrap.css */
dt {
  font-weight: 700 /*rtl:600*/;
}

/* bootstrap.rtl.css */
dt {
  font-weight: 600;
}
{{< /highlight >}}

### Alternative font stack

In the case you're using a custom font, be aware that not all fonts support the non-Latin alphabet. To switch from Pan-European to Arabic family, you may need to use `/*rtl:insert: {value}*/` in your font stack to modify the names of font families.

For example, to switch from `Helvetica Neue Webfont` for LTR to `Helvetica Neue Arabic` for RTL, your CSS could look like this:

{{< highlight scss >}}
$font-family-sans-serif:
  Helvetica Neue #{"/* rtl:insert:Arabic */"},
  // Safari for macOS and iOS (San Francisco)
  -apple-system,
  // Chrome < 56 for macOS (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  Roboto,
  // Basic web fallback
  Arial,
  // Linux
  "Noto Sans",
  // Sans serif fallback
  sans-serif,
  // Emoji fonts
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
{{< /highlight >}}

## Breadcrumbs

The [breadcrumb separator]({{< docsref "/components/breadcrumb" >}}/#changing-the-separator) is the only case requiring its own brand new variable, `$breadcrumb-divider-flipped`, which defaults to `$breadcrumb-divider`.

## Additional resources

- [RTLCSS](https://rtlcss.com/)
- [RTL Styling 101](https://rtlstyling.com/posts/rtl-styling)
