# BOBA SQUARE — website

An interactive, single-page website for **BOBA SQUARE**, the bubble tea brand from Bhopal. *'Cause one is not enough.*

Plain HTML/CSS/JS with no build step. Open `index.html`, or host the folder on any static host (GitHub Pages, Netlify, Vercel).

## What's on the page

- **Hero:** brand logo, tagline and a "Find the Outlet" call to action.
- **Menu:** tabs for Boba Shakes, Soda Boba, Signature Specials (Oreo, KitKat, Biscoff) and Premix Picks. Tap a drink to see its recommended popping boba pairing.
- **Build your cup:** pick a style, flavour, boba and sweetness, and an animated cup updates as you go. Recommended pairings are starred. The result is an order card that visitors can save and show at the counter, or share.
- **Boba Match quiz:** three taps to find your drink, then jump straight to building it or getting directions.
- **Boba 101:** flip cards explaining chewing and popping boba, plus the BOBA SQUARE promise.
- **Visit:** address, directions link, an embedded map, a "Tell a friend" WhatsApp share, and the visitor's saved order.

## Set the outlet details

Edit the `OUTLET` object at the top of `script.js`:

```js
const OUTLET = {
  address: "Bhopal, Madhya Pradesh",
  mapsQuery: "BOBA SQUARE Bhopal",   // or "23.2599,77.4126"
  phone: null,                       // "+91..." shows a Call button
  instagram: null,                   // URL shows an Instagram button
  hours: null,                       // { 0: ["12:00","23:00"], ... } shows hours + a live Open/Closed badge
};
```

Any field left as `null` is hidden.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | Brand theme (purple, yellow, pink, Poppins) and layout |
| `script.js` | Menu data, cup builder, quiz, visit section |
| `assets/logo.png` | BOBA SQUARE logo |
