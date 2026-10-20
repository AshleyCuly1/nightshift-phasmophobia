# 2026 video audit — pro-level investigation mechanics

Reviewed on 20 October 2026 against [Lisa's Chillin's elimination guide](https://www.youtube.com/watch?v=PNPgkRpEkxw) (39 min), the current Phasmophobia community wiki ghost/mechanics pages, and the app's existing data. This document maps the substantive rules and tests in the video to their app surfaces. The video examples are paraphrased, not transcribed. Rules that depend on player judgment remain field notes; only a clearly defined observed impossibility becomes a hard exclusion.

The 30 ghost profiles and evidence combinations already existed. New guide entries live in `video-guide.js`. New tappable observations and filters live in `observations.js`; placement is in `observation-groups.js`. Each expanded ghost card shows relevant field tests with a direct link to its mechanics page and, where applicable, the video moment. Checks has general testing principles. The app's behavior labels stay short for mobile use; detailed conditions are in the selected observation's “Sources & detailed notes” and the ghost card.

The spoken video does not give a dedicated test for Aswang, Deildegast, Revenant or The Mimic. Their ghost cards include supplemental tests from their mechanics pages, labelled only with a mechanics link.

| Video time | Mechanic | App treatment |
| --- | --- | --- |
| 00:35 | Haunted Mirror tracks favorite room | Checks field guide; distinguishes Ouija current-room answer |
| 01:00 | Kormos cannot do chasing or mist events | Existing hard exclusions; expanded Kormos test |
| 01:23 | Visible model in valid ghost photo excludes Phantom | New hard exclusion; video-form bug warning |
| 01:55 | Salt disturbed excludes Wraith | Existing hard exclusion; expanded test |
| 02:03 | Initial Gallu enrages two seconds after first salt | New conditional second-salt hard exclusion; multiplayer visual caveat |
| 02:39 | Poltergeist cannot do certain non-throw interactions | New dirty-water and window-knock hard exclusions; fire-lighting now excludes Poltergeist; other examples in ghost card |
| 03:21 | Singing event excludes Shade | New hard exclusion |
| 04:10 | Sanity measurement and Shade/Deogen thresholds | Existing threshold cards, expanded tests and Checks interpretation guide; no automatic rule from a guessed sanity reading |
| 04:26 | Truck monitor oscillates around actual sanity | Checks guide explains ±2% per-player display wobble and broken-monitor difficulties |
| 05:05 | Obambo state timing and 10/65% thresholds | Expanded Obambo test, existing threshold card |
| 05:41 | Gallu normal/enraged/weakened states | Expanded state guide; ability summary clarified |
| 06:30 | Third firelight blowout/Onryo hunt attempt | Existing 0–3 counter; guide explains conditional nature |
| 06:44 | Goryo cannot naturally change favorite room | New hard exclusion with Mirror/temperature conditions; Monkey Paw exception |
| 07:53 | Phantom video example | Covered by expanded test, with current video bug warning |
| 08:22 | Incense confines Yurei for 90 seconds and suppresses D.O.T.S. | Two new hard exclusions; sensor/event caveat |
| 09:33 | Room light switch versus Mare | Existing hard exclusion; TV/computer claim handled as bug-sensitive note, not hard rule |
| 10:04 | Oni event contact costs 20% sanity | Existing sanity table; expanded test |
| 11:04 | Jinn cannot directly switch breaker off | Existing ability text; guide explains breaker overload and teammate checks. No new ambiguous power-off control. |
| 11:51 | Hantu cannot switch breaker on | New hard exclusion |
| 12:51 | Banshee singing contact costs 15% for target | Existing target-aware sanity table; expanded guide corrects blanket 15% claim |
| 13:49 | Phantom additional sight-based sanity loss | Expanded guide |
| 14:35 | Window knock excludes Poltergeist | New hard exclusion |
| 14:50 | Targeted levitating throw excludes Shade | New hard exclusion; ordinary throws do not count |
| 15:10 | Monkey Paw sanity wish changes favorite room | Goryo caveat and general guide |
| 15:59 | Voodoo Doll forced interaction in Shade's room | Expanded conditional field test |
| 16:44 | Ouija age changes for Thaye | Expanded test; narration accidentally says “Shade” at 17:15, but mechanic belongs to Thaye |
| 17:40 | Mist form excludes Oni | Existing hard exclusion |
| 17:52 | Moroi curse from Box/recorded paranormal sound | Existing clue, expanded test with lit-room control |
| 19:12 | Mare lit-room 40% and Shade same-room hunt restriction | Expanded tests; location and regular-hunt conditions |
| 20:15 | Raiju event/hunt interference radius | Expanded 15 m versus normal 10 m test; kept as field test until measured |
| 21:04 | Partial ordinary door move excludes Yurei | New hard exclusion; locker and hunt/event exceptions |
| 21:27 | Myling distant recorded sound | Expanded test |
| 21:53 | Demon crucifix reach and tier-three cursed-hunt block | Expanded conditional test |
| 23:13 | Onryo firelight range and flame/crucifix comparison | Expanded conditional test; no automatic elimination for uncertain range |
| 24:33 | Hunt-speed baseline and line-of-sight factors | Checks field guide; existing speed cards |
| 26:12 | Phantom long invisible and Oni long visible blinks | Existing clues and expanded tests |
| 26:34 | Obake brief hunt shapeshift | Existing hard positive tell; expanded test |
| 26:40 | Yokai short hunt hearing range | Existing clue; expanded repeated test |
| 27:13 | Poltergeist frequent throws with available objects | Existing clue; expanded control condition |
| 27:22 | Dayan speed near moving/still players | Existing clue; expanded condition |
| 27:47 | Hantu temperature speed and no sight acceleration | Existing clue, expanded distinction |
| 27:53 | Kormos footsteps versus sight | Existing clue, expanded distinction |
| 28:12 | Jinn breaker-dependent distance burst | Existing clue, expanded test |
| 28:26 | Raiju player equipment only, not house switches | Existing clue, expanded test |
| 29:37 | Myling footstep audibility versus electronics | Existing clue, expanded distance/floor caveat |
| 30:39 | Spirit 180-second incense block; active block not reset | Existing timing tool; expanded test |
| 31:30 | Twins two base speeds | Existing clue; expanded distinction from Obambo/Gallu |
| 32:01 | Obambo clock, speed and short aggressive hunts | Existing clue/card; expanded timing test |
| 33:23 | Moroi slows when team sanity rises | Expanded controlled test |
| 34:49 | Moroi seven-second incense blindness | Expanded timed test |
| 35:45 | Gallu 4/5/6-second blindness and state changes | Expanded timed test |

## Corrections and limits

- The narration says “Goryo” around 02:17 and 05:41 while demonstrating Gallu salt/state behavior. The Goryo favorite-room claim is separate and verified on its [ghost page](https://phasmophobia.fandom.com/wiki/Goryo).
- The narration says “Shade” near 17:15 while demonstrating Ouija age changes. That is [Thaye's mechanic](https://phasmophobia.fandom.com/wiki/Thaye).
- The video treats a 10% singing event contact as excluding Banshee. The [Banshee target condition](https://phasmophobia.fandom.com/wiki/Banshee) means that is only valid for the chosen target; the app keeps the distinction.
- The video suggests TV/computer activation can exclude Mare due to a current bug. The [Mare page](https://phasmophobia.fandom.com/wiki/Mare) reports this as bug-dependent and inconsistent with intended mechanics. The app deliberately uses normal room lights for hard elimination.
- The generic Ghost wiki introduction still says all ghosts can make dirty water, while the updated [Poltergeist-specific research](https://phasmophobia.fandom.com/wiki/Poltergeist) and video describe the newer interaction restriction. This needs rechecking after game patches; see `observations.js` for the precise hard rules.
- A visible ghost in a video should not yet hard-exclude Phantom because the [Phantom page](https://phasmophobia.fandom.com/wiki/Phantom) reports form-specific video bugs. A valid, clearly visible ghost photo can be used.
- An absence of a random event, ability, scream, room change, salt step or hunt is generally weak evidence. The app does not filter suspects on these absences. Conditional tests with poor observability are reference notes instead of taps.

Key mechanics references: [Ghost](https://phasmophobia.fandom.com/wiki/Ghost), [Hunt](https://phasmophobia.fandom.com/wiki/Hunt), [Incense](https://phasmophobia.fandom.com/wiki/Incense), [Fuse Box](https://phasmophobia.fandom.com/wiki/Fuse_Box), [Door](https://phasmophobia.fandom.com/wiki/Door), [Ouija Board](https://phasmophobia.fandom.com/wiki/Ouija_Board), [Guides/Identifying ghosts](https://phasmophobia.fandom.com/wiki/Guides/Identifying_ghosts).
