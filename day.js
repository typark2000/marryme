const detailRoot = document.getElementById('dayDetailContent');
const relatedGrid = document.getElementById('relatedDaysGrid');
const detailHeader = document.getElementById('detailHeader');
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const currentDay = window.MarryMeApp.findDayBySlug(slug);
const allDays = window.MARRYME_DAYS || [];

function createDetailHeader(day) {
  return `
    <p class="eyebrow">DETAIL</p>
    <h1>Day ${day.dayNumber}</h1>
    <p class="section-copy">${day.subtitle}</p>
    <p><a class="text-link" href="../">← 메인으로 돌아가기</a></p>
  `;
}

function createRelatedCard(day) {
  return `
    <a class="archive-item" href="../day/?slug=${day.slug}">
      <p class="archive-badge">DAY ${day.dayNumber}</p>
      <h4>${day.proposalTitle}</h4>
      <p>${day.subtitle}</p>
      <div class="archive-meta">
        <span>${day.interaction.type}</span>
      </div>
      <p class="archive-link-copy">상세 페이지 보기 →</p>
    </a>
  `;
}

if (!currentDay) {
  document.title = 'Marry Me — Day Not Found';
  detailHeader.innerHTML = `
    <p class="eyebrow">NOT FOUND</p>
    <h1>이 청혼 페이지를 찾지 못했어</h1>
    <p class="section-copy">slug가 없거나 잘못된 주소일 수 있어.</p>
    <p><a class="text-link" href="../">← 메인으로 돌아가기</a></p>
  `;
  detailRoot.innerHTML = `
    <p class="lead">주소가 바뀌었거나 아직 준비 중일 수 있어.</p>
  `;
  relatedGrid.innerHTML = allDays.length
    ? allDays.map(createRelatedCard).join('')
    : '<p class="empty-copy">아직 다른 day가 없어.</p>';
} else {
  document.title = `Marry Me — Day ${currentDay.dayNumber}`;
  detailHeader.innerHTML = createDetailHeader(currentDay);
  window.MarryMeApp.renderProposalExperience(detailRoot, currentDay);
  const relatedDays = allDays.filter((day) => day.slug !== currentDay.slug);
  relatedGrid.innerHTML = relatedDays.length
    ? relatedDays.map(createRelatedCard).join('')
    : '<p class="empty-copy">다른 day가 아직 없어.</p>';
}
