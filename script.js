const days = window.MARRYME_DAYS || [];
const todayContent = document.getElementById('todayContent');
const archiveGrid = document.getElementById('archiveGrid');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function createTodayMarkup(day) {
  return `
    <p class="eyebrow">DAY ${day.dayNumber}</p>
    <h1>${day.title}</h1>
    <p class="lead">${day.intro}</p>

    <div class="proposal-stage" id="proposalStage">
      <div class="ring" aria-hidden="true">💍</div>
      <h2>${day.proposalTitle}</h2>
      <p>${day.proposalBody}</p>

      <div class="mode-toggle">
        <label class="toggle-label" for="calmModeToggle">
          <input type="checkbox" id="calmModeToggle" />
          차분한 모드 (움직임 줄이기)
        </label>
        <p class="toggle-help">모션이 불편하면 켜면 돼. 그러면 인터랙션이 차분해져.</p>
      </div>

      <div class="actions" id="actionsArea">
        <button class="yes-button" id="yesButton" type="button">${day.yesLabel}</button>
        <button class="no-button" id="noButton" type="button" aria-label="거절 버튼">${day.noLabel}</button>
      </div>

      <p class="hint" id="hint" aria-live="polite">${day.hintDefault}</p>
    </div>
  `;
}

function createArchiveCard(day, index) {
  const status = index === 0 ? 'today' : 'archived';
  const badge = index === 0 ? 'TODAY' : `DAY ${day.dayNumber}`;

  return `
    <article class="archive-item">
      <p class="archive-badge">${badge}</p>
      <h4>${day.proposalTitle}</h4>
      <p>${day.subtitle}</p>
      <div class="archive-meta">
        <span>${status}</span>
        <span>${day.interaction.type}</span>
      </div>
    </article>
  `;
}

function setupDayInteraction(day) {
  const noButton = document.getElementById('noButton');
  const yesButton = document.getElementById('yesButton');
  const proposalStage = document.getElementById('proposalStage');
  const hint = document.getElementById('hint');
  const calmModeToggle = document.getElementById('calmModeToggle');

  let calmMode = prefersReducedMotion.matches;
  let shrinkStep = 0;

  function setCalmMode(enabled) {
    calmMode = enabled;
    proposalStage.classList.toggle('calm-mode', enabled);
    calmModeToggle.checked = enabled;
    hint.textContent = enabled ? day.calmHint : day.hintDefault;

    if (!enabled) {
      noButton.style.left = '';
      noButton.style.top = '';
      noButton.style.transform = '';
    }
  }

  function randomMessage() {
    const list = day.interaction.messages || [day.hintDefault];
    return list[Math.floor(Math.random() * list.length)];
  }

  function moveRunawayButton() {
    const stageRect = proposalStage.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    const maxX = Math.max(16, stageRect.width - buttonRect.width - 16);
    const maxY = Math.max(16, stageRect.height - buttonRect.height - 16);

    noButton.style.left = `${Math.max(16, Math.random() * maxX)}px`;
    noButton.style.top = `${Math.max(16, Math.random() * maxY)}px`;
    hint.textContent = randomMessage();
  }

  function shrinkNoButton() {
    shrinkStep = Math.min(shrinkStep + 1, 6);
    const scale = Math.max(0.45, 1 - shrinkStep * 0.1);
    noButton.style.transform = `scale(${scale})`;
    hint.textContent = randomMessage();
  }

  function activateNoInteraction(event) {
    if (calmMode) return;

    if (day.interaction.type === 'runaway-no') {
      if (event) event.preventDefault();
      moveRunawayButton();
      return;
    }

    if (day.interaction.type === 'shrinking-no') {
      if (event && event.type === 'click') event.preventDefault();
      shrinkNoButton();
    }
  }

  ['mouseenter', 'touchstart', 'focus'].forEach((eventName) => {
    noButton.addEventListener(eventName, activateNoInteraction, { passive: true });
  });

  noButton.addEventListener('click', (event) => {
    if (calmMode) {
      hint.textContent = day.calmRejectMessage;
      return;
    }

    activateNoInteraction(event);
  });

  yesButton.addEventListener('click', () => {
    proposalStage.innerHTML = `
      <div class="ring" aria-hidden="true">🎉</div>
      <h2>${day.successTitle}</h2>
      <p>${day.successBody}</p>
      <p class="hint">${day.successHint}</p>
    `;
  });

  calmModeToggle.addEventListener('change', (event) => {
    setCalmMode(event.target.checked);
  });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', (event) => {
      setCalmMode(event.matches);
    });
  }

  setCalmMode(calmMode);
}

function render() {
  if (!days.length) {
    todayContent.innerHTML = `
      <p class="eyebrow">COMING SOON</p>
      <h1>곧 다음 청혼 페이지가 올라와요</h1>
      <p class="lead">아직 등록된 디자인이 없지만, 곧 첫 번째 실험이 시작될 예정이야.</p>
    `;
    archiveGrid.innerHTML = '<p class="empty-copy">아카이브가 아직 비어 있어.</p>';
    return;
  }

  const today = days[0];
  todayContent.innerHTML = createTodayMarkup(today);
  archiveGrid.innerHTML = days.map(createArchiveCard).join('');
  setupDayInteraction(today);
}

render();
