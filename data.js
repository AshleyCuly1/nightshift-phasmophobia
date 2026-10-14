export const EVIDENCE = [
  {id:'emf',name:'EMF 5',short:'EMF',tool:'Watch interaction readings with an EMF Reader.'},
  {id:'dots',name:'D.O.T.S.',short:'DOTS',tool:'Cover the ghost room with D.O.T.S. and watch in person or on camera.'},
  {id:'uv',name:'Ultraviolet',short:'UV',tool:'Check touched doors, windows, switches and salt footprints quickly.'},
  {id:'freeze',name:'Freezing',short:'Freeze',tool:'Leave a thermometer in the ghost room and watch for a freezing reading.'},
  {id:'orbs',name:'Ghost Orbs',short:'Orbs',tool:'Sweep the room through a night-vision camera; scan different angles.'},
  {id:'writing',name:'Writing',short:'Writing',tool:'Place a writing book in the ghost room and remove other interaction targets.'},
  {id:'box',name:'Spirit Box',short:'Box',tool:'Ask in darkness, close to the ghost, with the correct room and player conditions.'}
];
// Evidence transcribed from the Phasmophobia Wiki evidence table, with Deildegast
// checked against Kinetic's v0.18 announcement and later game references.
// forced: evidence guaranteed when at least one normal evidence is provided.
// Community wiki pages reviewed on 2026-10-14 against the latest official patch notes, v0.19.1.0.
// These are source revisions, not official confirmation of every mechanic.
const SOURCE_REVISIONS={"Aswang":24628, "Banshee":25048, "Dayan":24365, "Deildegast":24662, "Demon":24442, "Deogen":24658, "Gallu":24413, "Goryo":25019, "Hantu":24456, "Jinn":24354, "Kormos":25047, "Mare":25022, "Moroi":24626, "Myling":25034, "Obake":24341, "Obambo":24274, "Oni":24610, "Onryo":24595, "Phantom":25024, "Poltergeist":24435, "Raiju":24235, "Revenant":23424, "Shade":23207, "Spirit":23120, "Thaye":23537, "The Mimic":25056, "The Twins":25016, "Wraith":25069, "Yokai":23421, "Yurei":24593};
const KNOWN_ISSUES={Gallu:'The community wiki reports that non-hosts may see incorrect salt visuals after incense; state changes still occur.',Phantom:'The community wiki reports some video forms may still show the Phantom despite its photo tell.','The Twins':'The community wiki reports that the fast twin may spawn at the current location instead of its distant interaction.',Yurei:'The community wiki notes some doors are not linked to rooms for its ability.',Banshee:'The community wiki notes target and post-kill sight bugs.'};
const ABILITIES={
 Aswang:'If it reaches a player properly hidden in an official hiding spot, its hunt ends. It may head to that spot at the start of its next hunt.',
 Banshee:'Chooses one player as its target and uses that player’s sanity for hunt eligibility. It can make a distinctive parabolic scream.',
 Dayan:'A nearby player’s movement changes its hunt threshold and speed: moving raises both; standing still lowers both.',
 Deildegast:'Starts hunts very fast. Moving different objects before a hunt progressively lowers its next starting speed.',
 Demon:'Can trigger a hunt above its usual sanity threshold. It has a shorter hunt cooldown and a larger crucifix range.',
 Deogen:'Always knows where players are during hunts. It moves quickly from far away, then slows sharply near a player.',
 Gallu:'Crucifixes, salt and incense can change its state, affecting its hunt speed and hunt threshold.',
 Goryo:'Its D.O.T.S. silhouette appears on camera while no player is in its room. It rarely roams far from that room.',
 Hantu:'Its hunt speed changes with temperature: faster in cold rooms and slower in warm ones. It shows freezing breath during hunts when the breaker is off.',
 Jinn:'With the breaker on, it can burst toward a visible player at a distance. It cannot switch off the breaker directly.',
 Kormos:'Detects player footsteps during hunts despite poor sight. Sprinting near it outside a hunt can raise its hunt threshold.',
 Mare:'Can immediately turn off a light a player switches on. Its hunt threshold is higher in darkness and lower in a lit room.',
 Moroi:'A Spirit Box or parabolic response can curse a player’s sanity. Its hunt speed rises as team sanity falls.',
 Myling:'Its hunt footsteps become audible only at a shorter distance than those of most ghosts.',
 Obake:'Can leave unusual UV prints, including six fingers, and briefly change its model during a hunt.',
 Obambo:'Alternates between calm and aggressive states, changing its hunt threshold and speed. Aggressive hunts are shorter.',
 Oni:'Stays visible longer between hunt blinks and cannot perform the air-ball ghost event.',
 Onryo:'Nearby flames can block a hunt. After enough ghost-caused flame blowouts, it may try to hunt early.',
 Phantom:'A ghost photo makes it vanish from the image while the event continues. It also has longer invisible gaps during hunts.',
 Poltergeist:'Can throw several nearby objects at once and throws more frequently during hunts.',
 Raiju:'Nearby powered electronics can raise its hunt threshold and make it faster during a hunt.',
 Revenant:'Moves slowly until it detects a player, then accelerates dramatically.',
 Shade:'Cannot start a hunt while a player is in its room. Its normal hunt threshold is lower than most ghosts.',
 Spirit:'Incense prevents it from hunting for 180 seconds, longer than the usual 90 seconds.',
 Thaye:'Ages while players spend time nearby. Its hunt threshold, hunt speed and activity fall as it ages.',
 'The Mimic':'Copies another ghost’s traits and can change what it mimics. It always produces extra Ghost Orbs, even at zero evidence.',
 'The Twins':'Can interact in two different places almost at once. Its hunts can use one of two base speeds.',
 Wraith:'Can teleport to a player outside hunts and never disturbs salt.',
 Yokai:'Talking near it can enable earlier hunts. During a hunt, it detects voices and electronics only at short range.',
 Yurei:'Can smoothly close an open door in its room and drain nearby players’ sanity. A hard door slam is not this ability.'
};
const g=(name,evidence,speed,threshold,tell,test,forced=[],blink='Standard',note='')=>({name,evidence:evidence.split(' '),speed,threshold,ability:ABILITIES[name],tell,test,forced,blink,note,sourceRevision:SOURCE_REVISIONS[name],sourceUrl:`https://phasmophobia.fandom.com/wiki/${encodeURIComponent(name.replaceAll(' ','_'))}`,reviewedAt:'2026-10-14',reviewedPatch:'v0.19.1.0',knownIssue:KNOWN_ISSUES[name]||''});
export const GHOSTS = [
 g('Aswang','dots freeze writing','1.53 m/s; fast sight acceleration','50%','Accelerates unusually quickly after spotting a player; special hiding-place behavior.','During a hunt, listen for footsteps to accelerate sharply once it sees a player.'),
 g('Banshee','dots orbs uv','1.7 m/s','50% target sanity','Fixates on one player; may give a distinctive parabolic microphone scream.','Sweep with a parabolic microphone for its distinctive scream; across hunts, watch whether it keeps pursuing the same player.'),
 g('Dayan','emf orbs box','1.2 / 2.25 m/s near player','45–65%','Within 10 m, standing still slows it; moving speeds it up.','From safe cover, listen for a sharp speed-up when a nearby player moves and a slowdown when they stop.'),
 g('Deildegast','emf dots writing','3.0 → 0.4 m/s','50%','Starts very fast; moving different objects before a hunt lowers its speed.','Move many different props between hunts; the next hunt should start slower for each unique item moved.'),
 g('Demon','uv freeze writing','1.7 m/s','70% or ability','Can hunt at high sanity; has a shorter hunt cooldown and larger crucifix range.','A hunt at high sanity or unusually soon after the last hunt supports Demon; its crucifix range is larger too.'),
 g('Deogen','dots writing box','3.0 far → 0.4 near','40%','Always knows player locations and slows dramatically when close.','During a safe loop, listen for fast distant footsteps that slow to a crawl as it approaches you.',['box'],'More visible'),
 g('Gallu','emf uv box','1.36 / 1.7 / 1.955 m/s','40–60%','Protective items change its state; enraged state may avoid disturbing salt.','After a crucifix burns or incense wears off, listen for faster footsteps; an enraged Gallu also leaves salt untouched.'),
 g('Goryo','emf dots uv','1.7 m/s','50%','D.O.T.S. silhouette appears on camera while nobody is in its room; rarely roams far.','Leave the ghost room and watch D.O.T.S. on camera; a silhouette visible on camera but not in person points to Goryo.',['dots']),
 g('Hantu','orbs uv freeze','1.4–2.7 m/s by temperature','50%','Faster in cold rooms; emits freezing breath in hunts when breaker is off.','Listen for faster footsteps in cold rooms and slower ones in warm rooms. With the breaker off, look for freezing breath from its head during a hunt.',['freeze']),
 g('Jinn','emf uv freeze','1.7 m/s; burst to 2.5','50%','With breaker on, can rush a distant player it sees; cannot turn breaker off directly.','With the breaker on, listen for a sudden speed burst toward a distant player it sees; that burst should disappear with the breaker off.'),
 g('Kormos','orbs box uv','1.7 m/s; sound-path boost','50% / 70% if sprinting nearby','Nearly blind in hunts; detects player footsteps and can hunt earlier if someone sprints nearby.','From cover, watch whether footsteps draw it toward a moving player while a still, hidden player goes unnoticed.'),
 g('Mare','orbs writing box','1.7 m/s','40% lit / 60% dark','Hunts earlier in darkness; can immediately turn off a light you switch on.','Turn on a light near the ghost; an immediate switch-off by the ghost is a Mare tell.'),
 g('Moroi','writing freeze box','1.5–2.25 m/s by sanity','50%','Gets faster as sanity falls; Spirit Box or parabolic response can curse sanity.','Compare hunts as team sanity falls; steadily faster base footsteps support Moroi.',['box']),
 g('Myling','emf uv writing','1.7 m/s','50%','Footsteps become audible at a shorter range than for most ghosts.','During a hunt, if electronics flicker before you can hear nearby footsteps, consider Myling.'),
 g('Obake','emf orbs uv','1.7 m/s','50%','Can leave six-finger UV prints and briefly change model during hunts.','Check UV handprints for six fingers, or watch for a brief change of ghost model during a hunt.',['uv']),
 g('Obambo','dots uv writing','1.445 / 1.955 m/s','10% / 65%','Alternates calm and aggressive states; fast-state hunts are shorter.','Listen for an unexplained jump between slow and fast footsteps, even mid-hunt; hunts that start fast are shorter.'),
 g('Oni','emf dots freeze','1.7 m/s','50%','Very visible in hunts; cannot perform the air-ball ghost event.','During a hunt, watch for long visible flashes with only brief invisible gaps. An air-ball ghost event rules Oni out.',[], 'More visible'),
 g('Onryo','orbs freeze box','1.7 m/s','40% / 60%','Flames block hunts; after enough flames are blown out, it can hunt early.','Keep flames near the ghost and count ghost-caused blowouts; a hunt attempt after the third supports Onryo.'),
 g('Phantom','dots uv box','1.7 m/s','50%','Disappears from a ghost photo; long invisible gaps while blinking.','Photograph a ghost event: a Phantom vanishes from the photo while the event continues. During hunts, it also stays invisible longer.',[], 'Less visible'),
 g('Poltergeist','uv writing box','1.7 m/s','50%','Can throw several nearby objects at once; throws frequently during hunts.','Pile loose objects in its room; several thrown at once strongly point to Poltergeist.'),
 g('Raiju','emf dots orbs','1.7 / 2.5 m/s near electronics','50% / 65%','Powered electronics nearby make it faster and enable earlier hunts.','Leave active electronics in its hunt path; footsteps should speed up near them and slow back down away from them.'),
 g('Revenant','orbs freeze writing','1.0 idle / 3.0 chasing','50%','Very slow until it detects a player, then jumps to high speed.','Listen from cover: slow wandering footsteps should turn extremely fast when it detects a player, then slow again after losing them.'),
 g('Shade','emf freeze writing','1.7 m/s','35%','Shy around players; cannot initiate a hunt while a player is in its room.','At low sanity, watch for activity to drop while someone stays in its room; it cannot start a hunt there with a player present.'),
 g('Spirit','emf writing box','1.7 m/s','50%','After incense, cannot hunt for longer than the standard ghost.','Time from incense use to the next hunt; roughly 180 seconds points to Spirit.'),
 g('Thaye','dots orbs writing','2.75 → 1.0 m/s as it ages','74% → 14%','Ages when players stay nearby; becomes slower and less aggressive.','Spend time near its room, then compare hunts; a once fast hunter should become slower and hunt less readily.'),
 g('The Mimic','uv freeze box','Copies another ghost','Varies','Copies other ghost traits and always produces extra Ghost Orbs—even with zero evidence.','Check for Ghost Orbs even in zero-evidence mode; if its hunt behavior changes between ghost types, suspect The Mimic.'),
 g('The Twins','emf freeze box','1.5 / 1.9 m/s','50%','Can make two interactions in separate areas within 1–2 seconds; hunts use either a slower or faster base speed.','Listen for two interactions in different spots almost together; across hunts, compare for 1.5 versus 1.9 m/s base footsteps.'),
 g('Wraith','emf dots box','1.7 m/s','50%','Never disturbs salt; can teleport to a player and leave EMF.','Place salt across its path; if it walks through without disturbing the pile, suspect Wraith.'),
 g('Yokai','dots orbs box','1.7 m/s','50% / 80%','Talking nearby can trigger an early hunt; hunt detection range is short.','Talking nearby may trigger an unusually early hunt; from safe cover, notice if it fails to detect voices or electronics beyond a short range.'),
 g('Yurei','dots orbs freeze','1.7 m/s','50%','Its ability can close a door smoothly and quietly while draining nearby sanity. A hard slam can happen with any ghost.','Watch for a smooth, quiet full door close without a ghost event or hunt. A sudden slam is not a Yurei tell.')
];
