# Portfolio Redesign Context

This file serves as a checkpoint and context store for the recent portfolio aesthetics redesign, so you can easily resume work on this architecture in the future.

## Goal & Architecture Strategy
We translated a modern, "bento-box" style portfolio design (originally provided as a single HTML file with Tailwind CSS classes) into your existing **Astro + SCSS** architecture.
- **No Tailwind Dependency**: We deliberately avoided installing Tailwind. Instead, we manually extracted the colors, typography, and spacing into reusable SCSS variables and classes.
- **Component-Driven Styles**: Global grid layouts are in `global.scss`, while specific component aesthetics (cards, hovers) use scoped SCSS within their respective `.astro` files.

## Summary of Changes Made

### 1. Global Setup (`global.scss` & `Layout.astro`)
- **Variables**: Defined new CSS variables in `:root` for the color palette (`--color-bg`, `--color-card`, `--color-text`, etc.) based on the mockup.
- **Dark Mode**: Configured an `html.dark` class to override these variables. Added a toggle script and floating button in `Layout.astro` that syncs with `localStorage` and system preferences.
- **Typography**: Imported **Inter** (sans) and **Manrope** (display/headings) from Google Fonts. Also upgraded FontAwesome to `v6.5.1` to ensure newer icons (like the X logo) render correctly.
- **Macro Layout**: Replaced the custom `<Grid>` with a standard 12-column CSS Grid. 
  - `.main-container`: The global wrapper with `align-items: flex-start` to prevent asymmetric vertical stretching.
  - `.col-main`: Spans 8 columns (Desktop), holds the primary content.
  - `.col-sidebar`: Spans 4 columns (Desktop), holds the feeds.

### 2. Page Structure (`index.astro`)
Reassembled the page to fit the new macro layout:
- **Left Column (`col-main`)**: Contains `Profile`, `ChatButton`, `Experience`, `YoutubeChannel`, `Social` grid, and the `Personal Project` loading placeholder.
- **Right Column (`col-sidebar`)**: Contains `YoutubeVideos` and `RecentBlogs`.

### 3. Component Redesigns
Each component was rewritten to match the modern aesthetic with smooth transitions and scoped SCSS.
- **`Profile.astro`**: Horizontal layout, fixed rounded container with an absolute-positioned green "online" status dot.
- **`Experience.astro`**: Converted to a custom vertical timeline using absolute-positioned dots (`.timeline-dot`) and a left border line. User tweaked the dot's `left` position recently for pixel-perfection.
- **`Social.astro`**: Transformed into square "bento" hover cards utilizing FontAwesome icons instead of static images.
- **`YoutubeVideos.astro` & `RecentBlogs.astro`**: Converted into sleek, vertically stacked cards containing thumbnails, post excerpts, and "Read Article / Video" animated layout items.

## Current State & Next Steps
- The structural HTML-to-SCSS translation is **complete**.
- Minor layout tweaks (like adjusting `height: 100%` on specific cards as the CSS Grid interacts with flexbox components) were being iterated on by the user.
- **To resume**: You can confidently build new components matching this look by utilizing the `.card` classes from `global.scss` or continuing to iterate on individual component paddings/margins.
