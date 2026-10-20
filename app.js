import {EVIDENCE,GHOSTS} from './data.js?v=pro-field-guide-1';
import {OBSERVATIONS} from './observations.js?v=pro-field-guide-1';
import {EVENT_TYPES,SANITY_SOURCES,sanityProfile} from './sanity.js?v=standing-event-1';
import {OBSERVATION_GROUPS} from './observation-groups.js?v=pro-field-guide-1';
import {VIDEO_BASICS,VIDEO_TESTS,videoLink} from './video-guide.js?v=pro-field-guide-3';
const $=s=>document.querySelector(s);
const icon=(name,cls='icon')=>`<svg class="${cls}" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="#i-${name}"></use></svg>`;
const evidenceIcons={emf:'activity',dots:'scan-eye',uv:'fingerprint',freeze:'snowflake',orbs:'circle-dot',writing:'notebook-pen',box:'radio'};
const short=id=>EVIDENCE.find(e=>e.id===id)?.short||id;
const blinkLabel=ghost=>ghost.blink==='Standard'?'Typical':ghost.blink;
const huntTiming=ghost=>({
 incense:ghost.name==='Demon'?'60s':ghost.name==='Spirit'?'180s':ghost.name==='The Mimic'?'60–180s*':'90s',
 crucifix:ghost.name==='Demon'?'1.5× normal':ghost.name==='Gallu'?'State dependent':ghost.name==='The Mimic'?'Copies ghost*':'Normal'
});
let timingGap='';
let timingBasis='attempt';
const defaultOpenGroups=()=>OBSERVATION_GROUPS.map(group=>group.id);
const defaults=()=>({mode:2,gender:null,evidence:{},observed:[],reviewTells:[],reviewMechanics:[],rulesVersion:5,checkTried:[],excluded:[],expanded:null,filter:'possible',view:'investigation',showGhostLabels:false,showAllObservations:false,observationLayoutVersion:2,openObservationGroups:defaultOpenGroups(),fireBlowouts:0});
let state=defaults();
let savedObservationLayoutVersion=2;
try{const saved=localStorage.getItem('nightshift-v1');if(saved){const previous=JSON.parse(saved);state={...state,...previous};savedObservationLayoutVersion=previous.observationLayoutVersion||0;}if(location.hash.startsWith('#s=')){const shared=JSON.parse(decodeURIComponent(location.hash.slice(3)));state={...defaults(),...shared,view:state.view,showGhostLabels:state.showGhostLabels};savedObservationLayoutVersion=2;if(!Object.hasOwn(shared,'rulesVersion'))state.rulesVersion=0;}}catch{}
if((state.rulesVersion||0)<2){const hardIds=new Set(OBSERVATIONS.filter(o=>o.kind==='confirmed').map(o=>o.id));state.reviewTells=(Array.isArray(state.observed)?state.observed:[]).filter(id=>hardIds.has(id));state.observed=(Array.isArray(state.observed)?state.observed:[]).filter(id=>!hardIds.has(id));state.rulesVersion=2;}
if(state.rulesVersion<3){const ambiguous=['yurei_door','onryo_fire'];state.reviewMechanics=(Array.isArray(state.observed)?state.observed:[]).filter(id=>ambiguous.includes(id));state.observed=(Array.isArray(state.observed)?state.observed:[]).filter(id=>!ambiguous.includes(id));state.rulesVersion=3;}
if(state.rulesVersion<4){state.observed=(Array.isArray(state.observed)?state.observed:[]).filter(id=>id!=='yurei_door');state.reviewMechanics=(Array.isArray(state.reviewMechanics)?state.reviewMechanics:[]).filter(id=>id!=='yurei_door');state.rulesVersion=4;}
if(state.rulesVersion<5){state.observed=(Array.isArray(state.observed)?state.observed:[]).filter(id=>id!=='onryo_fire');state.reviewMechanics=(Array.isArray(state.reviewMechanics)?state.reviewMechanics:[]).filter(id=>id!=='onryo_fire');state.checkTried=(Array.isArray(state.checkTried)?state.checkTried:[]).filter(id=>id!=='firelight');state.rulesVersion=5;}
if(!['male','female'].includes(state.gender))state.gender=null;
if(!Array.isArray(state.reviewMechanics))state.reviewMechanics=[];
if(['fits','starred'].includes(state.filter))state.filter='possible';
if(state.view==='summary')state.view='suspects';
delete state.starred;
if(!Array.isArray(state.checkTried))state.checkTried=[];
state.showGhostLabels=state.showGhostLabels===true;
state.showAllObservations=state.showAllObservations===true;
if(savedObservationLayoutVersion<2||!Array.isArray(state.openObservationGroups)){state.openObservationGroups=defaultOpenGroups();state.observationLayoutVersion=2;}
state.fireBlowouts=Math.max(0,Math.min(3,Number(state.fireBlowouts)||0));
state.observed=Array.isArray(state.observed)?state.observed:[];
state.observed=state.fireBlowouts?Array.from(new Set([...state.observed,'fire_blowout'])):state.observed.filter(id=>id!=='fire_blowout');
state.checkTried=state.checkTried.filter(id=>id!=='door_watch');
const persist=()=>{state.rulesVersion=5;localStorage.setItem('nightshift-v1',JSON.stringify(state));};
const views=['investigation','notes','suspects'];
const mobile=()=>matchMedia('(max-width: 760px)').matches;
const pageTrack=$('.shell');
const investigationPanel=$('.rail');
const backToEvidence=$('#backToEvidence');
const observationToolbar=$('.observation-toolbar');
const navButtons=[...document.querySelectorAll('.mobile-nav [data-view]')];
const navIndicator=$('.nav-indicator');
let scrollTimer;
let scrollFrame;
function activeNav(index){const view=views[index];document.body.classList.remove(...views.map(v=>'view-'+v));document.body.classList.add('view-'+view);navButtons.forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false')});}
function updateNavPosition(){if(!mobile())return;const progress=Math.max(0,Math.min(views.length-1,pageTrack.scrollLeft/(pageTrack.clientWidth||1)));navIndicator.style.transform=`translate3d(calc(${progress*100}% + ${progress*4}px),0,0)`;activeNav(Math.round(progress));}
function renderView(){const view=views.includes(state.view)?state.view:'investigation';state.view=view;activeNav(views.indexOf(view));if(mobile()){pageTrack.scrollTo({left:views.indexOf(view)*pageTrack.clientWidth,behavior:'instant'});updateNavPosition();}}
function switchView(view){if(!views.includes(view))return;state.view=view;persist();if(mobile())pageTrack.scrollTo({left:views.indexOf(view)*pageTrack.clientWidth,behavior:'smooth'});else activeNav(views.indexOf(view));}
const found=()=>Object.keys(state.evidence).filter(k=>state.evidence[k]===1);
const excludedEvidence=()=>Object.keys(state.evidence).filter(k=>state.evidence[k]===-1);
// One calculation pass per committed update. A tap updates its own card first.
let derived={};
const selectedObservations=()=>OBSERVATIONS.filter(o=>Array.isArray(state.observed)&&state.observed.includes(o.id));
const confirmedTells=()=>derived.tells??(derived.tells=selectedObservations().filter(o=>o.kind==='confirmed'&&!(filteringMode()===0&&o.requiresEvidence)));
const diagnosticObservations=()=>derived.clues??(derived.clues=selectedObservations().filter(o=>o.kind!=='confirmed'&&o.weight>0&&o.leads.length&&!(filteringMode()===0&&o.requiresEvidence)));
const matchedObservations=ghost=>diagnosticObservations().filter(o=>o.leads.includes(ghost.name));
const behaviorScore=ghost=>matchedObservations(ghost).reduce((sum,o)=>sum+o.weight,0);
const leadScore=ghost=>behaviorScore(ghost)||(ghost.name==='The Mimic'&&diagnosticObservations().length?0.5:0);
const behaviorMatches=pool=>pool.filter(g=>behaviorScore(g)>0);
function compatibleAtMode(ghost,mode){
 const yes=found(),no=excludedEvidence(),normal=yes.filter(e=>e!=='orbs'||ghost.name!=='The Mimic');
 if(mode===0){if(ghost.name==='The Mimic'&&no.includes('orbs'))return false;return yes.length===0 || (ghost.name==='The Mimic'&&yes.every(x=>x==='orbs'));}
 if(normal.length>mode)return false;
 if(!yes.every(e=>ghost.evidence.includes(e)||(ghost.name==='The Mimic'&&e==='orbs')))return false;
 if(no.includes('orbs')&&ghost.name==='The Mimic')return false;
 if(mode===3&&no.some(e=>ghost.evidence.includes(e)))return false;
 if(mode<3&&no.some(e=>ghost.forced.includes(e)))return false;
 return true;
}
function filteringMode(){
 if(derived.mode!==undefined)return derived.mode;
 if(GHOSTS.some(g=>compatibleAtMode(g,state.mode)))return derived.mode=state.mode;
 for(let mode=state.mode+1;mode<=3;mode++)if(GHOSTS.some(g=>compatibleAtMode(g,mode)))return derived.mode=mode;
 return derived.mode=state.mode;
}
const compatible=ghost=>compatibleAtMode(ghost,filteringMode());
const evidencePossible=()=>derived.evidencePool??(derived.evidencePool=GHOSTS.filter(g=>compatibleAtMode(g,filteringMode())&&!state.excluded.includes(g.name)&&!(state.gender==='male'&&['Banshee','Dayan'].includes(g.name))));
const tellAllows=(tell,ghost)=>(tell.fits?tell.fits.includes(ghost.name):!tell.excludes?.includes(ghost.name))&&(filteringMode()!==0||!tell.requiresEvidence);
const possible=()=>derived.pool??(derived.pool=evidencePossible().filter(g=>confirmedTells().every(t=>tellAllows(t,g))));
const matchedConfirmed=ghost=>confirmedTells().filter(t=>t.fits?.includes(ghost.name));
function tag(id,ghost){const match=state.evidence[id]===1?' match':'';const forced=ghost?.forced.includes(id)?' forced':'';return `<span class="e-tag${match}${forced}" title="${forced?'Guaranteed in reduced evidence':''}">${short(id)}${forced?' •':''}</span>`;}
function renderEvidence(){$('#evidenceList').innerHTML=EVIDENCE.map(e=>{const v=state.evidence[e.id]||0;return `<button class="evidence ${v===1?'yes':v===-1?'no':''}" data-evidence="${e.id}" aria-label="${e.name}: ${v===1?'found':v===-1?'ruled out':'unknown'}" aria-pressed="${v!==0}"><span class="glyph">${icon(evidenceIcons[e.id])}</span><strong>${e.name}</strong><span class="state">${icon(v===1?'check':v===-1?'x':'minus')}</span></button>`}).join('');
 document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.mode)===state.mode);b.setAttribute('aria-pressed',Number(b.dataset.mode)===state.mode)});
 document.querySelectorAll('[data-gender]').forEach(b=>{const active=b.dataset.gender===state.gender;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});
 const warning=$('#modeConflict'),mode=filteringMode();warning.hidden=mode===state.mode;warning.textContent=mode===state.mode?'':`${found().length} findings exceed ${state.mode} evidence mode. Showing evidence matches; check your game setting or findings.`;
}
function observationRelevant(o,pool,selected=false){
 if(!pool.length||filteringMode()===0&&o.requiresEvidence)return false;
 if(pool.length===GHOSTS.length)return true;
 const names=new Set(pool.map(g=>g.name));
 return (o.fits?.some(name=>names.has(name))&&(selected||pool.some(g=>!o.fits.includes(g.name))))||o.excludes?.some(name=>names.has(name))||o.leads.some(name=>names.has(name))||(o.id==='fire_blowout'&&names.has('Onryo'));
}
function clearIrrelevantObservations(){
 if(state.showAllObservations)return;
 const evidencePool=evidencePossible();
 state.observed=state.observed.filter(id=>{const o=OBSERVATIONS.find(item=>item.id===id);return o&& (o.kind!=='confirmed'||observationRelevant(o,evidencePool,true));});
 const pool=possible();
 state.observed=state.observed.filter(id=>{const o=OBSERVATIONS.find(item=>item.id===id);return o&&(o.kind==='confirmed'||observationRelevant(o,pool,true));});
 if(!state.observed.includes('fire_blowout'))state.fireBlowouts=0;
}
function renderObservationGroup(group,selected,chip){
 const count=group.sections.flatMap(section=>section.ids).filter(id=>selected.some(item=>item.id===id)).length;
 const open=state.openObservationGroups.includes(group.id);
 const sections=group.sections.map(section=>{
  const cards=section.ids.map(id=>OBSERVATIONS.find(o=>o.id===id)).filter(Boolean).map(chip).join('');
  return `<section class="observation-subgroup">${section.title?`<h4>${section.title}</h4>`:''}<div class="behavior-grid">${cards}</div></section>`;
 }).join('');
 return `<section class="observation-group"><button class="observation-group-toggle" data-observation-group="${group.id}" aria-expanded="${open}" aria-controls="observation-group-${group.id}"><span>${group.title}</span><span class="observation-group-meta">${count?`${count} noted`:''} ${icon(open?'minus':'arrow-down')}</span></button><div class="observation-group-body" id="observation-group-${group.id}" ${open?'':'hidden'}>${sections}</div></section>`;
}
function renderObservations(){
 const selected=selectedObservations(),tells=confirmedTells(),clues=diagnosticObservations(),pool=possible(),matches=behaviorMatches(pool),review=OBSERVATIONS.filter(o=>state.reviewTells?.includes(o.id)),reviewMechanics=state.reviewMechanics||[],result=$('#behaviorResult');
 $('#behaviorCount').textContent=`${selected.length} NOTED`;
 result.hidden=!selected.length&&!review.length&&!reviewMechanics.length;
 if(!result.hidden){
  const unavailable=selected.filter(o=>filteringMode()===0&&o.requiresEvidence);
  const parts=[];
  if(reviewMechanics.length)parts.push('Older ambiguous door/firelight notes were cleared.');
  if(review.length)parts.push(`${review.length} older tell${review.length===1?'':'s'} need confirmation.`);
  if(tells.length)parts.push(`${pool.length} possible · ${tells.length} tell${tells.length===1?'':'s'} logged.`);
  if(clues.length)parts.push(`${matches.length} ranked by ${clues.length} clue${clues.length===1?'':'s'}.`);
  if(!tells.length&&!clues.length&&selected.length)parts.push('Note logged.');
  if(unavailable.length)parts.push('Evidence-linked observations cannot occur at zero normal evidence.');
  result.textContent=parts.join(' ');
 }
 const activeGhosts=new Set(pool.map(g=>g.name));
 const narrowed=pool.length<GHOSTS.length;
 const inactive=o=>!state.showAllObservations&&!observationRelevant(o,selected.includes(o)&&o.kind==='confirmed'?evidencePossible():pool,selected.includes(o));
 const dimmed=o=>narrowed&&!state.showAllObservations&&inactive(o);
 const scope=$('#observationScope');scope.hidden=!narrowed;
 scope.querySelectorAll('[data-observation-scope]').forEach(b=>{const active=(b.dataset.observationScope==='all')===state.showAllObservations;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});
 const allGroupsOpen=OBSERVATION_GROUPS.every(group=>state.openObservationGroups.includes(group.id));
 const expandToggle=$('#observationExpandToggle');expandToggle.querySelector('span').textContent=allGroupsOpen?'Collapse all':'Expand all';expandToggle.setAttribute('aria-label',allGroupsOpen?'Collapse all behavior groups':'Expand all behavior groups');expandToggle.setAttribute('aria-expanded',allGroupsOpen);
 const names=ghosts=>ghosts.map(name=>`<span class="behavior-ghost-name${activeGhosts.has(name)?' in-play':''}">${name}</span>`).join(', ');
 const ghostNames=o=>o.excludes?.length?`Rules out: ${names(o.excludes)}`:o.fits?.length?`Narrows to: ${names(o.fits)}`:o.leads.length?names(o.leads):'General note · no specific ghost';
 const chip=o=>o.id==='fire_blowout'?`<div class="firelight-card ${state.fireBlowouts?'active':''} ${inactive(o)?'is-inactive':''} ${dimmed(o)?'not-relevant':''}"><div class="firelight-heading"><span class="behavior-icon">${icon(o.icon)}</span><span class="behavior-copy"><span>${o.label}</span>${state.showGhostLabels?`<small class="behavior-ghosts">${ghostNames(o)}</small>`:''}</span></div><div class="firelight-counter" role="group" aria-label="Ghost-caused firelight blowouts"><button data-fire-minus aria-label="Remove one firelight blowout" ${state.fireBlowouts===0||inactive(o)?'disabled':''}>−</button><strong>${state.fireBlowouts} / 3</strong><button data-fire-plus aria-label="Record one firelight blowout" ${state.fireBlowouts===3||inactive(o)?'disabled':''}>+</button></div>${state.fireBlowouts>=3?'<small class="firelight-followup">Three blowouts: watch for a hunt attempt. Blowouts alone do not identify Onryo.</small>':''}</div>`:`<button class="behavior-chip ${selected.includes(o)?'active':''} ${inactive(o)?'is-inactive':''} ${dimmed(o)?'not-relevant':''}" data-observation="${o.id}" aria-pressed="${selected.includes(o)}" ${inactive(o)?'disabled':''} title="${o.tip}"><span class="behavior-icon">${icon(o.icon)}</span><span class="behavior-copy"><span>${o.label}</span>${state.showGhostLabels?`<small class="behavior-ghosts">${ghostNames(o)}</small>`:''}</span><span class="behavior-check">${selected.includes(o)?icon('check'):''}</span></button>`;
 const labelsToggle=$('#ghostLabelsToggle');labelsToggle.setAttribute('aria-pressed',state.showGhostLabels);labelsToggle.setAttribute('aria-label',state.showGhostLabels?'Hide ghost labels':'Show ghost labels');labelsToggle.querySelector('span').textContent=state.showGhostLabels?'Hide ghosts':'Show ghosts';document.body.classList.toggle('show-ghost-labels',state.showGhostLabels);
 $('#behaviorList').innerHTML=`${review.length?`<p class="behavior-review">Previously noted: ${review.map(o=>o.label).join(' · ')}. Select a tell again only if the exact event was observed.</p>`:''}${OBSERVATION_GROUPS.map(group=>renderObservationGroup(group,selected,chip)).join('')}${selected.length?`<details class="behavior-guidance"><summary>Sources & detailed notes</summary>${selected.map(o=>{const source=o.source||(o.leads.length===1?GHOSTS.find(g=>g.name===o.leads[0])?.sourceUrl:'https://phasmophobia.fandom.com/wiki/Guides/Identifying_ghosts');return `<p><b>${o.label}:</b> ${o.tip} <a href="${source}" target="_blank" rel="noopener">Community source ↗</a></p>`}).join('')}</details>`:''}`;
 updateObservationToolbar();
}
function sanitySection(g){
 const profile=sanityProfile(g.name);
 const rows=EVENT_TYPES.map(type=>`<div class="sanity-event-row"><span>${type.label}</span><strong class="${profile.eventLoss[type.id]==='Cannot occur'?'unavailable':''}">${profile.eventLoss[type.id]}</strong></div>`).join('');
 return `<section class="detail-section sanity-section"><h3>SANITY</h3><p class="sanity-ability">${profile.ability}</p><div class="sanity-event-heading">GHOST EVENT CONTACT</div><p class="sanity-condition">Loss applies if the event's target touches the ghost or mist and ends that event. Just seeing it, hearing it or a hiss does not cause this instant loss.</p><div class="sanity-events">${rows}</div><p class="sanity-condition">Standing = the ghost appears and stays in one spot. Red lights or shattering lights are variants.</p>${profile.note?`<p class="sanity-exception">${profile.note}</p>`:''}<p class="sanity-sources">Sources: <a href="${SANITY_SOURCES.sanity}" target="_blank" rel="noopener">sanity ↗</a> · <a href="${SANITY_SOURCES.events}" target="_blank" rel="noopener">ghost events ↗</a></p></section>`;
}
function renderList(){
 const pool=possible(),tells=confirmedTells(),clues=diagnosticObservations(),q=$('#search').value.trim().toLowerCase();
 let list=state.filter==='all'?GHOSTS:pool;
 list=list.filter(g=>(g.name+' '+g.tell+' '+g.evidence.map(short).join(' ')).toLowerCase().includes(q));
 if(clues.length)list.sort((a,b)=>Number(pool.includes(b))-Number(pool.includes(a))||leadScore(b)-leadScore(a)||a.name.localeCompare(b.name));
 $('#count').textContent=pool.length;$('#countLabel').textContent='possible ghosts';$('#navCount').textContent=pool.length;$('#possibleCount').textContent=pool.length;$('#allCount').textContent=GHOSTS.length;
 const baseSummary=pool.length===0?'No match. Recheck confirmed tells, evidence or an elimination.':found().length?`${found().map(short).join(' + ')} recorded · ${state.mode} evidence mode`:state.excluded.length?`${state.excluded.length} manually ruled out · ${state.mode} evidence mode`:tells.length?'Confirmed tells recorded':'Start with a finding, or browse the full fieldbook.';
 const matchingCount=behaviorMatches(pool).length;
 $('#summary').textContent=baseSummary+(state.gender?` · ${state.gender==='male'?'Male':'Female'} ghost noted`:'')+(tells.length&&(found().length||state.excluded.length)?` · ${tells.length} confirmed tell${tells.length===1?'':'s'} applied`:'')+(clues.length?` · ${matchingCount} ghost${matchingCount===1?'':'s'} with matching clues ranked first`:tells.length?' · all remaining ghosts fit · sorted A–Z':selectedObservations().length?' · broad behavior logged':'');
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===state.filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});
 $('#ghostList').innerHTML=list.length?list.map(g=>{
  const isOut=state.excluded.includes(g.name),comp=compatible(g),matched=matchedObservations(g),open=state.expanded===g.name;
  return `<article class="ghost-row ${open?'selected expanded':''} ${isOut?'eliminated':''} ${!pool.includes(g)?'incompatible':''}" data-ghost="${g.name}"><button class="ghost-main" data-select="${g.name}" aria-expanded="${open}" aria-label="${g.name} field notes"><span class="ghost-summary"><span class="ghost-name">${g.name}</span><span class="ghost-evidence">${g.evidence.map(e=>tag(e,g)).join('')}${g.name==='The Mimic'?`<span class="e-tag${state.evidence.orbs===1?' match':''}">+ Orbs</span>`:''}${matchedConfirmed(g).length?'<span class="behavior-match">Confirmed tell</span>':''}${matched.length?`<span class="behavior-match">${matched.length} clue${matched.length===1?'':'s'} match</span>`:clues.length&&g.name==='The Mimic'?'<span class="behavior-match">Can imitate</span>':''}</span></span><span class="ghost-stats"><span class="row-stat"><span class="row-stat-label">HUNT SPEED</span><strong>${g.speed}</strong></span><span class="row-stat ${g.blink==='Standard'?'':'blink-distinct'}"><span class="row-stat-label">HUNT BLINK</span><strong>${blinkLabel(g)}</strong></span><span class="row-stat"><span class="row-stat-label">HUNT SANITY</span><strong>${g.threshold}</strong></span></span></button><button class="ghost-row-exclude ${isOut?'active':''}" data-exclude="${g.name}" aria-label="${isOut?'Restore':'Rule out'} ${g.name}" title="${isOut?'Restore':'Rule out'} ${g.name}" aria-pressed="${isOut}">${icon(isOut?'rotate-ccw':'x')}</button>${open?`<div class="ghost-expand" role="region" aria-label="${g.name} field notes">${ghostDetails(g)}</div>`:''}</article>`;
 }).join(''):`<div class="empty">${pool.length===0&&tells.length?'No ghost fits all confirmed tells and evidence. Untap a tell or recheck evidence.':'No ghosts in this view. Try clearing a filter or search.'}</div>`;
}
function detailEvidenceTile(id,ghost){
 const evidence=EVIDENCE.find(item=>item.id===id);
 const status=state.evidence[id]===1?'FOUND':state.evidence[id]===-1?'RULED OUT':ghost.forced.includes(id)?'GUARANTEED*':'';
 return `<div class="detail-evidence-tile ${state.evidence[id]===1?'match':state.evidence[id]===-1?'ruled-out':''} ${ghost.forced.includes(id)?'forced':''}"><span class="detail-evidence-icon">${icon(evidenceIcons[id])}</span><strong>${evidence.name}</strong>${status?`<small>${status}</small>`:''}</div>`;
}
function videoTestsSection(ghost){
 const notes=VIDEO_TESTS.filter(item=>item.ghost===ghost.name);
 if(!notes.length)return '';
 return `<section class="detail-section pro-guide"><h3>PRO FIELD TESTS</h3><p class="pro-guide-intro">Set up the test, then use only the stated result. A missed or uncertain observation does not eliminate a ghost.</p>${notes.map(item=>`<article class="pro-test"><div class="pro-test-heading"><strong>${item.title}</strong><span>${item.outcome}</span></div><p>${item.text}</p><div class="pro-test-sources">${item.time?`<a href="${videoLink(item.time)}" target="_blank" rel="noopener">Video ${item.time} ↗</a> · `:''}<a href="${ghost.sourceUrl}" target="_blank" rel="noopener">Mechanics source ↗</a></div></article>`).join('')}</section>`;
}
function videoBasicsSection(){return `<details class="video-basics"><summary>Field guide: how to trust a test</summary>${VIDEO_BASICS.map(item=>`<article><strong>${item.title}</strong><p>${item.text}</p><small><a href="${videoLink(item.time)}" target="_blank" rel="noopener">Video ${item.time} ↗</a> · <a href="${item.source}" target="_blank" rel="noopener">Mechanics source ↗</a></small></article>`).join('')}</details>`;}
function ghostDetails(g){const number=String(GHOSTS.indexOf(g)+1).padStart(2,'0');const fitting=selectedObservations().filter(o=>o.kind==='confirmed'?tellAllows(o,g):o.leads.includes(g.name)||(g.name==='The Mimic'&&o.leads.length>0));const timing=huntTiming(g);const stat=(label,value,detail='')=>`<div class="stat"><small>${label}</small><strong>${value}</strong>${detail?`<span class="stat-detail">${detail}</span>`:''}</div>`;return `<div class="detail-top"><span class="serial">FILE ${number} / ${GHOSTS.length}</span><h2>${g.name}</h2><div class="sub">${compatible(g)?'Matches current evidence settings':'Conflicts with current evidence settings'}${confirmedTells().length?possible().includes(g)?' · matches confirmed tells':' · conflicts with a confirmed tell':''}${state.excluded.includes(g.name)?' · manually ruled out':''}</div><div class="source-badge">Community wiki reviewed 14 Oct 2026 · patch v0.19.1.0</div></div><div class="hero-stat">${stat('HUNT SPEED',g.speed)}${stat('HUNT BLINK',blinkLabel(g),'How visible it appears')}${stat('HUNT SANITY',g.threshold)}${stat('AFTER INCENSE',timing.incense,'Earliest regular hunt after ghost is affected')}${stat('CRUCIFIX RANGE',timing.crucifix,'Normal tiers: 3 / 4 / 5 m')}</div><p class="hunt-timing-note">Incense time is the earliest regular hunt, not a scheduled hunt. *Mimic can copy another ghost’s timing; Gallu crucifix range changes with state. <a href="https://phasmophobia.fandom.com/wiki/Hunt" target="_blank" rel="noopener">Hunt source ↗</a> · <a href="https://phasmophobia.fandom.com/wiki/Incense" target="_blank" rel="noopener">Incense source ↗</a> · <a href="https://phasmophobia.fandom.com/wiki/Crucifix" target="_blank" rel="noopener">Crucifix source ↗</a></p><section class="detail-section evidence-detail-section"><h3>EVIDENCE</h3><div class="detail-evidence">${g.evidence.map(id=>detailEvidenceTile(id,g)).join('')}</div>${g.name==='The Mimic'?`<div class="detail-extra-orbs ${state.evidence.orbs===1?'match':''}">${icon('circle-dot')}<span><strong>Extra Ghost Orbs</strong><small>Always appears, even at zero evidence</small></span></div>`:''}${g.forced.length?'<p class="detail-evidence-note">Guaranteed tiles stay available when the game gives 1 or 2 normal evidence.</p>':''}</section><section class="detail-section ability-section"><h3>ABILITY</h3><p>${g.ability}</p></section>${sanitySection(g)}${fitting.length?`<section class="detail-section"><h3>YOUR OBSERVATIONS</h3><div class="observation-tags">${fitting.map(o=>`<span class="observation-tag">${o.label}</span>`).join('')}</div></section>`:''}<section class="detail-section"><h3>TRY THIS</h3><p>${g.test}</p></section>${videoTestsSection(g)}<section class="detail-section"><h3>SOURCES & ISSUES</h3><p>Mechanics summarized from <a href="${g.sourceUrl}?oldid=${g.sourceRevision}" target="_blank" rel="noopener">community wiki revision ${g.sourceRevision} ↗</a>, reviewed ${g.reviewedAt}. <a href="https://kineticgames.co.uk/news/phasmophobia-v01910-patch-notes" target="_blank" rel="noopener">Official ${g.reviewedPatch} notes ↗</a> were also checked. These sources do not independently confirm every game behavior.${g.knownIssue?`<span class="issue-note">Reported issue: ${g.knownIssue}</span>`:''}</p></section>${g.note?`<section class="detail-section"><h3>FIELD NOTE</h3><p>${g.note}</p></section>`:''}`;}
const QUICK_CHECKS=[
 {id:'light_switch',observation:'lights_off',name:'Try the light switch',phase:'While gathering evidence',ghosts:['Mare'],description:'Turn on a light in the ghost’s room and watch for an immediate switch-off. Repeat it; another ghost can do this by chance.',signal:'Mare clue',source:'Mare'},
 {id:'room_light_watch',observation:'room_light_on',name:'Watch for a room light turning on',phase:'While gathering evidence',ghosts:['Mare'],description:'If an ordinary powered room light turns on by itself, with no player at its switch, mark “Saw it” to rule out Mare. TVs, computers, motion-activated lights and the breaker do not count.',signal:'Rules out Mare',source:'Mare'},
 {id:'parabolic',observation:'para_scream',name:'Sweep with the parabolic mic',phase:'While gathering evidence',ghosts:['Banshee'],description:'Aim it through the ghost’s area and listen for the distinctive scream. No scream on one pass tells you little.',signal:'Banshee clue',source:'Banshee'},
 {id:'salt_motion',observation:'salt_untouched',name:'Pair salt with a motion sensor',phase:'While gathering evidence',ghosts:['Wraith','Gallu'],description:'If the sensor confirms a crossing but the salt stays untouched, consider Wraith or an enraged Gallu. A Gallu may enter that state after salt, incense or a crucifix.',signal:'Wraith / Gallu clue',source:'Salt'},
 {id:'object_pile',observation:'multi_throw',name:'Set out a few loose objects',phase:'While gathering evidence',ghosts:['Poltergeist'],description:'Spread small piles around the ghost room. Mark “Saw it” only if several items fly in one simultaneous burst, not separate throws.',signal:'Poltergeist / Mimic tell',source:'Poltergeist'},
 {id:'exit_door_watch',observation:'yurei_exit',name:'Watch the front exit door',phase:'While gathering evidence',ghosts:['Yurei','The Mimic'],description:'If the ghost is near an entrance, watch an open exit door. Mark “Saw it” only if it closes with no hunt or ghost event. A room door closing does not count, regardless of speed; a missed exit-door close rules out nothing.',signal:'Yurei / Mimic tell',source:'Exit_Door'},
 {id:'favorite_room_change',observation:'favorite_room_changed',name:'Confirm the favorite room',phase:'While gathering evidence',ghosts:['Goryo'],description:'Check the Haunted Mirror twice, or confirm a sustained cold-room/orb move. A natural change rules out Goryo. Roaming and a Monkey Paw sanity wish do not count.',signal:'Rules out Goryo',source:'Goryo'},
 {id:'yurei_smudge_roam',observation:'yurei_roam_incense',name:'Track a ghost after incense',phase:'While gathering evidence',ghosts:['Yurei'],description:'After incense definitely affects the ghost, put sensors at its favorite-room exits. A real roam out within 90 seconds rules out Yurei; event teleports do not.',signal:'Rules out Yurei',source:'Yurei'},
 {id:'polter_nonthrow',observation:'dirty_water',name:'Watch sink or shower water',phase:'While gathering evidence',ghosts:['Poltergeist'],description:'A confirmed ghost-caused dirty-water interaction rules out Poltergeist under the current interaction rules. Check that a player did not run the tap.',signal:'Rules out Poltergeist',source:'Poltergeist'},
 {id:'shade_event',observation:'singing_event',name:'Identify a singing event',phase:'While gathering evidence',ghosts:['Shade'],description:'A real singing ghost event rules out Shade. An ordinary hunt vocalization or background sound does not.',signal:'Rules out Shade',source:'Shade'},
 {id:'hantu_breaker',observation:'breaker_on',name:'Watch the breaker switch on',phase:'While gathering evidence',ghosts:['Hantu'],description:'If the ghost turns an off breaker on, Hantu is excluded. Ask teammates before counting it.',signal:'Rules out Hantu',source:'Hantu'},
 {id:'goryo_camera_check',observation:'goryo_camera',name:'Compare D.O.T.S. on camera',phase:'While gathering evidence',ghosts:['Goryo'],requiresEvidence:'dots',description:'Leave the ghost room. If the same D.O.T.S. pass appears on camera but is invisible by direct sight, that identifies Goryo. A missed pass proves nothing.',signal:'Goryo tell',source:'Goryo'},
 {id:'demon_incense_check',observation:'demon_incense',name:'Time an early hunt after incense',phase:'While gathering evidence',ghosts:['Demon'],description:'After incense affects the ghost, a regular hunt between 60 and 90 seconds points to Demon. Cursed hunts and uncertain timing do not count.',signal:'Demon clue',source:'Incense'},
 {id:'spirit_incense_check',observation:'spirit_incense',name:'Watch for 180 seconds without a hunt',phase:'While gathering evidence',ghosts:['Spirit'],description:'After incense affects the ghost, Spirit cannot start a regular hunt for 180 seconds. A long quiet period supports Spirit but proves nothing by itself.',signal:'Spirit clue',source:'Incense'},
 {id:'thaye_age_check',observation:'thaye_aging',name:'Compare hunts after time nearby',phase:'While gathering evidence',ghosts:['Thaye'],description:'Spend time near the ghost between hunts. If its starting footsteps steadily slow over several hunts, consider Thaye; Obambo switches between two states instead.',signal:'Thaye clue',source:'Thaye'},
 {id:'rev_steps',observation:'revenant_roam',name:'Listen to roaming footsteps',phase:'During a hunt',ghosts:['Revenant'],description:'From a safe hiding spot, listen for unusually slow roaming steps. A Revenant becomes dramatically faster after detecting a player.',signal:'Revenant clue',source:'Revenant'},
 {id:'deogen_distance_check',observation:'deogen_near',name:'Listen for Deogen slowing nearby',phase:'During a hunt',ghosts:['Deogen'],description:'If it approaches you during a hunt, keep a large obstacle between you and it. Listen for fast distant footsteps slowing to a crawl as it gets close. Avoid a dead-end hiding spot.',signal:'Deogen clue',source:'Deogen'},
 {id:'raiju_power',observation:'raiju_electronics',name:'Compare electronics and speed',phase:'During a hunt',ghosts:['Raiju'],description:'With a safe hiding route, compare footsteps near active electronics with an area where devices are off. Raiju can speed up near powered gear.',signal:'Raiju clue',source:'Raiju'},
 {id:'gallu_state',observation:'gallu_states',name:'Compare Gallu states',phase:'During a hunt',ghosts:['Gallu'],description:'After a confirmed salt, incense or crucifix interaction, listen for a faster hunt and watch whether another salt pile stays untouched. Compare again after the next hunt.',signal:'Gallu clue',source:'Gallu'}
];
function ghostSpecificTests(pool,covered){if(!found().length&&!diagnosticObservations().length&&pool.length>8)return [];const highSignal={'The Mimic':19,Deogen:16,Revenant:15,Deildegast:14,Hantu:13,Wraith:12,Obake:12,Thaye:11,Raiju:10,Phantom:10,Poltergeist:10,Myling:9,'The Twins':9,Spirit:8};return pool.filter(g=>g.name==='The Mimic'||!covered.has(g.name)).map(g=>({name:g.name,description:g.test,score:(highSignal[g.name]||5)+behaviorScore(g)*4})).sort((a,b)=>b.score-a.score).slice(0,3);}
function timingVerdict(){
 if(timingGap==='')return 'Enter a gap to see what it tells you.';
 const seconds=Number(timingGap);
 if(!Number.isFinite(seconds)||seconds<0)return 'Enter a valid time in seconds.';
 if(timingBasis==='incense'){
  if(seconds<60)return 'Under 60s is too soon for a regular hunt after incense affected the ghost. Recheck the timing or a cursed hunt.';
  if(seconds<90)return '60–89s: Demon, or a Mimic copying Demon. A regular hunt this early rules out the usual 90s and Spirit 180s waits.';
  if(seconds<180)return '90–179s: rules out Spirit, assuming the incense affected the ghost. Other ghosts remain possible.';
  return '180s or more: any ghost can hunt. A long wait alone does not identify Spirit.';
 }
 if(seconds<20)return 'Under 20s is too soon after a regular hunt ends or a crucifix burns. Recheck the start point or a cursed hunt.';
 if(seconds<25)return '20–24s: supports Demon, or a Mimic copying its shorter cooldown.';
 return `${seconds}s: any ghost can wait this long. This gap does not identify a ghost.`;
}
function renderTimingVerdict(){const result=$('#timingVerdict');if(result)result.textContent=timingVerdict();}
function renderTests(){
 const pool=possible(),names=new Set(pool.map(g=>g.name)),mimicOnly=pool.length===1&&pool[0].name==='The Mimic',applicable=QUICK_CHECKS.filter(check=>!mimicOnly&&check.ghosts.some(name=>names.has(name))&&!(filteringMode()===0&&check.requiresEvidence)),checks=applicable.filter(check=>!state.observed.includes(check.observation)).sort((a,b)=>Number(state.checkTried.includes(a.id))-Number(state.checkTried.includes(b.id))),covered=new Set(applicable.flatMap(check=>check.ghosts)),leads=ghostSpecificTests(pool,covered);
 const quickHtml=checks.length?`<section class="next-section" id="quickChecks"><h3>Quick behavior checks</h3><p class="next-section-note">“Tried, no tell” records an attempt without eliminating a ghost.</p>${checks.map(check=>{const tried=state.checkTried.includes(check.id);return `<article class="test-card quick-check ${tried?'check-tried':''}"><span class="rank">${check.phase.toUpperCase()}</span><h4>${check.name}</h4><p>${check.description}</p><div class="split">${check.signal} · <a href="https://phasmophobia.fandom.com/wiki/${encodeURIComponent(check.source)}" target="_blank" rel="noopener">Community source ↗</a> · reviewed 14 Oct 2026 · patch v0.19.1.0</div><div class="check-actions" role="group" aria-label="${check.name} result"><button class="check-seen-btn" data-check-seen="${check.id}" aria-pressed="false">Saw it</button><button class="check-tried-btn ${tried?'active':''}" data-check-tried="${check.id}" aria-pressed="${tried}">${tried?'✓ Tried, no tell':'Tried, no tell'}</button></div></article>`}).join('')}</section>`:'';
 const leadsHtml=leads.length?`<section class="next-section"><h3>Other leads</h3>${leads.map(lead=>`<article class="test-card"><span class="rank">${lead.name.toUpperCase()}</span><h4>Test for ${lead.name}</h4><p>${lead.description}</p></article>`).join('')}</section>`:'';
 $('#testsPanel').innerHTML=`<section class="next-section timing-check"><h3>Hunt timing</h3><p class="next-section-note">Measure from a crucifix burn or the end of a hunt to the next hunt attempt. For incense, start when it affects the ghost.</p><div class="timing-controls"><label for="timingBasis">FROM</label><select id="timingBasis" aria-label="Timing start"> <option value="attempt" ${timingBasis==='attempt'?'selected':''}>Crucifix burn / hunt end</option><option value="incense" ${timingBasis==='incense'?'selected':''}>Incense affected ghost</option></select><label for="timingGap">GAP</label><div class="timing-input"><input id="timingGap" type="number" min="0" step="1" inputmode="numeric" placeholder="60" value="${timingGap}" aria-label="Seconds until next hunt attempt"><span>seconds</span></div></div><p id="timingVerdict" class="timing-verdict" role="status">${timingVerdict()}</p><p class="timing-source">Minimum waits, not guaranteed hunt times. Cursed hunts can bypass them. <a href="https://phasmophobia.fandom.com/wiki/Hunt" target="_blank" rel="noopener">Hunt rules ↗</a> · <a href="https://phasmophobia.fandom.com/wiki/Incense" target="_blank" rel="noopener">Incense ↗</a></p></section>${videoBasicsSection()}<p class="test-intro">Next checks for ${pool.length} possible ghost${pool.length===1?'':'s'}. Logged findings leave this list; a missed tell does not rule a ghost out.</p>${quickHtml}${leadsHtml}${!quickHtml&&!leadsHtml?'<div class="empty">No more targeted checks. Review your findings or show all observations in Investigation.</div>':''}`;
}
function render(){derived={};clearIrrelevantObservations();renderEvidence();renderObservations();renderList();renderTests();renderView();persist();}
let renderQueued=false;
function scheduleRender(){
 if(renderQueued)return;
 renderQueued=true;
 // Let the updated card paint before rebuilding the lists on a later frame.
 requestAnimationFrame(()=>requestAnimationFrame(()=>{renderQueued=false;render();}));
}
function markObservation(button,active){button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));button.querySelector('.behavior-check').innerHTML=active?icon('check'):'';}
function markEvidence(button,value){button.classList.toggle('yes',value===1);button.classList.toggle('no',value===-1);button.setAttribute('aria-pressed',String(value!==0));button.setAttribute('aria-label',`${EVIDENCE.find(e=>e.id===button.dataset.evidence).name}: ${value===1?'found':value===-1?'ruled out':'unknown'}`);button.querySelector('.state').innerHTML=icon(value===1?'check':value===-1?'x':'minus');}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2500)}
function toggleGhost(name){state.expanded=state.expanded===name?null:name;renderList();persist();}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b){const row=e.target.closest('.ghost-row');if(row&&!e.target.closest('.ghost-expand, a'))toggleGhost(row.dataset.ghost);return;}
 if(b.hasAttribute('data-fire-plus')||b.hasAttribute('data-fire-minus')){state.fireBlowouts=Math.max(0,Math.min(3,state.fireBlowouts+(b.hasAttribute('data-fire-plus')?1:-1)));state.observed=state.fireBlowouts?Array.from(new Set([...state.observed,'fire_blowout'])):state.observed.filter(id=>id!=='fire_blowout');render();return;}
 if(b.dataset.observationGroup){const id=b.dataset.observationGroup;state.openObservationGroups=state.openObservationGroups.includes(id)?state.openObservationGroups.filter(x=>x!==id):[...state.openObservationGroups,id];renderObservations();persist();return;}
 if(b.id==='observationExpandToggle'){state.openObservationGroups=OBSERVATION_GROUPS.every(group=>state.openObservationGroups.includes(group.id))?[]:OBSERVATION_GROUPS.map(group=>group.id);renderObservations();persist();return;}
 if(b.dataset.observationScope){state.showAllObservations=b.dataset.observationScope==='all';render();return;}
 if(b.dataset.checkSeen){const check=QUICK_CHECKS.find(c=>c.id===b.dataset.checkSeen);if(!check)return;state.reviewMechanics=state.reviewMechanics.filter(x=>x!==check.observation);state.observed=state.observed.includes(check.observation)?state.observed.filter(x=>x!==check.observation):[...state.observed,check.observation];state.reviewTells=state.reviewTells.filter(x=>x!==check.observation);state.checkTried=state.checkTried.filter(x=>x!==check.id);render();return;}
 if(b.dataset.checkTried){const check=QUICK_CHECKS.find(c=>c.id===b.dataset.checkTried);if(!check)return;state.reviewMechanics=state.reviewMechanics.filter(x=>x!==check.observation);state.checkTried=state.checkTried.includes(check.id)?state.checkTried.filter(x=>x!==check.id):[...state.checkTried,check.id];state.observed=state.observed.filter(x=>x!==check.observation);render();return;}
 if(b.dataset.observation){const key=b.dataset.observation;state.reviewMechanics=state.reviewMechanics.filter(x=>x!==key);state.observed=Array.isArray(state.observed)?state.observed:[];state.observed=state.observed.includes(key)?state.observed.filter(x=>x!==key):[...state.observed,key];state.reviewTells=state.reviewTells.filter(x=>x!==key);markObservation(b,state.observed.includes(key));scheduleRender();return;}
 if(b.id==='ghostLabelsToggle'){state.showGhostLabels=!state.showGhostLabels;renderObservations();persist();return;}
 if(b.id==='backToEvidence'){investigationPanel.scrollTo({top:0,behavior:'smooth'});return;}
 if(b.dataset.evidence){const key=b.dataset.evidence;state.evidence[key]=state.evidence[key]===1?-1:state.evidence[key]===-1?0:1;markEvidence(b,state.evidence[key]);scheduleRender();return;}
 if(b.dataset.mode){state.mode=Number(b.dataset.mode);render();return;}
 if(b.dataset.gender){state.gender=state.gender===b.dataset.gender?null:b.dataset.gender;render();return;}
 if(b.dataset.filter){state.filter=b.dataset.filter;render();return;}
 if(b.dataset.select){toggleGhost(b.dataset.select);return;}
 if(b.dataset.exclude){const n=b.dataset.exclude;state.excluded=state.excluded.includes(n)?state.excluded.filter(x=>x!==n):[...state.excluded,n];render();return;}
 if(b.id==='resetBtn'){state=defaults();$('#search').value='';history.replaceState(null,'',location.pathname+location.search);render();toast('Investigation reset');return;}
 if(b.id==='shareBtn'){const share={mode:state.mode,gender:state.gender,evidence:state.evidence,observed:state.observed,fireBlowouts:state.fireBlowouts,rulesVersion:5,checkTried:state.checkTried,excluded:state.excluded,expanded:state.expanded,filter:state.filter};const url=location.origin+location.pathname+'#s='+encodeURIComponent(JSON.stringify(share));navigator.clipboard.writeText(url).then(()=>toast('Investigation link copied')).catch(()=>toast('Unable to copy link'));return;}
 if(b.dataset.view){switchView(b.dataset.view);return;}
});
pageTrack.addEventListener('scroll',()=>{if(!mobile())return;cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(updateNavPosition);clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{const view=views[Math.max(0,Math.min(views.length-1,Math.round(pageTrack.scrollLeft/pageTrack.clientWidth)))];if(state.view!==view){state.view=view;persist();}updateNavPosition();},160);},{passive:true});
function updateBackToEvidence(){backToEvidence.hidden=investigationPanel.scrollTop<320;updateObservationToolbar();}
function updateObservationToolbar(){
 const stuck=mobile()&&observationToolbar.getBoundingClientRect().top<=investigationPanel.getBoundingClientRect().top+1;
 observationToolbar.classList.toggle('is-stuck',stuck);
}
investigationPanel.addEventListener('scroll',updateBackToEvidence,{passive:true});
window.addEventListener('resize',()=>{if(mobile())renderView();updateObservationToolbar();});
$('#search').addEventListener('input',renderList);
document.addEventListener('input',e=>{if(e.target.id==='timingGap'){timingGap=e.target.value;renderTimingVerdict();}});
document.addEventListener('change',e=>{if(e.target.id==='timingBasis'){timingBasis=e.target.value;renderTimingVerdict();}});
render();
updateBackToEvidence();
