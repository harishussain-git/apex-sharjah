# Structured data implementation and validation

The SEO team's original graph is preserved by value in `content/structured-data.json`, including Unicode punctuation. `lib/structuredData.js` splits its entities by scope. A server-rendered native script component escapes `<` before serialization into HTML, following [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld).

- The root layout renders WebSite and School once, replacing the previous homepage-only WebSite schema.
- Only `/cbse-school-sharjah` renders WebPage, BreadcrumbList and FAQPage.
- Scripts belong to the root layout and matching route respectively; there are no client effects, append operations or additional client dependencies. Animation and layout components were not changed.

## Validation

Production build and ESLint on changed JavaScript/JSX files passed. `node scripts/validate-structured-data.mjs` checks actual prerendered HTML after a build: JSON parsing, exact entity content, route scope, script counts, unique entity IDs, resolved graph references and locally available URL paths. All checks passed across 15 generated HTML files. The combined target graph was also compared with the supplied attachment and matched exactly by value.

All four distinct referenced URL paths exist in this project:

- `/`: generated homepage.
- `/cbse-school-sharjah`: generated location page.
- `/home/apex-logo-big.webp`: existing public asset.
- `/img/opengraph-image.webp`: existing public asset.

Every `@id` reference resolves within the combined graph. Hash identifiers name schema entities; they do not require HTML anchor elements. Verification covers local production output, not the currently deployed domain, external rich-result eligibility, or browser navigation automation.

## Issues requiring SEO/content review

1. The location page does not display the five supplied FAQ questions and answers. The FAQPage markup therefore describes content absent from the visible page. The schema was retained as requested; visible FAQs should be added in a separately authorized UI change or the SEO team should revise the markup.
2. The location page inherits the homepage Open Graph URL from the root metadata, which disagrees with the supplied WebPage URL. Open Graph metadata was preserved. The previously inherited homepage canonical was subsequently fixed: homepage and SEO landing pages now declare their own absolute canonicals using Next.js metadata, and the root layout has no canonical default.

No missing referenced schema URL path or asset, duplicate entity, or unresolved schema relationship was found. This is structural validation, not independent verification of school history, licensing, school hours or other editorial claims.
