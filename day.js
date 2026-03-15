const days = window.MarryMeApp.getDays();
const validation = window.MarryMeApp.validateDays(days);
const detailRoot = document.getElementById('dayDetailContent');
const relatedGrid = document.getElementById('relatedDaysGrid');
const detailHeader = document.getElementById('detailHeader');
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const currentDay = validation.valid ? window.MarryMeApp.findDayBySlug(slug) : null;

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

function renderValidationError(errors) {
  document.title = 'Marry Me — Data Error';
  detailHeader.innerHTML = `
    <p class="eyebrow">DATA ERROR</p>
    <h1>day 데이터에 문제가 있어</h1>
    <p class="section-copy">상세 페이지 렌더링 전에 검증에서 실패했어.</p>
    <p><a class="text-link" href="../">← 메인으로 돌아가기</a></p>
  `;
  detailRoot.innerHTML = `<ul class="error-list">${errors.map((error) => `<li>${error}</li>`).join('')}</ul>`;
  relatedGrid.innerHTML = '<p class="empty-copy">검증 오류 때문에 관련 day를 표시하지 않았어.</p>';
}

function createDetailHeader(day) {
  return `
    <p class="eyebrow">DETAIL</p>
    <h1>Day ${day.dayNumber}</h1>
    <p class="section-copy">${day.subtitle}</p>
    <p><a class="text-link" href="../">← 메인으로 돌아가기</a></p>
  `;
}

if (!validation.valid) {
  renderValidationError(validation.errors);
} else if (!currentDay) {
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
  relatedGrid.innerHTML = days.length
    ? days.map(createRelatedCard).join('')
    : '<p class="empty-copy">아직 다른 day가 없어.</p>';
} else {
  document.title = `Marry Me — Day ${currentDay.dayNumber}`;
  detailHeader.innerHTML = createDetailHeader(currentDay);
  window.MarryMeApp.renderProposalExperience(detailRoot, currentDay);
  const relatedDays = days.filter((day) => day.slug !== currentDay.slug);
  relatedGrid.innerHTML = relatedDays.length
    ? relatedDays.map(createRelatedCard).join('')
    : '<p class="empty-copy">다른 day가 아직 없어.</p>';
}
