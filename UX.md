# UX.md — marryme flow

## Experience goal
첫 화면에서 오늘의 청혼 디자인을 바로 체험하고, 아래에서 이전 디자인의 컨셉을 훑어보며 매일 쌓이는 프로젝트라는 인상을 주는 경험.

## Primary screen flow
1. 사용자가 메인 페이지에 진입한다.
2. 최상단에서 오늘의 디자인(Day 최신 항목)을 본다.
3. 인터랙션을 체험한다.
4. 필요하면 calm mode를 켠다.
5. 아래 아카이브 섹션에서 이전 디자인들을 훑어본다.

## Screens / states
### A. Today state
- 최신 day 데이터 기준으로 제목/설명/인터랙션 렌더링
- 기본 CTA와 접근성 토글 제공

### B. Interaction state
- day별 interaction type에 따라 동작
- 현재 지원 타입
  - `runaway-no`
  - `shrinking-no`

### C. Success state
- `좋아` 클릭 시 성공 메시지 렌더링

### D. Calm state
- 사용자가 calm mode를 켜거나 `prefers-reduced-motion` 환경인 경우
- 상호작용이 더 예측 가능하게 바뀜

### E. Archive state
- 이전 디자인 카드 목록 표시
- 각 카드는 day 번호, 짧은 설명, interaction 타입을 보여줌

## Components
- Today hero
- Proposal stage
- Accessibility toggle
- CTA buttons
- Hint / status text
- Archive grid
- About section

## Empty / loading / error states
### Empty state
- day 데이터가 없으면 `곧 다음 청혼 페이지가 올라와요` 메시지 표시

### Loading state
- 정적 렌더링이라 별도 loading state 없음

### Error state
- JS 비활성 시 noscript 안내 제공
- 향후 day별 페이지가 생기면 fallback state 추가 검토

## Accessibility notes
- 키보드 포커스 표시 유지
- reduced motion 존중
- calm mode 제공
- 이모지는 장식 역할만 하도록 처리
