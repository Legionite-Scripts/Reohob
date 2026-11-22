---
name: Reohob
description: Lagos tropical modernism for a solar installer. White reading ground, warm concrete bands, deep tropical green, a marigold sun for the one main action.
colors:
  ink: "#14261d"
  ink-2: "#3f5248"
  ink-3: "#56665d"
  night: "#1c3b2e"
  night-2: "#24493a"
  night-rule: "#3b6150"
  moon: "#d3e2d8"
  leaf: "#2f6b4f"
  sun: "#f5a300"
  sun-hover: "#ffb31f"
  sun-soft: "#fff0c7"
  sun-deep: "#8a5400"
  flare: "#b4532f"
  paper: "#ffffff"
  chart: "#ece9e3"
  chart-deep: "#e2ded5"
  grid: "#dbd6cc"
  rule: "#7d786d"
  ok: "#1d6b45"
  ok-wash: "#eff7f1"
  error: "#b3261e"
  error-wash: "#fff5f3"
typography:
  display:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  chapter:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.015em"
  block:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  figure:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Public Sans, Public Sans Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.09em"
  button:
    fontFamily: "Jost, Jost Fallback, Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter-sm: "1rem"
  gutter-md: "1.5rem"
  gutter-lg: "2.5rem"
  band-sm: "4rem"
  band-lg: "6rem"
  container: "84rem"
components:
  button-sun:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    height: "48px"
  button-sun-hover:
    backgroundColor: "{colors.sun-hover}"
    textColor: "{colors.ink}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-night-outline:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    height: "48px"
  button-night-outline-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px"
  input-error:
    backgroundColor: "{colors.error-wash}"
    textColor: "{colors.ink}"
  concrete-band:
    backgroundColor: "{colors.chart}"
    textColor: "{colors.ink}"
    padding: "64px 0"
  close-band:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    padding: "96px 0"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
---

# Design System: Reohob

## Overview

**Creative North Star: "Lagos Tropical Modernism"**

Reohob borrows the language of Lagos's 1960s and 70s tropical modernism, architecture built to manage the sun, for a company that manages the sun. The page is a white reading ground cut into full-width warm concrete bands and divided by hairline rules. Deep tropical green is held back for the one solid band that closes every long page and for the footer. Marigold appears only where the visitor is meant to act, or where something is currently selected.

Type is calm. Jost, a geometric modernist sans, carries every heading at medium weights (500 to 600); Public Sans carries the reading text with tabular figures, so numbers line up in the spec rows, tables and figure strips that give the site its technical credibility. Each page opens on one decisive photograph in a clean, square crop, without a frame, pattern, caption or on-page credit. The live sun-path chart over Lagos stays small and honest inside a concrete band.

The system replaces an earlier cold "chart-paper" world, and the breeze-block screen pattern was removed by client decision; neither belongs in new work. Some class and token names (`chart`, `chart-field`, `chart-label`, `night`, `flare`, `moon`) are carried over from that first build so components stay stable. Read them by role: chart is concrete, night is tropical green, flare is laterite, and moon is text on green.

**Key Characteristics:**
- White ground, warm concrete bands, hairline rules between rows. No boxed cards.
- Solid tropical green only in the closing conversion band and the footer.
- Marigold only for the main action and active states.
- Jost 500 to 600 for display, never heavier in headings; Public Sans body with tabular figures.
- Square corners everywhere. The only round shapes are small dots and markers.
- One photograph per page, a clean Pexels crop, credits kept in `src/content/photos.ts`.

## Colors

A warm, architectural palette: concrete and white for ground, green-black for ink, one deep green and one marigold used sparingly, and laterite as a small accent.

### Primary
- **Deep Tropical Green** (night): the solid ground of the closing conversion band and the footer, nowhere else. Its family serves surfaces on the green: **Raised Green** (night-2) for raised panels and the hover state of the ink button, **Green Rule** (night-rule) for dividers on green, and **Pale Leaf** (moon) for secondary text on green (9.1:1).
- **Leaf Green** (leaf): links in long-form text (6.3:1 on white).

### Secondary
- **Marigold Sun** (sun): the fill of the main action ("Get a Quote", "Register now", the training Paystack pay button, the header and mobile-bar quote buttons) and of active states: current nav underline (3px), the current section-nav item, focus outline, text selection. It is never used as text on white. **Bright Marigold** (sun-hover) is its hover state only.
- **Marigold Wash** (sun-soft) and **Burnt Marigold** (sun-deep): the sun family for washes and text (sun-deep reaches 6.3:1 on white).

