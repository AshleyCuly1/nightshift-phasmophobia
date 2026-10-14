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
const g=(name,evidence,speed,threshold,tell,test,forced=[],blink='Standard',note='')=>({name,evidence:evidence.split(' '),speed,threshold,tell,test,forced,blink,note,sourceRevision:SOURCE_REVISIONS[name],sourceUrl:`https://phasmophobia.fandom.com/wiki/${encodeURIComponent(name.replaceAll(' ','_'))}`,reviewedAt:'2026-10-14',reviewedPatch:'v0.19.1.0',knownIssue:KNOWN_ISSUES[name]||''});
export const GHOSTS = [
 g('Aswang','dots freeze writing','1.53 m/s; fast sight acceleration','50%','Accelerates unusually quickly after spotting a player; special hiding-place behavior.','Listen to footsteps before and after sustained line of sight.'),
 g('Banshee','dots orbs uv','1.7 m/s','50% target sanity','Fixates on one player; may give a distinctive parabolic microphone scream.','Try a parabolic microphone, then compare who it targets during hunts.'),
 g('Dayan','emf orbs box','1.2 / 2.25 m/s near player','45–65%','Within 10 m, standing still slows it; moving speeds it up.','From a safe spot, compare footsteps while a nearby player moves and stops.'),
 g('Deildegast','emf dots writing','3.0 → 0.4 m/s','50%','Starts very fast; moving different objects before a hunt lowers its speed.','Move several distinct props, then compare the next hunt’s footsteps.'),
 g('Demon','uv freeze writing','1.7 m/s','70% or ability','Can hunt at high sanity; has a shorter hunt cooldown and larger crucifix range.','Track hunt timing or place a crucifix beyond its normal range.'),
 g('Deogen','dots writing box','3.0 far → 0.4 near','40%','Always knows player locations and slows dramatically when close.','During a safe loop, listen for a sprint from afar becoming a crawl nearby.',['box'],'More visible'),
 g('Gallu','emf uv box','1.36 / 1.7 / 1.955 m/s','40–60%','Protective items change its state; enraged state may avoid disturbing salt.','Use crucifix or incense, then compare hunt speed and salt interactions.'),
 g('Goryo','emf dots uv','1.7 m/s','50%','D.O.T.S. silhouette appears on camera while nobody is in its room; rarely roams far.','Watch D.O.T.S. from outside the room through a video camera.',['dots']),
 g('Hantu','orbs uv freeze','1.4–2.7 m/s by temperature','50%','Faster in cold rooms; emits freezing breath in hunts when breaker is off.','Compare footsteps across warm and cold rooms; watch for breath with breaker off.',['freeze']),
 g('Jinn','emf uv freeze','1.7 m/s; burst to 2.5','50%','With breaker on, can rush a distant player it sees; cannot turn breaker off directly.','Compare distant line-of-sight speed with breaker on versus off.'),
 g('Kormos','orbs box uv','1.7 m/s; sound-path boost','50% / 70% if sprinting nearby','Nearly blind in hunts; detects player footsteps and can hunt earlier if someone sprints nearby.','Compare reactions to footsteps from cover, and avoid assuming a quiet voice test is conclusive.'),
 g('Mare','orbs writing box','1.7 m/s','40% lit / 60% dark','Hunts earlier in darkness; can immediately turn off a light you switch on.','Turn on a nearby light repeatedly and watch for an instant switch-off.'),
 g('Moroi','writing freeze box','1.5–2.25 m/s by sanity','50%','Gets faster as sanity falls; Spirit Box or parabolic response can curse sanity.','Check whether hunt speed rises as team sanity drops.',['box']),
 g('Myling','emf uv writing','1.7 m/s','50%','Footsteps become audible at a shorter range than for most ghosts.','Compare footstep audibility to electronic interference during a hunt.'),
 g('Obake','emf orbs uv','1.7 m/s','50%','Can leave six-finger UV prints and briefly change model during hunts.','Inspect UV prints and watch hunt blinks for a one-frame model change.',['uv']),
 g('Obambo','dots uv writing','1.445 / 1.955 m/s','10% / 65%','Alternates calm and aggressive states; fast-state hunts are shorter.','Time successive hunts and listen for abrupt speed changes mid-hunt.'),
 g('Oni','emf dots freeze','1.7 m/s','50%','Very visible in hunts; cannot perform the air-ball ghost event.','Observe long visible phases during a hunt.',[], 'More visible'),
 g('Onryo','orbs freeze box','1.7 m/s','40% / 60%','Flames block hunts; after enough flames are blown out, it can hunt early.','Test candle blowouts near a crucifix and monitor hunt attempts.'),
 g('Phantom','dots uv box','1.7 m/s','50%','Disappears from a ghost photo; long invisible gaps while blinking.','Photograph a manifested ghost or compare long invisible hunt intervals.',[], 'Less visible'),
 g('Poltergeist','uv writing box','1.7 m/s','50%','Can throw several nearby objects at once; throws frequently during hunts.','Make an object pile and watch for a multi-throw.'),
 g('Raiju','emf dots orbs','1.7 / 2.5 m/s near electronics','50% / 65%','Powered electronics nearby make it faster and enable earlier hunts.','Compare hunt speed near active equipment versus a cleared area.'),
 g('Revenant','orbs freeze writing','1.0 idle / 3.0 chasing','50%','Very slow until it detects a player, then jumps to high speed.','Listen from cover as it acquires and loses a player.'),
 g('Shade','emf freeze writing','1.7 m/s','35%','Shy around players; cannot initiate a hunt while a player is in its room.','Keep a player in the ghost room while monitoring attempts from outside.'),
 g('Spirit','emf writing box','1.7 m/s','50%','After incense, cannot hunt for longer than the standard ghost.','Time from incense use to the next hunt; roughly 180 seconds points to Spirit.'),
 g('Thaye','dots orbs writing','2.75 → 1.0 m/s as it ages','74% → 14%','Ages when players stay nearby; becomes slower and less aggressive.','Compare early and late hunt speeds after spending time near its room.'),
 g('The Mimic','uv freeze box','Copies another ghost','Varies','Copies other ghost traits and always produces extra Ghost Orbs—even with zero evidence.','Check for Orbs regardless of evidence count, then look for changing behavior.'),
 g('The Twins','emf freeze box','1.5 / 1.9 m/s','50%','Hunts can use either a slower or faster twin speed; distant interactions occur.','Compare multiple hunts for alternating base footstep cadence.'),
 g('Wraith','emf dots box','1.7 m/s','50%','Never disturbs salt; can teleport to a player and leave EMF.','Place salt directly along its route and verify it walks through without footprints.'),
 g('Yokai','dots orbs box','1.7 m/s','50% / 80%','Talking nearby can trigger an early hunt; hunt detection range is short.','Talk near the ghost at high sanity, then test detection from safe cover.'),
 g('Yurei','dots orbs freeze','1.7 m/s','50%','Can shut a door fully outside an event/hunt and drain sanity; incense confines it.','Watch a fully closed door interaction away from ghost events.')
];
