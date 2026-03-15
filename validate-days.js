const path = require('path');
const fs = require('fs');
const vm = require('vm');

const dataPath = path.join(__dirname, 'data.js');
const source = fs.readFileSync(dataPath, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const days = context.window.MARRYME_DAYS;
const allowedInteractionTypes = new Set(['runaway-no', 'shrinking-no']);
const requiredStringFields = [
  'id',
  'dayNumber',
  'slug',
  'title',
  'subtitle',
  'intro',
  'proposalTitle',
  'proposalBody',
  'yesLabel',
  'noLabel',
  'hintDefault',
  'calmHint',
  'calmRejectMessage',
  'successTitle',
  'successBody',
  'successHint'
];

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

  if (!/^day-\d{3,}$/.test(day.slug || '')) {
    errors.push(`${prefix}: slug must match day-001 style.`);
  }

  if (!/^\d{3,}$/.test(day.dayNumber || '')) {
    errors.push(`${prefix}: dayNumber must be zero-padded numeric text like 001.`);
  }

  if (seenIds.has(day.id)) {
    errors.push(`${prefix}: duplicate id '${day.id}'.`);
  }
  seenIds.add(day.id);

  if (seenSlugs.has(day.slug)) {
    errors.push(`${prefix}: duplicate slug '${day.slug}'.`);
  }
  seenSlugs.add(day.slug);

  if (seenDayNumbers.has(day.dayNumber)) {
    errors.push(`${prefix}: duplicate dayNumber '${day.dayNumber}'.`);
  }
  seenDayNumbers.add(day.dayNumber);

  if (!Array.isArray(day.tags)) {
    errors.push(`${prefix}: tags must be an array.`);
  }

  if (!day.interaction || typeof day.interaction !== 'object') {
    errors.push(`${prefix}: interaction must be an object.`);
  } else {
    if (!allowedInteractionTypes.has(day.interaction.type)) {
      errors.push(
        `${prefix}: interaction.type '${day.interaction.type}' is invalid. Allowed: ${[
          ...allowedInteractionTypes
        ].join(', ')}`
      );
    }

    if (!Array.isArray(day.interaction.messages) || day.interaction.messages.length === 0) {
      errors.push(`${prefix}: interaction.messages must be a non-empty array.`);
    }
  }
});

if (!errors.length) {
  console.log(`✓ Validation passed for ${days.length} day entries.`);
  process.exit(0);
}

console.error('Day data validation failed:');
for (const error of errors) {
  console.error(`- ${error}`);
}
process.exit(1);
