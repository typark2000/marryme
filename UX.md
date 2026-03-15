# UX.md — marryme flow

## Experience goal
첫 화면에서 오늘의 청혼 디자인을 바로 체험하고, 이전 디자인은 상세 페이지까지 자연스럽게 이동해 탐색할 수 있는 경험.

## Primary screen flow
1. 사용자가 메인 페이지에 진입한다.
2. 최상단에서 오늘의 디자인(Day 최신 항목)을 본다.
3. 인터랙션을 체험한다.
4. 아래 아카이브 섹션에서 이전 디자인 카드를 본다.
5. 원하는 카드를 눌러 `day/?slug=<slug>` 상세 페이지로 이동한다.
6. 상세 페이지 상단의 이전/다음 day 네비게이션으로 연속 탐색한다.
7. 네비 카드에서 다음 day의 제목과 짧은 설명을 미리 보고 이동한다.
8. 필요하면 메인으로 돌아가거나 related days로 더 둘러본다.

## Screens / states
### A. Home / Today state
- 최신 day 데이터 기준으로 제목/설명/인터랙션 렌더링
- 기본 CTA 제공

### B. Archive state
- 이전 디자인 카드 목록 표시
- 각 카드는 상세 페이지 링크 역할 수행

### C. Day detail state
- 선택한 day를 단일 상세 템플릿에서 렌더링
- 상단에 back link 제공
- 상단에 이전/다음 day 네비게이션 제공
- 이전/다음 카드에 day 번호 + 제목 + 짧은 설명 제공
- 하단에 다른 day 탐색 카드 제공

### D. Interaction state
- day별 interaction type에 따라 동작
- 현재 지원 타입
  - `runaway-no`
  - `shrinking-no`

### E. Success state
- `좋아` 클릭 시 성공 메시지 렌더링

## Components
- Today hero
- Proposal stage
- CTA buttons
- Hint / status text
- Archive grid
- Detail header
- Previous / next day navigation with preview copy
- Related days grid
- About section

## Empty / loading / error states
### Empty state
- day 데이터가 없으면 `곧 다음 청혼 페이지가 올라와요` 메시지 표시

### Loading state
- 정적 렌더링이라 별도 loading state 없음

### Error state
- 잘못된 slug 접근 시 not found 메시지와 메인 복귀 링크 표시
- JS 비활성 시 인터랙션은 제한되지만 정적 구조는 유지

## Accessibility notes
- 키보드 포커스 표시 유지
- 링크 카드와 네비게이션 링크의 포커스 가능 상태 유지
- 이모지는 장식 역할만 하도록 처리
