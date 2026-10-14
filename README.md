# Nightshift — Phasmophobia Fieldbook

A static, phone-first investigation board for 0–3 evidence runs. The bottom bar switches between Investigation, Suspects, Checks, and Summary; swipe left or right to move between them. Suspects keeps every evidence-compatible ghost visible and ranks matching behavior tells first. Tap a ghost for its field notes; a manual rule-out control lives inside the expanded card, and All lets you restore it. Checks lets you record a tell or mark a check as tried without automatically ruling anything out. Summary gathers the current round and shows clue-based leading suspects in one optional view. No account, backend, API key, icon font, or build step is needed.

## Run locally

Serve this directory over HTTP (ES modules do not load reliably from `file://`):

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Put it on GitHub Pages

1. Create a **public** GitHub repository, such as `nightshift-phasmophobia`.
2. Upload the files in this folder to the repository root, including `index.html`, `app.js`, `data.js`, `observations.js`, and `style.css`. Upload the files themselves, not the ZIP archive or an enclosing folder.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. GitHub shows the live site URL on the same Pages settings screen after deployment. It will look like `https://YOUR-USERNAME.github.io/nightshift-phasmophobia/` if you use that repository name.

The app saves investigation state in browser local storage. **Share state** copies a URL containing current evidence, observed behaviors, tried checks and eliminations. This is a snapshot, not live sync. Login is deliberately unnecessary for the first version; adding Google or Discord sign-in would require a backend and user data storage.

## Data and rules

`data.js` holds evidence, speeds, tells, hunt thresholds, and tests. `observations.js` holds selectable behavior clues. Specific tells rank matching ghosts higher in the single Suspects list; broad notes are logged without changing order. No behavior note automatically eliminates a ghost. `app.js` handles filtering and check results. The roster covers 30 ghosts, including Deildegast. Ghost pages were reviewed against dated Phasmophobia Wiki revisions on 14 October 2026 and recent official v0.19.1.0 patch notes. See [DATA_AUDIT.md](DATA_AUDIT.md) for the revision ledger, corrections, and limits. Mechanics remain community sourced rather than independently confirmed by gameplay. Original summaries and UI; no other GitHub tools were used as design references.

The reduced-evidence filter only treats a *negative* check as conclusive for guaranteed evidence. The Mimic’s extra Orbs always remain testable, including in zero-evidence games. Negative evidence marks are only as reliable as the in-game test conditions.

## Next improvements

- Recheck the source revisions and conditional mechanics after future game patches, with in-game verification for edge cases.
- Add a collaborative session service if your group needs live shared state.
- Add map guides only after deciding on image rights and a maintainable map data source.
