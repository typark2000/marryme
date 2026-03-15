const allowedInteractionTypes = new Set([
  'runaway-no',
  'shrinking-no',
  'evasive-no',
  'swapping-labels',
  'growing-yes',
  'leaning-choice',
  'confirm-stack'
]);

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
  return getDays().find((day) => day.slug === slug);
}

function createProposalMarkup(day) {
  const interactionClass = `is-${day.interaction?.type || 'default'}`;
  const proposalBody = day.proposalBody ? `<p>${day.proposalBody}</p>` : '';

  return `
    <p class="eyebrow">DAY ${day.dayNumber}</p>
    <h1>${day.title}</h1>
    <p class="lead">${day.intro}</p>

    <div class="proposal-stage ${interactionClass}" id="proposalStage">
      <div class="ring" aria-hidden="true">💍</div>
      <h2>${day.proposalTitle}</h2>
      ${proposalBody}

      <div class="actions" id="actionsArea">
        <button class="yes-button" id="yesButton" type="button">${day.yesLabel}</button>
        <button class="no-button" id="noButton" type="button" aria-label="거절 버튼">${day.noLabel}</button>
      </div>
    </div>
  `;
}

function renderSuccessState(proposalStage, day) {
  const successHint = day.successHint ? `<p class="hint">${day.successHint}</p>` : '';
  proposalStage.innerHTML = `
    <div class="ring" aria-hidden="true">🎉</div>
    <h2>${day.successTitle}</h2>
    <p>${day.successBody}</p>
    ${successHint}
  `;
}

function getHandlerContext(root) {
  return {
    root,
    proposalStage: root.querySelector('#proposalStage'),
    actionsArea: root.querySelector('#actionsArea'),
    yesButton: root.querySelector('#yesButton'),
    noButton: root.querySelector('#noButton')
  };
}

function attachSharedSuccessHandler(day, ctx) {
  ctx.yesButton.addEventListener('click', () => renderSuccessState(ctx.proposalStage, day));
}

function handleRunawayNo(day, ctx) {
  function move(event) {
    if (event) event.preventDefault();

    ctx.proposalStage.classList.add('runaway-active');

    const stageRect = ctx.proposalStage.getBoundingClientRect();
    const buttonRect = ctx.noButton.getBoundingClientRect();
    const minX = 16;
    const minY = 140;
    const maxX = Math.max(minX, stageRect.width - buttonRect.width - 16);
    const maxY = Math.max(minY, stageRect.height - buttonRect.height - 16);
    const nextX = minX + Math.random() * Math.max(0, maxX - minX);
    const nextY = minY + Math.random() * Math.max(0, maxY - minY);

    ctx.noButton.style.left = `${nextX}px`;
    ctx.noButton.style.top = `${nextY}px`;
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, move, { passive: eventName !== 'click' });
  });
}

function handleShrinkingNo(day, ctx) {
  let shrinkStep = 0;

  function shrink(event) {
    if (event && event.type === 'click') event.preventDefault();
    shrinkStep += 1;
    const scale = Math.max(0.12, 1 - shrinkStep * 0.12);
    ctx.noButton.style.transform = `scale(${scale})`;
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, shrink, { passive: eventName !== 'click' });
  });
}

function handleEvasiveNo(day, ctx) {
  let direction = 1;
  function evade(event) {
    if (event) event.preventDefault();
    const offset = direction * 72;
    direction *= -1;
    ctx.noButton.style.transform = `translateX(${offset}px)`;
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, evade, { passive: eventName !== 'click' });
  });
}

function handleSwappingLabels(day, ctx) {
  const labels = day.interaction.options || [day.noLabel];
  let index = 0;

  function swap(event) {
    if (event && event.type === 'click') event.preventDefault();
    index = Math.min(index + 1, labels.length - 1);
    ctx.noButton.textContent = labels[index];
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, swap, { passive: eventName !== 'click' });
  });
}

function handleGrowingYes(day, ctx) {
  let growStep = 0;

  function grow(event) {
    if (event && event.type === 'click') event.preventDefault();
    growStep = Math.min(growStep + 1, 5);
    const scale = 1 + growStep * 0.12;
    ctx.yesButton.style.transform = `scale(${scale})`;
    ctx.yesButton.style.boxShadow = '0 20px 36px rgba(255, 77, 141, 0.32)';
    ctx.noButton.style.opacity = `${Math.max(0.35, 1 - growStep * 0.12)}`;
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, grow, { passive: eventName !== 'click' });
  });
}

function handleLeaningChoice(day, ctx) {
  ctx.proposalStage.classList.add('leaning-active');

  function tilt(event) {
    if (event && event.type === 'click') event.preventDefault();
    ctx.yesButton.style.transform = 'scale(1.08)';
    ctx.noButton.style.transform = 'scale(0.92)';
    ctx.noButton.style.opacity = '0.78';
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, tilt, { passive: eventName !== 'click' });
  });
}

function handleConfirmStack(day, ctx) {
  function openConfirm(event) {
    if (event) event.preventDefault();

    if (ctx.proposalStage.querySelector('.confirm-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    const firstOption = day.interaction.options?.[0] || '다시 생각해볼게';
    const secondOption = day.interaction.options?.[1] || '그래도 좋아';
    overlay.innerHTML = `
      <div class="confirm-card">
        <p class="confirm-copy">한 번만 더 생각해줄래?</p>
        <div class="confirm-actions">
          <button type="button" class="confirm-secondary">${firstOption}</button>
          <button type="button" class="confirm-primary">${secondOption}</button>
        </div>
      </div>
    `;

    const secondary = overlay.querySelector('.confirm-secondary');
    const primary = overlay.querySelector('.confirm-primary');

    secondary.addEventListener('click', () => {
      secondary.textContent = '그래도 좋아 💖';
      primary.textContent = '좋아 💖';
    });

    primary.addEventListener('click', () => {
      renderSuccessState(ctx.proposalStage, day);
    });

    ctx.proposalStage.appendChild(overlay);
  }

  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    ctx.noButton.addEventListener(eventName, openConfirm, { passive: eventName !== 'click' });
  });
}

const interactionHandlers = {
  'runaway-no': handleRunawayNo,
  'shrinking-no': handleShrinkingNo,
  'evasive-no': handleEvasiveNo,
  'swapping-labels': handleSwappingLabels,
  'growing-yes': handleGrowingYes,
  'leaning-choice': handleLeaningChoice,
  'confirm-stack': handleConfirmStack
};

function setupDayInteraction(day, root) {
  const ctx = getHandlerContext(root);
  attachSharedSuccessHandler(day, ctx);

  const handler = interactionHandlers[day.interaction.type];
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