### Tertiary
- **Laterite Clay** (flare): small accents only. It is used for long-form list bullets, the dashed panel-output curve in the sun chart, the daytime state of the Lagos-time dot, and the form caret. Use it as text only at 18px or larger on concrete.

### Neutral
- **Green-Black Ink** (ink): primary text (15.9:1 on white, 13.1:1 on concrete), the dark button fill, the 2px structural rules that head sequences and charts.
- **Moss Grey** (ink-2): secondary text and ledes (8.4:1 on white).
- **Lichen Grey** (ink-3): captions, hints, quiet labels (6.1:1 on white).
- **White** (paper): the reading ground and header.
- **Warm Concrete** (chart): full-width bands: page headers, figure strips, the sun-chart band, row hover.
- **Deep Concrete** (chart-deep): concrete one step darker, for hover and inset.
- **Hairline** (grid): 1px dividers between rows, bands and columns.
- **Control Outline** (rule): form-field borders and the sun-range track (4.4:1 on white).
- **Status**: ok and ok-wash for success; error and error-wash for invalid fields and error messages.

### Named Rules
**The One Green Band Rule.** Solid tropical green fills only the closing band (CloseBand) and the footer. Any other green surface spends the page's one conversion moment.

**The Marigold Means Act Rule.** Marigold fills the main action and marks the active state, and nothing else. A secondary action is the ink, outline or ghost button. The sun chart is the only exception: it uses marigold as data (sun hours, the time cursor), because there the colour stands for the sun itself.

## Typography

**Display Font:** Jost (self-hosted variable, with the metric-matched Jost Fallback on Arial, then Public Sans)
**Body Font:** Public Sans (self-hosted variable, with Public Sans Fallback)

**Character:** Jost gives a geometric modernist voice at medium weight that is warm rather than loud. Public Sans is a plain civic text face. Tabular figures are on site-wide.

### Hierarchy
- **Display** (500, clamp(2.6rem, 5.4vw, 4.75rem), 1.02): the home hero promise only.
- **Headline** (500, clamp(2.25rem, 4.6vw, 4rem), 1.06): the inner-page H1 in PageHeader, max 18ch.
- **Chapter** (500, clamp(1.9rem, 3.6vw, 3rem), 1.08): long-page chapters and the green-band statement, max 20ch.
- **Title** (500, clamp(1.75rem, 3vw, 2.5rem), 1.1): section H2s via SectionTitle, with an optional large lede beneath.
- **Subtitle** (600, clamp(1.375rem, 2.2vw, 1.75rem), 1.18): sub-sections and long-form H2.
- **Block** (600, 1.375rem, 1.2): H3 block titles in lists and sequences.
- **Figure** (600, clamp(1.5rem, 2.6vw, 2.25rem)): values in the concrete figures strip.
- **Body** (400, 1.0625rem, 1.65): reading text, ledes at text-lg to text-xl in ink-2, long-form capped at 68ch.
- **Label** (500, 0.8125rem, 0.09em, uppercase, Jost): units, spec lines, table heads, chart axes, footer column heads.

### Named Rules
**The Calm Voice Rule.** Headings use Jost 500 for the large steps and 600 for the small steps. Every heading uses one of the named steps (page, chapter, section, sub, block) so pages cannot drift.

**The Label Is Data Rule.** The uppercase label names data: a unit, a spec, an axis or a column. It never sits above a heading as an eyebrow.

## Layout

Content sits in one container (max 84rem) with side gutters of 1rem, 1.5rem from 40rem, and 2.5rem from 64rem. Pages are a vertical stack of full-width bands that alternate white and concrete, separated by 1px hairlines. Band padding is 4rem on phones and 5 to 6rem from the sm breakpoint. Two-column splits open at 64rem (hero 1.1fr/1fr, sun band 0.9fr/1.1fr, close band 1.3fr/1fr).

Lists are ruled, not gridded into cards. The services index is a stack of rows between hairlines that tint to concrete on hover. Sequences such as How it works sit under a 2px ink rule with ring markers on the line and columns divided by hairlines. Figures form a ruled data row.

The inner-page PageHeader is a concrete band. With a photograph, the text takes the left half and the photo fills the right half from the band's top to its bottom edge and out to the viewport edge (min height 36rem). On phones the photo runs full width below the text. On the home hero the photo sits in the grid at 4:5 (5:6 at desktop).

The header is sticky (4.5rem) and becomes the compact menu below a 62rem container width. Long pages add a sticky section nav: a left-ruled vertical list at desktop and a horizontal scroller on phones. Phones also get a fixed bottom action bar (WhatsApp, Call, Get a Quote).

