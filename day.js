const detailRoot = document.getElementById('dayDetailContent');
const relatedGrid = document.getElementById('relatedDaysGrid');
const slug = document.body.dataset.daySlug;
const currentDay = window.MarryMeApp.findDayBySlug(slug);
const allDays = window.MARRYME_DAYS || [];

function createRelatedCard(day) {
  return `
    <a class="archive-item" href="../${day.slug}/">
      <p class="archive-badge">DAY ${day.dayNumber}</p>
      <h4>${day.proposalTitle}</h4>
      <p>${day.subtitle}</p>
      <div class="archive-meta">
        <span>${day.interaction.type}</span>
      </div>
    </a>
  `;
}

if (!currentDay) {
  detailRoot.innerHTML = `
    <p class="eyebrow">NOT FOUND</p>
    <h1>이 청혼 페이지를 찾지 못했어</h1>
    <p class="lead">주소가 바뀌었거나 아직 준비 중일 수 있어.</p>
    <p><a class="text-link" href="../../">메인으로 돌아가기</a></p>
  `;
} else {
  document.title = `Marry Me — Day ${currentDay.dayNumber}`;
  window.MarryMeApp.renderProposalExperience(detailRoot, currentDay);
  const relatedDays = allDays.filter((day) => day.slug !== currentDay.slug);
  relatedGrid.innerHTML = relatedDays.length
    ? relatedDays.map(createRelatedCard).join('')
    : '<p class="empty-copy">다른 day가 아직 없어.</p>';
}
