const allowedInteractionTypes = new Set([
  'runaway-no',
  'shrinking-no',
  'evasive-no',
  'swapping-labels',
  'growing-yes',
  'leaning-choice',
  'confirm-stack',
  'button-swap',
  'layout-compress',
  'multiplying-yes',
  'fading-no',
  'sentence-build',
  'decorative-hide',
  'card-deck-choice',
  'finale-mix'
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
    if (!day || typeof day !== 'object') return errors.push(`${prefix}: invalid object.`);
    if (!day.slug || typeof day.slug !== 'string') errors.push(`${prefix}: missing slug.`);
    else if (seenSlugs.has(day.slug)) errors.push(`${prefix}: duplicate slug '${day.slug}'.`);
    else seenSlugs.add(day.slug);
    if (!day.dayNumber || typeof day.dayNumber !== 'string') errors.push(`${prefix}: missing dayNumber.`);
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
  return `
    <p class="eyebrow">DAY ${day.dayNumber}</p>
    <h1>${day.title}</h1>
    <p class="lead">${day.intro}</p>
    <div class="proposal-stage ${interactionClass}" id="proposalStage">
      <div class="ring" aria-hidden="true">💍</div>
      <h2>${day.proposalTitle}</h2>
      <div class="actions" id="actionsArea">
        <button class="yes-button" id="yesButton" type="button">${day.yesLabel}</button>
        <button class="no-button" id="noButton" type="button" aria-label="거절 버튼">${day.noLabel}</button>
      </div>
      <div class="dynamic-slot" id="dynamicSlot"></div>
    </div>
  `;
}

function renderSuccessState(proposalStage, day) {
  proposalStage.innerHTML = `
    <div class="ring" aria-hidden="true">🎉</div>
    <h2>${day.successTitle}</h2>
    <p>${day.successBody}</p>
  `;
}

function getHandlerContext(root) {
  return {
    root,
    proposalStage: root.querySelector('#proposalStage'),
    actionsArea: root.querySelector('#actionsArea'),
    yesButton: root.querySelector('#yesButton'),
    noButton: root.querySelector('#noButton'),
    dynamicSlot: root.querySelector('#dynamicSlot')
  };
}

function attachSharedSuccessHandler(day, ctx) {
  ctx.yesButton.addEventListener('click', () => renderSuccessState(ctx.proposalStage, day));
}

function addRepeatEvents(target, handler) {
  ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
    target.addEventListener(eventName, handler, { passive: eventName !== 'click' });
  });
}

function handleRunawayNo(day, ctx) {
  addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    ctx.proposalStage.classList.add('runaway-active');
    const stageRect = ctx.proposalStage.getBoundingClientRect();
    const buttonRect = ctx.noButton.getBoundingClientRect();
    const minX = 16, minY = 140;
    const maxX = Math.max(minX, stageRect.width - buttonRect.width - 16);
    const maxY = Math.max(minY, stageRect.height - buttonRect.height - 16);
    ctx.noButton.style.left = `${minX + Math.random() * Math.max(0, maxX - minX)}px`;
    ctx.noButton.style.top = `${minY + Math.random() * Math.max(0, maxY - minY)}px`;
  });
}

function handleShrinkingNo(day, ctx) {
  let step = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    step += 1;
    ctx.noButton.style.transform = `scale(${Math.max(0.12, 1 - step * 0.12)})`;
  });
}

function handleEvasiveNo(day, ctx) {
  let direction = 1;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    ctx.noButton.style.transform = `translateX(${direction * 72}px)`;
    direction *= -1;
  });
}

function handleSwappingLabels(day, ctx) {
  const labels = day.interaction.options || [day.noLabel];
  let index = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    index = Math.min(index + 1, labels.length - 1);
    ctx.noButton.textContent = labels[index];
  });
}

function handleGrowingYes(day, ctx) {
  let step = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    step = Math.min(step + 1, 5);
    ctx.yesButton.style.transform = `scale(${1 + step * 0.12})`;
    ctx.noButton.style.opacity = `${Math.max(0.35, 1 - step * 0.12)}`;
  });
}

function handleLeaningChoice(day, ctx) {
  ctx.proposalStage.classList.add('leaning-active');
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    ctx.yesButton.style.transform = 'scale(1.08)';
    ctx.noButton.style.transform = 'scale(0.92)';
    ctx.noButton.style.opacity = '0.78';
  });
}

