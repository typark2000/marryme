const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const proposalStage = document.getElementById('proposalStage');
const hint = document.getElementById('hint');

const messages = [
  '거절 버튼이 긴장해서 도망가는 중…',
  '진짜 그 버튼을 누를 생각이었어?',
  '오늘의 디자인 컨셉: 거절 불가.',
  '버튼이 스스로 생존 본능을 발휘했어.',
  '좋아 버튼은 가만히 있는데 말이지 😌'
];

function moveNoButton() {
  const stageRect = proposalStage.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxX = stageRect.width - buttonRect.width - 16;
  const maxY = stageRect.height - buttonRect.height - 16;

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
  event.preventDefault();
  moveNoButton();
});

yesButton.addEventListener('click', () => {
  proposalStage.innerHTML = `
    <div class="ring">🎉</div>
    <h2>역시 그럴 줄 알았어 💍</h2>
    <p>축하합니다. 오늘의 청혼 페이지를 통과했어요.</p>
    <p class="hint">내일은 또 다른 방식으로 설득하러 올게.</p>
  `;
});
