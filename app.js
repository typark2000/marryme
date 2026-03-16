const allowedInteractionTypes = new Set(window.MARRYME_INTERACTION_TYPES || []);

function getDays() {
  return window.MARRYME_DAYS || [];
}

function validateDays(days) {
  const errors = [];
  const seenSlugs = new Set();

  if (!Array.isArray(days) || !days.length) {
    errors.push('No day data found.');
    return { valid: false, errors };
  }

  days.forEach((day, index) => {
    const prefix = `Day index ${index}`;
    if (!day || typeof day !== 'object') {
      errors.push(`${prefix}: invalid object.`);
      return;
    }
    if (!day.slug || typeof day.slug !== 'string') {
      errors.push(`${prefix}: missing slug.`);
    } else if (seenSlugs.has(day.slug)) {
      errors.push(`${prefix}: duplicate slug '${day.slug}'.`);
    } else {
      seenSlugs.add(day.slug);
    }
    if (!day.dayNumber || typeof day.dayNumber !== 'string') {
      errors.push(`${prefix}: missing dayNumber.`);
    }
    if (!day.interaction || !allowedInteractionTypes.has(day.interaction.type)) {
      errors.push(`${prefix}: invalid interaction type '${day?.interaction?.type}'.`);
    }
  });

  return { valid: errors.length === 0, errors };
}

function findDayBySlug(slug) {
  return getDays().find((day) => day.slug === slug);
}

function createProposalMarkup(day) {
  const interactionClass = `is-${day.interaction?.type || 'default'}`;
  return `<p class="eyebrow">DAY ${day.dayNumber}</p><h1>${day.title}</h1><p class="lead">${day.intro}</p><div class="proposal-stage ${interactionClass}" id="proposalStage"><div class="ring" aria-hidden="true">💍</div><h2>${day.proposalTitle}</h2><div class="actions" id="actionsArea"><button class="yes-button" id="yesButton" type="button">${day.yesLabel}</button><button class="no-button" id="noButton" type="button" aria-label="거절 버튼">${day.noLabel}</button></div><div class="dynamic-slot" id="dynamicSlot"></div></div>`;
}

function renderSuccessState(proposalStage, day) {
  proposalStage.innerHTML = `<div class="ring" aria-hidden="true">🎉</div><h2>${day.successTitle}</h2><p>${day.successBody}</p>`;
}

function getHandlerContext(root) {
  return {
    root,
    proposalStage: root.querySelector('#proposalStage'),
    actionsArea: root.querySelector('#actionsArea'),
    yesButton: root.querySelector('#yesButton'),
    noButton: root.querySelector('#noButton'),
    dynamicSlot: root.querySelector('#dynamicSlot'),
    renderSuccessState
  };
}

function attachSharedSuccessHandler(day, ctx) {
  ctx.yesButton.addEventListener('click', () => renderSuccessState(ctx.proposalStage, day));
}

function setupDayInteraction(day, root) {
  const ctx = getHandlerContext(root);
  attachSharedSuccessHandler(day, ctx);
  const handler = window.MarryMeInteractionHandlers?.handlers?.[day.interaction.type];
  if (handler) handler(day, ctx);
}

function renderProposalExperience(root, day) {
  root.innerHTML = createProposalMarkup(day);
  setupDayInteraction(day, root);
}

window.MarryMeApp = {
  allowedInteractionTypes,
  getDays,
  validateDays,
  findDayBySlug,
  renderProposalExperience
};
