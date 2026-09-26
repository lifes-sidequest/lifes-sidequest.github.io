# Portfolio Mobile, Video, and Kaspi Courier Design Specification

## Goal

Resolve the current video, mobile navigation, loader, For Agents, footer promo, and Kaspi Courier case issues without changing the established visual composition of the portfolio.

## Global constraints

- Preserve every existing outer media-container size and composition.
- Preserve autoplay and looping for project videos.
- Use `#f2f2f2` for light media surfaces and `#262626` for dark media surfaces.
- Inspect locally in a lightweight production preview before any Git publication.
- Do not push or publish until the user gives a separate explicit approval.
- Retain original video assets; derived assets may be added only when CSS/runtime fixes cannot preserve playback and composition.
- English and German content must remain equivalent.

## Video system

The shared viewport-video component will own playback readiness, poster visibility, theme surface, and iOS-compatible attributes. A media-fit option may be used where a project needs full composition rather than cover cropping. The outer card and case media boxes remain unchanged.

All video placements are in scope: home project cards, Projects catalog, Kaspi Home case, Car Parts case, Kaspi Courier case, and Next project cards. Posters and videos must not expose a black browser default surface while loading or on mobile.

Kaspi Courier media remains fully visible inside its existing containers. Theme-colored padding is acceptable inside the unchanged outer container when necessary to preserve the complete frame.

## Mobile behavior

- The three Variations cards stack as one card per row.
- The fixed bottom page gradient is disabled on mobile/iOS.
- The open mobile menu receives a fixed, solid translucent, theme-aware backdrop without blur.
- The CV control expands into the remaining width of the mobile controls row.

## For Agents and loader

For Agents route detection ignores trailing slashes and stores a safe return path. Toggling the control on the For Agents page returns to the recorded previous page, with `/` as fallback.

The custom cursor renders above the loader while the loader is visible. No other loader visual or timing behavior changes in this scope.

## Currency Converter promo

The existing black `What I do` footer placeholder becomes a non-interactive Currency Converter promo, not a new section. It uses the reference composition: subtle grid, lower glow, centered `COMING SOON` pill without an icon, large centered heading, supporting text, and no button.

English copy:

- Heading: `Convert currencies without losing the moment`
- Body: `A focused mobile experience for quick, clear currency conversion wherever you are.`

German copy:

- Heading: `Währungen umrechnen, ohne den Moment zu verlieren`
- Body: `Eine fokussierte mobile Anwendung für schnelle und verständliche Währungsumrechnung – überall.`

The shared promo replaces `What I do` wherever that footer card currently appears.

## Kaspi Courier case content

The current section and placeholder structure stays in place. English and German copy will describe:

- Version 1.0: courier authorization, availability, automatic task assignment, pickup and delivery flows, built-in navigation, radius validation, recipient code verification, and completion/error states.
- Version 2.0: self-registration and onboarding, multi-order offers, accept/decline decisions, dynamic routing, clearer communication, support, service standards, and operational transparency.
- Verified outcomes only: `1.8 orders/hour (+200%)` and `CPO 2,263 KZT/order (-60%)`.

No unsupported metrics, responsibilities, or business outcomes may be invented.

## Verification

- Static unit/markup tests cover route normalization, video attributes and fit, localized promo copy, mobile-menu structure, and Kaspi Courier metrics/copy.
- Production build must pass.
- Local production preview is opened only for bounded visual QA, covering desktop light/dark and mobile light/dark.
- Git publication happens only after the user reviews that local result and explicitly approves it.
