rework-shade
================

Lighten and darken function for the [Rework](https://github.com/visionmedia/rework) CSS preprocessing library.

This plugin is meant to share both the syntax and results of the stylus version. You can use `shade({color}, +/-{amount})` or the stylus syntax of `lighten|darken({color}, {amount}%)`.

### Usage

Install the package via NPM.

```shell
npm install rework-shade
```

```css
body {
  padding: 10px;
  background: shade(rgba(0, 0, 0, 0.5), 5);
}

/* using points */
.stuff {
  color: shade(rgb(0, 200, 50), 1.3);
}

.bright {
  background: shade(#004080, 30);
}

.dark {
  background: shade(#fff, -50);
}
```

yields:

```css
body {
  padding: 10px;
  background: rgba(13, 13, 13, 0.5);
}

.stuff {
  color: rgb(3, 203, 53);
}

.bright {
  background: rgb(77, 141, 205);
}

.dark {
  background: rgb(128, 128, 128);
}
```

### Amount explained

The amount you put, is the percentage of lightness that you want to increase or
decrease the color by. We use HSL and adjust the lightness. The math used is identical to how Stylus handles it.


```css
/* stylus in */
body {
  color: lighten(rgb(0,0,0), 10%);
}
```

```css
/* stylus out */
body {
  color: #1a1a1a; // or rgb(26,26,26)
}
```

```css
/* rework-shades in */
body {
  color: shade(rgb(0,0,0), 10);
}
```

yields:

```css
/* rework-shades out */
body {
  color: rgb(26, 26, 26);
}
```

### rework-vars support

Just make sure you run/use rework-vars before shades:

```css
:root {
  var-linkColor: #cccccc;
}

body {
  color: shade(var(linkColor), -10);
  background: shade(rgba(0, 0, 0, 0.5), 10);
}
```

```css
:root {
  var-linkColor: #cccccc;
}

body {
  color: rgb(179, 179, 179);
  background: rgba(26, 26, 26, 0.5);
}
```
