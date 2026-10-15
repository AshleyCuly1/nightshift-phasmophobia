# BUSTBIBLE — Phasmophobia Fieldbook

A static, phone-first investigation board for 0–3 evidence runs. The bottom bar switches between Investigation, Checks, and Suspects; swipe left or right to move between them. On phones, the floating Show ghosts button reveals which ghosts each observation points to or rules out, then hides those labels again. Evidence and clearly observed unique tells narrow Suspects; other behavior clues only rank them. A certain male ghost rules out Banshee and Dayan; female does not exclude other types. Tap a ghost for its field notes or cross it off directly from its row; All lets you restore it. Checks lets you record an observed result or mark a check as tried without treating a missed tell as exclusion. No account, backend, API key, icon font, or build step is needed.

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

The app saves investigation state in browser local storage. If confirmed findings exceed the selected evidence mode, the app keeps your chosen game setting, shows the matching ghosts, and warns you to check the setting or findings. The Mimic's extra Ghost Orbs remain an exception. **Share state** copies a URL containing current gender selection, evidence, observed behaviors, firelight blowout count, tried checks and eliminations. This is a snapshot, not live sync. **Tried, no tell** records an attempt, clears **Saw it** for that check, and does not rule out any ghost. Login is deliberately unnecessary for the first version; adding Google or Discord sign-in would require a backend and user data storage.

## Data and rules

`data.js` holds evidence, speeds, abilities, tells, hunt thresholds, and tests. Each expanded ghost card shows the ghost’s ability and a suggested test without repeating the same tell in another section. `observations.js` contains 54 observation types, including a firelight tally, grouped by the event or interaction a player sees. Investigation is a compact log: once suspects narrow, it fades unrelated observations in place while keeping logged ones clear. The All switch shows every card at full strength. Details remain in the collapsed source notes. Checks recommends tests for remaining suspects and removes a check after its finding is logged. The rules still separate narrowly defined confirmed tells from softer clues and notes. A positively observed confirmed tell narrows Suspects to ghosts capable of that mechanic, including The Mimic where applicable; failing to observe one never excludes a ghost. Specific clues rank matching ghosts higher, and broad notes stay in the log. Older saved tell selections are held for review so a previously approximate note cannot silently become an exclusion. `app.js` handles filtering and check results. The roster covers 30 ghosts, including Deildegast. Ghost pages were reviewed against dated Phasmophobia Wiki revisions on 14 October 2026 and recent official v0.19.1.0 patch notes. See [DATA_AUDIT.md](DATA_AUDIT.md) for the ghost data ledger and [OBSERVATION_AUDIT.md](OBSERVATION_AUDIT.md) for the 30-ghost observation coverage table and its limits. Mechanics remain community sourced rather than independently confirmed by gameplay. Original summaries and UI; no other GitHub tools were used as design references.

**Evidence given** matches the in-game difficulty setting, not the number of clues found so far. Three evidence enables all normal types; one or two can hide some. In reduced-evidence games, a negative check only excludes a ghost when that evidence is guaranteed: Deogen Spirit Box, Goryo D.O.T.S., Hantu Freezing, Moroi Spirit Box, or Obake Ultraviolet. At zero evidence, no normal type appears. The Mimic’s extra Orbs remain testable in every mode, including zero. Negative marks are only as reliable as the in-game test conditions.

## Next improvements

- Recheck the source revisions and conditional mechanics after future game patches, with in-game verification for edge cases.
- Add a collaborative session service if your group needs live shared state.
- Add map guides only after deciding on image rights and a maintainable map data source.
