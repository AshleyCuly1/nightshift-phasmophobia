# Nightshift — Phasmophobia Fieldbook

A static, phone-first investigation board for 0–3 evidence runs. The floating bottom bar switches between Investigation, Suspects, and Notes; swipe left or right to move between them. Tapping a ghost opens its Notes view. No account, backend, API key, or build step is needed.

## Run locally

Serve this directory over HTTP (ES modules do not load reliably from `file://`):

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Put it on GitHub Pages

1. Create a GitHub repository and push this directory as the repository root.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. The included workflow publishes the static files on pushes to `main`.

The app saves investigation state in browser local storage. **Share state** copies a URL containing current evidence, observed behaviors, picks, and eliminations. This is a snapshot, not live sync. Login is deliberately unnecessary for the first version; adding Google or Discord sign-in would require a backend and user data storage.

## Data and rules

`data.js` is the editable source for evidence, speeds, tells, hunt thresholds, and proposed tests. `observations.js` defines selectable hunt, visual, interaction, sound, and activity notes. These are *soft clues*: they reorder compatible suspects and influence test suggestions, but never eliminate a ghost. Broad reports such as a breaker turning off or general aggression are logged without favoring a ghost. `app.js` contains filtering and test ranking. The roster currently covers 30 ghosts, including Deildegast (added in v0.18). The evidence combinations were checked against the [Phasmophobia Wiki evidence table](https://phasmophobia.fandom.com/wiki/Evidence), with Deildegast's addition confirmed by [Kinetic Games v0.18 patch notes](https://kineticgames.co.uk/news/phasmophobia-v0-18-0-0-patch-notes). The behavior, speed, sanity, blink, observation mappings, and test summaries are **draft community-sourced notes, not a complete per-ghost patch audit**. They should be checked against the current game before treating exact numbers or edge cases as confirmed. The [Phasmophobia Wiki identification guide](https://phasmophobia.fandom.com/wiki/Guides/Identifying_ghosts) is a useful starting point. Original summaries and UI; no other GitHub tools were used as design references.

The reduced-evidence filter only treats a *negative* check as conclusive for guaranteed evidence. The Mimic’s extra Orbs always remain testable, including in zero-evidence games. Negative evidence marks are only as reliable as the in-game test conditions.

## Next improvements

- Audit every behavioral entry against a dated ghost-specific source and the latest game patch, especially precise speed, sanity, and forced-evidence values. Add source/version fields to each data record.
- Add a collaborative session service if your group needs live shared state.
- Add map guides only after deciding on image rights and a maintainable map data source.
