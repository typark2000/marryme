const allowedInteractionTypes = new Set(['runaway-no', 'shrinking-no']);

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

  return {
    valid: errors.length === 0,
    errors
  };
}

function findDayBySlug(slug) {
  const days = getDays();
  return days.find((day) => day.slug === slug);
}

function createProposalMarkup(day) {
  const interactionClass = day.interaction?.type === 'shrinking-no' ? 'is-shrinking-no' : '';

  return `
    <p class="eyebrow">DAY ${day.dayNumber}</p>
    <h1>${day.title}</h1>
    <p class="lead">${day.intro}</p>

    <div class="proposal-stage ${interactionClass}" id="proposalStage">
      <div class="ring" aria-hidden="true">💍</div>
      <h2>${day.proposalTitle}</h2>
      <p>${day.proposalBody}</p>

      <div class="actions" id="actionsArea">
        <button class="yes-button" id="yesButton" type="button">${day.yesLabel}</button>
        <button class="no-button" id="noButton" type="button" aria-label="거절 버튼">${day.noLabel}</button>
      </div>

      <p class="hint" id="hint" aria-live="polite">${day.hintDefault}</p>
    </div>
  `;
}

function setupDayInteraction(day, root) {
  const noButton = root.querySelector('#noButton');
  const yesButton = root.querySelector('#yesButton');
  const proposalStage = root.querySelector('#proposalStage');
  const hint = root.querySelector('#hint');

  let shrinkStep = 0;

  function randomMessage() {
    const list = day.interaction.messages || [day.hintDefault];
    return list[Math.floor(Math.random() * list.length)];
  }

  function moveRunawayButton(event) {
    if (event) event.preventDefault();

    const stageRect = proposalStage.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    const maxX = Math.max(16, stageRect.width - buttonRect.width - 16);
    const maxY = Math.max(16, stageRect.height - buttonRect.height - 16);

    noButton.style.left = `${Math.max(16, Math.random() * maxX)}px`;
    noButton.style.top = `${Math.max(16, Math.random() * maxY)}px`;
    hint.textContent = randomMessage();
  }

  function shrinkNoButton(event) {
    if (event && event.type === 'click') event.preventDefault();

    shrinkStep += 1;
    const scale = Math.max(0.12, 1 - shrinkStep * 0.12);
    noButton.style.transform = `scale(${scale})`;
    hint.textContent = randomMessage();
  }

  function activateNoInteraction(event) {
    if (day.interaction.type === 'runaway-no') {
      moveRunawayButton(event);
      return;
    }

    if (day.interaction.type === 'shrinking-no') {
      shrinkNoButton(event);
    }
  }

  ['mouseenter', 'touchstart', 'focus'].forEach((eventName) => {
    noButton.addEventListener(eventName, activateNoInteraction, { passive: true });
  });

  noButton.addEventListener('click', (event) => {
    activateNoInteraction(event);

    if (day.rejectMessage) {
      hint.textContent = day.rejectMessage;
    }
  });

  yesButton.addEventListener('click', () => {
    proposalStage.innerHTML = `
      <div class="ring" aria-hidden="true">🎉</div>
      <h2>${day.successTitle}</h2>
      <p>${day.successBody}</p>
      <p class="hint">${day.successHint}</p>
    `;
  });
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
