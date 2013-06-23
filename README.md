rework-shades
================

lighten and darken function for the [Rework]() CSS preprocessing library.

### Usage

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

The amount you put, is the percentage of white(255) that you want to decrease by. An easy way to think about it is, "I am going to lighten/darken this color by *X* precentage of 255(white)".

Here is the math if I wanted to *decrease* a color by 10%:

```javascript
Math.round(2.55 * -10); // yields -25
```

Then you take that result and subtract it from the R, G, and B colors. I have compared this to Stylus and the results are the same:


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