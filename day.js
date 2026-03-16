const days = window.MarryMeApp.getDays();
const validation = window.MarryMeApp.validateDays(days);
const detailRoot = document.getElementById('dayDetailContent');
const relatedGrid = document.getElementById('relatedDaysGrid');
const detailHeader = document.getElementById('detailHeader');
const shareButton = document.getElementById('shareButton');
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

function createDayNavCard(day, directionLabel, directionArrow) {
  return `
    <a class="day-nav-link" href="../day/?slug=${day.slug}">
      <span class="day-nav-label">${directionArrow} ${directionLabel}</span>
      <strong>Day ${day.dayNumber} · ${day.proposalTitle}</strong>
      <p class="day-nav-copy">${day.subtitle}</p>
    </a>
  `;
}

function createDisabledDayNav(directionLabel, directionArrow) {
  return `
    <span class="day-nav-link is-disabled">
      <span class="day-nav-label">${directionArrow} ${directionLabel}</span>
      <strong>없음</strong>
      <p class="day-nav-copy">더 이동할 day가 아직 없어.</p>
    </span>
  `;
}

function createDayNav(day) {
  const index = days.findIndex((item) => item.slug === day.slug);
  const previousDay = index >= 0 && index < days.length - 1 ? days[index + 1] : null;
  const nextDay = index > 0 ? days[index - 1] : null;

  return `
    <nav class="day-nav" aria-label="day navigation">
      ${previousDay ? createDayNavCard(previousDay, '이전 day', '←') : createDisabledDayNav('이전 day', '←')}
      ${nextDay ? createDayNavCard(nextDay, '다음 day', '→') : createDisabledDayNav('다음 day', '→')}
    </nav>
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
    <div class="detail-actions"><a class="text-link" href="../">← 메인으로 돌아가기</a><button class="share-link-button" id="shareInlineButton" type="button">링크 복사</button></div>
    ${createDayNav(day)}
  `;
}

function updateMeta(day) {
  const pageUrl = `${window.location.origin}${window.location.pathname}?slug=${day.slug}`;
  const title = `Marry Me — Day ${day.dayNumber}`;
  const description = `Day ${day.dayNumber}. ${day.subtitle}`;
  document.title = title;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (descriptionMeta) descriptionMeta.setAttribute('content', description);
  if (ogTitle) ogTitle.setAttribute('content', title);
  if (ogDescription) ogDescription.setAttribute('content', description);
  if (ogUrl) ogUrl.setAttribute('content', pageUrl);
}

function wireShareButton(day) {
  const pageUrl = `${window.location.origin}${window.location.pathname}?slug=${day.slug}`;
  const button = document.getElementById('shareInlineButton') || shareButton;
  if (!button) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      button.textContent = '복사됨';
      setTimeout(() => {
        button.textContent = '링크 복사';
      }, 1200);
    } catch {
      button.textContent = '복사 실패';
      setTimeout(() => {
        button.textContent = '링크 복사';
      }, 1200);
    }
  });
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
  detailRoot.innerHTML = '<p class="lead">주소가 바뀌었거나 아직 준비 중일 수 있어.</p>';
  relatedGrid.innerHTML = days.length ? days.map(createRelatedCard).join('') : '<p class="empty-copy">아직 다른 day가 없어.</p>';
} else {
  detailHeader.innerHTML = createDetailHeader(currentDay);
  window.MarryMeApp.renderProposalExperience(detailRoot, currentDay);
  const relatedDays = days.filter((day) => day.slug !== currentDay.slug).slice(0, 12);
  relatedGrid.innerHTML = relatedDays.length ? relatedDays.map(createRelatedCard).join('') : '<p class="empty-copy">다른 day가 아직 없어.</p>';
  updateMeta(currentDay);
  wireShareButton(currentDay);
}
