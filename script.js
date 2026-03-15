const days = window.MARRYME_DAYS || [];
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
  window.MarryMeApp.renderProposalExperience(todayContent, today);
  archiveGrid.innerHTML = days.map(createArchiveCard).join('');
}

render();
