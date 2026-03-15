# SPEC.md — marryme MVP

## Product summary
`marryme`는 매일 하나씩 새로운 청혼 페이지 디자인을 공개하고 사용자가 직접 인터랙션을 체험할 수 있게 하는 정적 웹앱이다.

## Problem statement
하루에 하나씩 올라오는 장난스럽고 기억에 남는 청혼 웹페이지를 빠르게 공개하고, 이후 날짜가 늘어나도 유지보수 가능한 방식으로 관리할 수 있는 구조가 필요하다.

## Scope
### In scope (current MVP)
- 메인 화면에서 오늘의 청혼 페이지 1개 표시
- 날짜별 디자인 데이터를 배열 기반으로 관리
- 최소 2개의 디자인(Day 001, Day 002) 제공
- 아카이브 목록에서 이전 디자인 컨셉 확인 가능
- 단일 상세 템플릿으로 각 day permalink 제공 (`/day/?slug=<slug>`)
- day metadata validation 제공
- 장난스러운 인터랙션 제공
- 접근성 보완(모션 감소, calm mode)
- GitHub Pages 배포 가능

### Out of scope (for now)
- 관리자 업로드 CMS
- 백엔드/DB
- 사용자 계정
- 댓글/공유/분석 대시보드
- 다국어 지원

## Users
- 링크를 눌러 오늘의 청혼 디자인을 바로 체험하는 방문자
- 특정 day 링크를 직접 공유받아 들어오는 방문자
- 매일 새로운 디자인을 추가/관리하는 제작자(ty)

## User stories
1. 방문자로서, 메인 화면에서 오늘의 디자인을 바로 체험하고 싶다.
2. 방문자로서, 이전 청혼 디자인들이 어떤 컨셉이었는지 아카이브에서 보고 싶다.
3. 방문자로서, 특정 day의 개별 링크를 열어 바로 체험하고 싶다.
4. 모션이 불편한 사용자로서, 예측 가능한 방식으로 페이지를 이용하고 싶다.
5. 제작자로서, 새 디자인을 `data.js` 중심으로 빠르게 확장하고 싶다.
6. 제작자로서, 잘못된 slug/메타데이터를 push 전에 잡고 싶다.

## Acceptance criteria
- 메인 화면에 오늘의 디자인이 렌더링된다.
- Day 001, Day 002 두 개 이상의 디자인 데이터가 존재한다.
- 아카이브 목록에서 각 상세 페이지로 이동할 수 있다.
- `/day/?slug=<slug>` 형태의 상세 페이지가 동작한다.
- `npm run validate:days`가 day 데이터 문제를 검출한다.
- GitHub Actions에서 배포 전 validation이 실행된다.
- 오늘의 디자인 및 상세 페이지 인터랙션이 정상 동작한다.
- calm mode 및 reduced-motion 대응이 동작한다.
- GitHub Pages에서 정상 제공된다.

## Constraints
- 정적 프로젝트로 유지한다.
- GitHub Pages 우선 사용
- 비밀정보/토큰/환경변수 없이 공개 저장소로 운영

## Exit criteria
- 필수 문서(`SPEC.md`, `UX.md`, `TASKS.md`, `REVIEW.md`)가 최신 상태다.
- `data.js` 기반으로 디자인 확장이 가능하다.
- 최소 2개 디자인이 상세 템플릿으로 정상 표시된다.
- day validation이 로컬/CI에서 동작한다.
- 리뷰 결과와 잔여 이슈가 `REVIEW.md`에 정리된다.
