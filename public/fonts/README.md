# Font Files

Place your Castelia Sans font files here. The layout expects these filenames:

| File | Weight | Required |
|------|--------|----------|
| `CasteliaSans-Regular.woff2` | 400 | Yes |
| `CasteliaSans-Medium.woff2` | 500 | Recommended |
| `CasteliaSans-Bold.woff2` | 700 | Yes (headings) |
| `CasteliaSans-Black.woff2` | 900 | Yes (hero/display) |

## Format Priority

Prefer `.woff2` — it's the most compressed and best supported.
If you only have `.ttf` or `.woff`, update the `src` paths in `src/app/layout.tsx`
inside the `casteliaFont` declaration accordingly.

## Where to get the font

Castelia Sans is a commercial/custom typeface. Obtain it from its original source
and drop the files here. The font is loaded locally via Next.js `next/font/local`
so it is never fetched from a third-party CDN.
