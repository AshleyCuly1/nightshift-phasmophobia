// Presentation order only. Observation IDs and their filtering rules stay in observations.js.
export const OBSERVATION_GROUPS = [
 {id:'events',title:'Ghost events & visuals',sections:[
  {title:'Ghost events',ids:['chasing_event','airball_event','singing_event','phantom_photo','phantom_visible_photo']},
  {title:'During hunts',ids:['shape_shift','hunting_breath','long_blink','visible_blink','rapid_blink']}
 ]},
 {id:'interactions',title:'Objects & interactions',sections:[
  {title:'Lights & power',ids:['room_light_on','lights_off','breaker_off','breaker_on']},
  {title:'Salt',ids:['salt_disturbed','gallu_second_salt','salt_untouched']},
  {title:'Fire & protection',ids:['fire_lit','fire_blowout','crucifix_burn']},
  {title:'Doors & rooms',ids:['yurei_exit','yurei_partial_door','favorite_room_changed','yurei_roam_incense']},
  {title:'Objects & prints',ids:['object_burst','multi_throw','shade_throw_player','dirty_water','window_knock','twins_pair','six_finger']}
 ]},
 {id:'equipment',title:'Tools & devices',sections:[
  {title:'Camera',ids:['goryo_camera','dots_direct','yurei_dots_incense']},
  {title:'Sound',ids:['para_scream','box_breath','moroi_curse']}
 ]},
 {id:'speed',title:'Hunt speed',sections:[
  {title:null,ids:['fast_hunt','slow_hunt','speed_jump','sight_accel','deogen_near','revenant_roam','dayan_movement','aswang_sight','thaye_aging','raiju_electronics','jinn_breaker','twins_speeds','deildegast_items','hantu_temperature','gallu_states','moroi_speed','obambo_short']}
 ]},
 {id:'hunt',title:'Other hunt clues',sections:[
  {title:'Hunt timing',ids:['early_hunt','demon_incense','spirit_incense']},
  {title:'Sound, tracking & patterns',ids:['quiet_hunt','kormos_footsteps','yokai_range','banshee_target','mimic_shift']}
 ]},
 {id:'activity',title:'General activity',sections:[
  {title:null,ids:['shy','aggressive','activity_cycle']}
 ]}
];
