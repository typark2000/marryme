const days = window.MarryMeApp.getDays();
const validation = window.MarryMeApp.validateDays(days);
const todayContent = document.getElementById('todayContent');
const archiveGrid = document.getElementById('archiveGrid');

function createArchiveCard(day, index) {
  const status = index === 0 ? 'today' : 'archived';
  const badge = index === 0 ? 'TODAY' : `DAY ${day.dayNumber}`;

  return `
    <a class="archive-item" href="day/?slug=${day.slug}">
      <p class="archive-badge">${badge}</p>
      <h4>${day.proposalTitle}</h4>
      <p>${day.subtitle}</p>
      <div class="archive-meta">
        <span>${status}</span>
        <span>${day.interaction.type}</span>
      </div>
      <p class="archive-link-copy">상세 페이지 보기 →</p>
    </a>
  `;
}

function renderValidationError(errors) {
  todayContent.innerHTML = `
    <p class="eyebrow">DATA ERROR</p>
    <h1>day 데이터에 문제가 있어</h1>
    <p class="lead">data.js를 확인해줘. 검증에서 실패한 상태야.</p>
    <ul class="error-list">${errors.map((error) => `<li>${error}</li>`).join('')}</ul>
  `;
  archiveGrid.innerHTML = '<p class="empty-copy">데이터 오류 때문에 아카이브를 렌더링하지 않았어.</p>';
}

function render() {
  if (!validation.valid) {
    renderValidationError(validation.errors);
    return;
  }

  const today = days[0];
  window.MarryMeApp.renderProposalExperience(todayContent, today);
  archiveGrid.innerHTML = days.map(createArchiveCard).join('');
}

render();
