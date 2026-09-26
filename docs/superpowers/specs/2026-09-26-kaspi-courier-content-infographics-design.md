# Kaspi Courier Content, Infographics, and Footer Promo Design

## Scope

Update the existing portfolio without publishing or pushing changes. The work covers the shared Currency Converter footer promo, the Kaspi Courier project media and narrative, two courier-ecosystem infographics, and the mobile navigation backdrop.

## Currency Converter promo

Keep the existing English and German copy, dark palette, `COMING SOON` badge, non-interactive behavior, and placement on every page where the current promo appears.

Rebuild the visual structure using the supplied Hero reference as inspiration rather than copying its dependencies. The portfolio will keep its current React and CSS architecture and will not add shadcn, Radix, CVA, Lucide, or a second styling system. The promo will contain:

- a subtle grid background;
- the existing centered badge, heading, and description;
- a large lower radial accent and smooth tonal transition;
- responsive typography and spacing;
- no CTA, link, or chevron.

## Kaspi Courier cover video

The existing outer cover container and its dimensions remain unchanged. The video uses `object-fit: cover` so it fills the complete container width. Its 3:2 source composition may be cropped slightly and symmetrically at the top and bottom inside the 16:9 container. Playback, theme-specific sources, posters, and iOS-safe behavior remain intact.

## Mobile navigation backdrop

The open mobile menu uses a solid translucent overlay without blur:

- light theme: dark translucent overlay;
- dark theme: light translucent overlay.

The menu and header remain above the overlay. Page content remains visible beneath it but clearly de-emphasized.

## Kaspi Courier narrative

Rewrite the case in English and German. Do not describe the product as a redesign or compare version 1.0 with version 2.0.

### Problem

Before Kaspi Delivery existed, Kaspi depended on Glovo, Wolt, Yandex, and VanOnGo for express delivery. Kaspi subsidized delivery fees for customers, while the delivery experience, courier relationship, data exchange, transaction flow, and available delivery window remained distributed across external partners.

### Solution

Kaspi creates its own courier application and attracts couriers directly into its ecosystem. This removes the need to subsidize partner delivery, increases delivery speed, expands the express-delivery time window, creates new jobs, keeps couriers within the Kaspi ecosystem, enables fast data exchange with the main application, and simplifies transactions between couriers and the bank.

### Supporting content

Update the subtitle, introduction, goals, role, gallery headings, supporting descriptions, impact, and deeper-contact copy so they describe the new delivery product consistently. Remove all remaining references to version 1.0, version 2.0, “first release,” and “evolved version.”

### Expected outcomes

The metrics are goals, not shipped results. Labels in both languages must explicitly communicate that they are expected or target outcomes:

- 1.8 orders per hour;
- +200% courier productivity;
- -60% CPO, targeting 2,263 KZT per order.

The Impact section repeats these as projected outcomes and avoids claiming that they have already been achieved.

## Before and After infographics

Replace the two empty Solution cards with real responsive infographics inspired by the existing Kaspi Home ecosystem-map treatment.

### Before

- Kaspi.kz is the source node.
- Four branches connect it to Glovo, Wolt, Yandex, and VanOnGo.
- Use the supplied company logos as local optimized assets.
- The visual communicates a fragmented partner-delivery model.

### After

- Kaspi.kz connects directly to Kaspi Delivery.
- Use the supplied Kaspi.kz and Kaspi Delivery logos.
- The visual communicates one integrated delivery ecosystem.

Both diagrams use equal logo cards, accessible text labels, SVG connection lines, theme-aware surfaces, and lightweight reveal animation. On mobile, nodes stack vertically and remain fully visible without horizontal scrolling or cropping. Reduced-motion mode disables the line animation.

## Assets

Copy and optimize the six supplied PNG files into the project’s Kaspi Courier asset directory. Preserve recognizable brand colors and transparency. Source files in Downloads remain unchanged.

## Testing and verification

Use test-driven development:

1. Add failing source/structure tests for the new bilingual narrative, target-metric wording, real infographic nodes, video cover fit, inverted menu overlay, and updated shared promo structure.
2. Implement the minimum production changes to pass.
3. Run the full unit suite, ESLint, and production build.
4. Run local visual checks in light and dark themes at desktop and mobile widths, including video playback and infographic responsiveness.
5. Keep all changes local until the user explicitly approves a Git push.

