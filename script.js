const days = window.MarryMeApp.getDays();
const validation = window.MarryMeApp.validateDays(days);
const todayContent = document.getElementById('todayContent');
const archiveGrid = document.getElementById('archiveGrid');
const archiveSearch = document.getElementById('archiveSearch');
const archiveCount = document.getElementById('archiveCount');
const archiveEmpty = document.getElementById('archiveEmpty');
const archiveLatestLink = document.getElementById('archiveLatestLink');
const archiveTags = document.getElementById('archiveTags');

let activeTag = '';

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

function getPopularTags() {
  const counts = new Map();
  days.forEach((day) => {
    (day.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([tag]) => tag);
}

function filterDays(query, tag) {
  const normalized = query.trim().toLowerCase();
  return days.filter((day) => {
    const matchesTag = !tag || (day.tags || []).includes(tag);
    if (!matchesTag) return false;
    if (!normalized) return true;
    const haystack = [day.dayNumber, day.slug, day.proposalTitle, day.subtitle, day.interaction.type, ...(day.tags || [])].join(' ').toLowerCase();
    return haystack.includes(normalized);
  });
}

function renderArchive(list) {
  archiveGrid.innerHTML = list.map(createArchiveCard).join('');
  archiveCount.textContent = `${list.length} / ${days.length}`;
  archiveEmpty.hidden = list.length > 0;
}

function renderTagFilters() {
  const tags = getPopularTags();
  archiveTags.innerHTML = [
    `<button type="button" class="tag-filter-button ${activeTag ? '' : 'is-active'}" data-tag="">전체</button>`,
    ...tags.map((tag) => `<button type="button" class="tag-filter-button ${activeTag === tag ? 'is-active' : ''}" data-tag="${tag}">#${tag}</button>`)
  ].join('');

  archiveTags.querySelectorAll('[data-tag]').forEach((button) => {
    button.addEventListener('click', () => {
      activeTag = button.dataset.tag || '';
      renderTagFilters();
      renderArchive(filterDays(archiveSearch.value, activeTag));
    });
  });
}

function updateMeta(today) {
  document.title = `Marry Me — Day ${today.dayNumber}`;
  const description = `Day ${today.dayNumber}. ${today.subtitle}`;
  const pageUrl = `${window.location.origin}${window.location.pathname}`;
  const imageUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/og-image.svg`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (descriptionMeta) descriptionMeta.setAttribute('content', description);
  if (ogTitle) ogTitle.setAttribute('content', `Marry Me — Day ${today.dayNumber}`);
  if (ogDescription) ogDescription.setAttribute('content', description);
  if (ogUrl) ogUrl.setAttribute('content', pageUrl);
  if (ogImage) ogImage.setAttribute('content', imageUrl);
  if (twitterTitle) twitterTitle.setAttribute('content', `Marry Me — Day ${today.dayNumber}`);
  if (twitterDescription) twitterDescription.setAttribute('content', description);
  if (twitterImage) twitterImage.setAttribute('content', imageUrl);
}

function render() {
  if (!validation.valid) {
    renderValidationError(validation.errors);
    return;
  }

  const today = days[0];
  window.MarryMeApp.renderProposalExperience(todayContent, today);
  renderArchive(days);
  renderTagFilters();
  updateMeta(today);
  archiveLatestLink.href = `day/?slug=${today.slug}`;

  archiveSearch.addEventListener('input', (event) => {
    renderArchive(filterDays(event.target.value, activeTag));
  });
}

render();
