const path = require('path');
const fs = require('fs');
const vm = require('vm');

const dataPath = path.join(__dirname, 'data.js');
const source = fs.readFileSync(dataPath, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const days = context.window.MARRYME_DAYS;
const allowedInteractionTypes = new Set([
  'runaway-no','shrinking-no','evasive-no','swapping-labels','growing-yes','leaning-choice','confirm-stack',
  'button-swap','layout-compress','multiplying-yes','fading-no','sentence-build','decorative-hide','card-deck-choice','finale-mix',
  'curtain-open','envelope-open','ribbon-untie','scratch-reveal','spotlight-reveal','fortune-cookie','polaroid-develop','balloon-lift','magnet-join','light-switch','wipe-fog','record-start','topper-rise','calendar-flip','heart-stamp','connect-dots','windup-open',
  'branch-merge','vote-bars','roulette-align','elevator-arrive','tab-converge','accordion-focus','progress-fill','slot-match','dual-flip','menu-sort','map-pin-zoom','bubble-merge','filter-funnel','playlist-queue','checklist-converge','timer-stop','dropdown-converge',
  'wave-timing','pendulum-stop','door-slide','final-piece','zip-up','metronome-tap','ring-fit','paper-fold-open','ripple-reveal','heartbeat-sync','carousel-center','thread-tie','folder-unfold','bell-ring','typing-spell','ladder-path','mobile-settle',
  'color-align','focus-slider','magnifier-read','shadow-match','mosaic-clear','mirror-wipe','frame-crop','film-overlay','rotate-shape','night-glow','slit-scan','bubble-pop','tape-peel','stamp-place','glow-trim','viewfinder-frame',
  'promise-board','petal-gather','candle-blow','wax-seal','key-turn','seat-pair','step-climb','wish-flight','ring-box','hands-together','umbrella-cover','bench-seat','dessert-plate','tag-attach','star-jar','photo-strip','heart-sign','ferris-wheel'
]);

const requiredStringFields = ['id','dayNumber','slug','title','subtitle','intro','proposalTitle','yesLabel','noLabel','successTitle','successBody'];
const optionalStringFields = ['proposalBody','successHint'];
const errors = [];

if (!Array.isArray(days) || days.length === 0) {
  errors.push('MARRYME_DAYS must be a non-empty array.');
}

const seenIds = new Set();
const seenSlugs = new Set();
const seenDayNumbers = new Set();

(days || []).forEach((day, index) => {
  const prefix = `Day index ${index}`;
  if (typeof day !== 'object' || day === null) {
    errors.push(`${prefix}: must be an object.`);
    return;
  }

  requiredStringFields.forEach((field) => {
    if (typeof day[field] !== 'string' || !day[field].trim()) {
      errors.push(`${prefix}: ${field} must be a non-empty string.`);
    }
  });

  optionalStringFields.forEach((field) => {
    if (field in day && typeof day[field] !== 'string') {
      errors.push(`${prefix}: ${field} must be a string when provided.`);
    }
  });

  if (!/^day-\d{3,}$/.test(day.slug || '')) errors.push(`${prefix}: slug must match day-001 style.`);
  if (!/^\d{3,}$/.test(day.dayNumber || '')) errors.push(`${prefix}: dayNumber must be zero-padded numeric text like 001.`);

  if (seenIds.has(day.id)) errors.push(`${prefix}: duplicate id '${day.id}'.`);
  seenIds.add(day.id);

  if (seenSlugs.has(day.slug)) errors.push(`${prefix}: duplicate slug '${day.slug}'.`);
  seenSlugs.add(day.slug);

  if (seenDayNumbers.has(day.dayNumber)) errors.push(`${prefix}: duplicate dayNumber '${day.dayNumber}'.`);
  seenDayNumbers.add(day.dayNumber);

  if (!Array.isArray(day.tags)) errors.push(`${prefix}: tags must be an array.`);

  if (!day.interaction || typeof day.interaction !== 'object') {
    errors.push(`${prefix}: interaction must be an object.`);
  } else {
    if (!allowedInteractionTypes.has(day.interaction.type)) {
      errors.push(`${prefix}: invalid interaction.type '${day.interaction.type}'.`);
    }
    if ('messages' in day.interaction && !Array.isArray(day.interaction.messages)) {
      errors.push(`${prefix}: interaction.messages must be an array when provided.`);
    }
    if ('options' in day.interaction && !Array.isArray(day.interaction.options)) {
      errors.push(`${prefix}: interaction.options must be an array when provided.`);
    }
  }
});

if (!errors.length) {
  console.log(`✓ Validation passed for ${days.length} day entries.`);
  process.exit(0);
}

console.error('Day data validation failed:');
errors.forEach((e) => console.error(`- ${e}`));
process.exit(1);
