const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const proposalStage = document.getElementById('proposalStage');
const hint = document.getElementById('hint');
const calmModeToggle = document.getElementById('calmModeToggle');

const messages = [
  '거절 버튼이 긴장해서 도망가는 중…',
  '진짜 그 버튼을 누를 생각이었어?',
  '오늘의 디자인 컨셉: 거절 불가.',
  '버튼이 스스로 생존 본능을 발휘했어.',
  '좋아 버튼은 가만히 있는데 말이지 😌'
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let calmMode = prefersReducedMotion.matches;

function setCalmMode(enabled) {
  calmMode = enabled;
  proposalStage.classList.toggle('calm-mode', enabled);
  calmModeToggle.checked = enabled;
  hint.textContent = enabled
    ? '차분한 모드가 켜졌어. 이제 버튼이 도망가지 않아.'
    : '힌트: 거절은 생각보다 어렵다.';

  if (!enabled) {
    noButton.style.left = '';
    noButton.style.top = '';
  }
}

function moveNoButton() {
  if (calmMode) return;

  const stageRect = proposalStage.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxX = Math.max(16, stageRect.width - buttonRect.width - 16);
  const maxY = Math.max(16, stageRect.height - buttonRect.height - 16);

  const nextX = Math.max(16, Math.random() * maxX);
  const nextY = Math.max(16, Math.random() * maxY);

  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;
  hint.textContent = messages[Math.floor(Math.random() * messages.length)];
}

['mouseenter', 'touchstart', 'focus'].forEach((eventName) => {
  noButton.addEventListener(eventName, moveNoButton, { passive: true });
});

noButton.addEventListener('click', (event) => {
  if (calmMode) {
    hint.textContent = '오늘은 차분하게 거절도 가능해. 그래도 내 추천은 좋아 쪽이야 😌';
    return;
  }

  event.preventDefault();
  moveNoButton();
});

yesButton.addEventListener('click', () => {
  proposalStage.innerHTML = `
    <div class="ring" aria-hidden="true">🎉</div>
    <h2>역시 그럴 줄 알았어 💍</h2>
    <p>축하합니다. 오늘의 청혼 페이지를 통과했어요.</p>
    <p class="hint">내일은 또 다른 방식으로 설득하러 올게.</p>
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