function handleConfirmStack(day, ctx) {
  addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    if (ctx.proposalStage.querySelector('.confirm-overlay')) return;
    const [a='다시 생각해볼게', b='그래도 좋아'] = day.interaction.options || [];
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-card">
        <p class="confirm-copy">한 번만 더 생각해줄래?</p>
        <div class="confirm-actions">
          <button type="button" class="confirm-secondary">${a}</button>
          <button type="button" class="confirm-primary">${b}</button>
        </div>
      </div>`;
    overlay.querySelector('.confirm-secondary').addEventListener('click', (e) => {
      e.currentTarget.textContent = '그래도 좋아 💖';
      overlay.querySelector('.confirm-primary').textContent = '좋아 💖';
    });
    overlay.querySelector('.confirm-primary').addEventListener('click', () => renderSuccessState(ctx.proposalStage, day));
    ctx.proposalStage.appendChild(overlay);
  });
}

function handleButtonSwap(day, ctx) {
  let swapped = false;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    if (swapped) return;
    swapped = true;
    ctx.actionsArea.insertBefore(ctx.noButton, ctx.yesButton);
    setTimeout(() => { swapped = false; }, 220);
  });
}

function handleLayoutCompress(day, ctx) {
  let step = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    step = Math.min(step + 1, 4);
    ctx.proposalStage.style.paddingInline = `${24 - step * 3}px`;
    ctx.noButton.style.transform = `scale(${Math.max(0.65, 1 - step * 0.08)})`;
    ctx.yesButton.style.transform = `scale(${1 + step * 0.06})`;
  });
}

function handleMultiplyingYes(day, ctx) {
  let count = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    if (count >= 4) return;
    count += 1;
    const clone = document.createElement('button');
    clone.type = 'button';
    clone.className = 'yes-button yes-clone';
    clone.textContent = day.yesLabel;
    clone.addEventListener('click', () => renderSuccessState(ctx.proposalStage, day));
    ctx.actionsArea.appendChild(clone);
  });
}

function handleFadingNo(day, ctx) {
  let step = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    step = Math.min(step + 1, 5);
    ctx.noButton.style.opacity = `${Math.max(0.12, 1 - step * 0.16)}`;
  });
}

function handleSentenceBuild(day, ctx) {
  const parts = day.interaction.options || [];
  let index = 0;
  ctx.dynamicSlot.innerHTML = '<p class="promise-line" id="promiseLine"></p>';
  const line = ctx.dynamicSlot.querySelector('#promiseLine');
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    if (index >= parts.length) return;
    line.textContent = `${line.textContent} ${parts[index]}`.trim();
    index += 1;
  });
}

function handleDecorativeHide(day, ctx) {
  ctx.dynamicSlot.innerHTML = '<div class="decor-row"><span>💐</span><span>🎀</span><span>💖</span><span>✨</span></div>';
  let hidden = false;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    hidden = !hidden;
    ctx.noButton.classList.toggle('decor-hidden', hidden);
  });
}

function handleCardDeckChoice(day, ctx) {
  ctx.actionsArea.classList.add('card-deck-actions');
  ctx.yesButton.classList.add('card-main');
  ctx.noButton.classList.add('card-sub');
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    ctx.yesButton.classList.add('card-main-boost');
    ctx.noButton.classList.add('card-sub-fade');
  });
}

function handleFinaleMix(day, ctx) {
  let step = 0;
  addRepeatEvents(ctx.noButton, (event) => {
    if (event?.type === 'click') event.preventDefault();
    step += 1;
    if (step === 1) ctx.noButton.style.transform = 'translateX(56px)';
    if (step === 2) ctx.yesButton.style.transform = 'scale(1.08)';
    if (step === 3) ctx.noButton.textContent = '그래도 좋아?';
    if (step >= 4) handleConfirmStack(day, ctx);
  });
}

const interactionHandlers = {
  'runaway-no': handleRunawayNo,
  'shrinking-no': handleShrinkingNo,
  'evasive-no': handleEvasiveNo,
  'swapping-labels': handleSwappingLabels,
  'growing-yes': handleGrowingYes,
  'leaning-choice': handleLeaningChoice,
  'confirm-stack': handleConfirmStack,
  'button-swap': handleButtonSwap,
  'layout-compress': handleLayoutCompress,
  'multiplying-yes': handleMultiplyingYes,
  'fading-no': handleFadingNo,
  'sentence-build': handleSentenceBuild,
  'decorative-hide': handleDecorativeHide,
  'card-deck-choice': handleCardDeckChoice,
  'finale-mix': handleFinaleMix
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

window.MarryMeApp = { allowedInteractionTypes, getDays, validateDays, findDayBySlug, renderProposalExperience };
