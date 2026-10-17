// Community-sourced sanity rules reviewed 17 Oct 2026.
// Event loss applies only when the event's target collides with the ghost or mist
// and ends the event early. Seeing, hearing, or being hissed at is not enough.
export const SANITY_SOURCES = {
  sanity:'https://phasmophobia.fandom.com/wiki/Sanity',
  events:'https://phasmophobia.fandom.com/wiki/Ghost_Event'
};

export const EVENT_TYPES = [
  {id:'singing',label:'Singing'},
  {id:'standing',label:'Standing event'},
  {id:'chasing',label:'Chasing'},
  {id:'mist',label:'Mist form'},
  {id:'appear',label:'Appear'}
];

const ABILITY_DRAIN = {
  Jinn:'Ability: −25% to one nearby player while the breaker is on. This is separate from a ghost event.',
  Moroi:'Curse after a Spirit Box or parabolic response: passive sanity loss doubles and continues even in lit rooms. Sanity medication removes the curse.',
  Phantom:'While manifested and close enough for heartbeats, an extra ~0.5% sanity per second can drain even without event contact.',
  Poltergeist:'Simultaneous object-throw ability: nearby players lose about 2% sanity per object thrown. This is separate from a ghost event.',
  Yurei:'Door-closing ability: −15% to nearby players when it closes an open door in its room. This is separate from a ghost event.',
  'The Mimic':'May copy another ghost’s sanity ability or event rule. Its current mimic changes; ordinary event contact is usually −10%.',
  Banshee:'Uses its chosen target’s sanity, rather than team average, to decide when it may hunt. This does not change passive drain.',
  Oni:'Event contact costs twice the usual sanity. Its hunt threshold is shown above; it does not passively drain sanity faster.',
  Shade:'No extra sanity-draining ability known. Its lower hunt threshold is shown above.',
  Thaye:'Aging lowers its hunt threshold over time; it does not directly drain sanity faster.',
  Demon:'Its higher hunt threshold and rare early-hunt ability do not directly drain sanity.',
  Dayan:'Nearby player movement changes its hunt threshold; it does not directly drain sanity.',
  Gallu:'Protection changes its hunt threshold; it does not directly drain sanity.',
  Kormos:'Nearby sprinting can raise its hunt threshold; it does not directly drain sanity.',
  Mare:'Light level changes its hunt threshold; it does not directly drain sanity.',
  Obambo:'Its state changes its hunt threshold; it does not directly drain sanity.',
  Onryo:'Flame blowouts can trigger a hunt attempt; they do not directly drain sanity.',
  Raiju:'Powered electronics can raise its hunt threshold; they do not directly drain sanity.',
  Yokai:'Nearby talking can raise its hunt threshold; it does not directly drain sanity.'
};

export function sanityProfile(name){
  const eventLoss={};
  for(const type of EVENT_TYPES){
    let value='−10%';
    if(name==='The Mimic')value='Varies';
    else if(name==='Oni')value=type.id==='mist'?'Cannot occur':'−20%';
    else if(name==='Banshee'&&type.id==='singing')value='−10% / −15%';
    else if(name==='Kormos'&&['chasing','mist'].includes(type.id))value='Cannot occur';
    else if(name==='Shade'&&['singing','appear'].includes(type.id))value='Cannot occur';
    eventLoss[type.id]=value;
  }
  const note=name==='Banshee'?'Singing is −15% only when the event target is also its chosen hunt target; otherwise it is −10%.':name==='The Mimic'?'It can copy Oni’s −20% event contact, Banshee’s conditional −15% singing contact, and Phantom’s extra drain. Event availability follows what it is copying.':null;
  return {eventLoss,ability:ABILITY_DRAIN[name]||'No known ghost-specific sanity drain. Normal passive drain and the event-contact values below still apply.',note};
}
