# UX.md — marryme MVP flow

## Experience goal
첫 화면에서 바로 컨셉이 이해되고, 짧고 강한 인터랙션으로 웃음을 주는 경험.

## Primary screen flow
1. 사용자가 페이지에 진입한다.
2. `DAY 001`과 설명 문구를 읽고 컨셉을 이해한다.
3. CTA 영역에서 `좋아` / `싫어` 버튼을 본다.
4. 기본 모드에서는 `싫어` 버튼이 회피한다.
5. 사용자가 `좋아`를 누르면 성공 상태로 전환된다.
6. 접근성 토글을 켜면 움직임 없는 안정 모드로 전환된다.

## Screens / states
### A. Default state
- 요소
  - 데이 배지
  - 메인 헤드라인
  - 소개 문구
  - 프로포즈 인터랙션 카드
  - 접근성 토글
  - 프로젝트 소개 섹션
- 목적
  - 오늘의 디자인과 컨셉을 한눈에 전달

### B. Interaction state
- `싫어` 버튼 hover / focus / touch 시 다른 위치로 이동
- 힌트 문구가 랜덤하게 바뀜

### C. Success state
- `좋아` 클릭 시 축하 메시지와 다음 방문 유도 문구 표시

### D. Accessible / calm state
- 사용자가 접근성 토글을 켜거나 `prefers-reduced-motion` 환경이면 회피 인터랙션 비활성화
- `싫어` 버튼은 고정 위치
- 설명 문구로 현재 모드 안내

## Components
- Hero card
- Day badge
- Proposal stage
- Primary CTA button (`좋아`)
- Secondary CTA button (`싫어`)
- Accessibility toggle
- Hint / status text
- About section

## Content notes
- 문구는 가볍고 장난스럽게 유지
- 공격적/강압적 표현은 피함
- 거절 불가 컨셉은 게임적 연출로만 전달

## Empty / loading / error states
### Empty state
- 아직 다음 날짜 디자인이 없을 때: `곧 다음 디자인이 올라와요.`

### Loading state
- MVP 정적 페이지에서는 별도 로딩 상태 없음
- 이후 날짜별 동적 로딩 도입 시 skeleton/card placeholder 고려

### Error state
- 스크립트 오류 또는 JS 비활성화 시에도 기본 설명과 `좋아` 버튼은 보이도록 유지
- 가능하면 `noscript` 안내 추가

## Accessibility notes
- 키보드 포커스 표시 유지
- `prefers-reduced-motion` 존중
- 토글로 움직임 비활성화 가능
- 장식 이모지는 정보 전달의 유일 수단이 되지 않게 한다
- 충분한 색 대비 유지
