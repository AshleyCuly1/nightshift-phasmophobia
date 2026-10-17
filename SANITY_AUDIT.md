# Sanity rules audit

Reviewed 17 October 2026 against the [Phasmophobia Wiki sanity page](https://phasmophobia.fandom.com/wiki/Sanity), [ghost event page](https://phasmophobia.fandom.com/wiki/Ghost_Event), and relevant individual ghost pages. These are community-maintained mechanics, not independently measured game values. Recheck after game updates.

## What the app means by event loss

The event's target loses sanity when touching the manifested ghost or mist and thereby ending the event early. Merely seeing an event, hearing a hiss, or watching it end does **not** establish that instant loss. Darkness may still cause passive sanity loss, and separate abilities may apply. The listed event types are ordinary singing, standing (including red light and light breaking), chasing, mist form, and appear. Events forced by cursed possessions have their own costs and are outside this matrix. “Airball” and “mist ball” are community nicknames for mist form.

For most ghosts, each ordinary event type is **−10% on qualifying contact**. The exceptions are:

| Ghost | Event difference | Separate sanity effect |
| --- | --- | --- |
| Banshee | Singing contact is **−15%** only when the event target is also its chosen hunt target; otherwise −10%. | Uses its chosen target's sanity for hunting, not team average. |
| Oni | Qualifying contact is **−20%** for events it can perform; cannot do a mist form event. | No extra passive drain known. |
| Phantom | Standard **−10%** contact. | About **0.5%/s** extra while close enough to a manifested Phantom for heartbeats. |
| Kormos | Cannot do chasing or mist form events. | Nearby sprinting can raise hunt threshold, without directly lowering sanity. |
| Shade | Cannot do singing or appear events. | Lower hunt threshold, without extra sanity drain. |
| The Mimic | Depends on the ghost it is copying. | Can copy Oni, Banshee, Phantom, and other relevant abilities. |

Other direct ghost sanity effects, separate from events:

| Ghost | Effect |
| --- | --- |
| Jinn | **−25%** to a nearby player on its ability, with the breaker on. |
| Moroi | Spirit Box or parabolic response can curse a player: double passive drain, including in lit rooms, until sanity medication removes it. |
| Poltergeist | Simultaneous object throw: about **−2% per object** to nearby players. |
| Yurei | Door-closing ability: **−15%** to nearby players. |

For the remaining ghosts in the 30-ghost roster, no separate sanity-draining ability is listed in these references. Their hunt thresholds and modifiers are shown in the existing Hunt Sanity field. A higher threshold enables earlier hunts; it does not itself reduce sanity.

The UI uses `sanityProfile()` in `sanity.js` to apply the shared event rule to all 30 ghosts and override the named cases above. The five rows deliberately show an impossible event as “Cannot occur” instead of a numeric loss. The Mimic shows “Varies” because its current copy can change both availability and the loss amount.