## Elevation & Depth

The system is flat. Depth comes from tone (white against concrete against green) and from rules (1px hairlines, 2px ink heads), not from shadows. The only shadows in the build are on floating utility overlays (the chat slot and the consent notice), as a soft ink-tinted blur (`0 8px 24px` at about 20% ink), and they are not a surface vocabulary.

### Named Rules
**The Bands Not Boxes Rule.** Group content with a concrete band or a ruled row, not with a bordered or shadowed card.

## Shapes

Every corner is square: buttons, fields, photos, bands and the focus ring all have a 0 radius. The only round forms are small markers: list bullets, the Lagos-time dot, step rings on a sequence rule, the active dot in the section nav and mobile menu, the WhatsApp badge, and the sun-disc range thumb. Photographs are clipped to fixed ratios (4:3 default, 4:5 and 5:6 in the hero) around a per-photo focal point.

## Components

### Buttons
Solid, square and direct.
- **Shape:** square (0), min height 48px, 12px by 20px padding, Jost 600 at 0.9375rem, with a trailing arrow that moves 2px on hover.
- **Sun (main action):** a marigold fill with ink text that brightens on hover. Use one per view for Get a Quote, Register now, or Pay with Paystack.
- **Primary:** an ink fill with white text that shifts to raised green on hover. It is for secondary actions on white or concrete ("How payment plans work", "See the programme").
- **Outline:** a 1px ink border that fills ink on hover. It is used for the WhatsApp and Call buttons on light ground.
- **Night outline:** a 1px pale-leaf border with white text on green that fills white on hover.
- **Ghost:** an underlined text link that thickens its underline on hover.
- **Focus:** a 3px marigold outline at a 3px offset, ringed by 6px of ink (or of white on green).
- **Transition:** background, color and border change over 200ms on `cubic-bezier(0.16, 1, 0.3, 1)`.

### Inputs / Fields
- **Style:** white field with a 1px control-outline border, square, 12px padding, 1rem text. Labels sit above in 600 weight with "(required)" in lichen grey.
- **Hover / Focus:** the border darkens to lichen grey on hover and to ink on focus, and the global marigold focus ring applies. The caret is laterite.
- **Error:** an error-red border on an error wash, with the message below behind a warning icon.

### Navigation
- **Desktop:** text links in moss grey at 0.9375rem, darkening to ink on hover. The current page is ink with a 3px marigold bar on the header's bottom rule. A marigold Get a Quote button sits at the end.
- **Mobile:** a full-height white panel of ruled rows with a marigold dot marking the current page, followed by stacked Get a Quote, WhatsApp and Call buttons.

### Close Band (signature)
Every long page ends with a solid tropical-green band. It holds one chapter-size sentence, a pale-leaf lede and a stacked action column: a marigold Get a Quote button, then night-outline WhatsApp and Call buttons.

### Page Header (signature)
This is the concrete band opening each inner page: headline-size H1, a large lede in moss grey, and optional actions. When given a photo, the photo fills the right half edge to edge at desktop.

### Sun-Path Chart (signature)
Today's sun over Lagos sits under a 2px ink rule inside a concrete band. Marigold is the sun and its hours, ink is the battery, and a dashed laterite line is the panel output. A sun-disc range thumb (marigold with a 2px ink ring) scrubs along a hairline track.

## Do's and Don'ts

### Do:
- **Do** close every long page with the green Close Band, and keep solid green to that band and the footer.
- **Do** reserve marigold for the one main action per view and for active and focus states.
- **Do** separate content with concrete bands and 1px hairlines, and head sequences and charts with a 2px ink rule.
- **Do** open each page on one photograph in a clean square crop, with its credit recorded in `src/content/photos.ts`.
- **Do** set headings in Jost 500 to 600 using the named steps, and body in Public Sans with tabular figures.
- **Do** keep every corner square. Reserve round shapes for small markers.

### Don't:
- **Don't** add a breeze-block, screen or louvre pattern as decoration. The client removed it.
- **Don't** put captions, credits, frames or overlays on photographs.
- **Don't** use boxed or shadowed cards, or rounded corners.
- **Don't** use marigold for decoration or as text on white, and don't give a secondary action a marigold fill.
- **Don't** fill any surface other than the Close Band and the footer with solid tropical green.
- **Don't** set display type at heavy or black weights, and don't bring back the cold indigo chart-paper palette.
- **Don't** use the uppercase label as an eyebrow above a heading.
