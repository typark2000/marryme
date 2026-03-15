# marryme

매일 하나씩 새로운 청혼 페이지 디자인이 업로드되는 웹앱.

## 컨셉
- 매일 다른 청혼 웹 디자인 공개
- 사용자가 직접 인터랙션을 체험 가능
- 장난스러운 인터랙션은 유지하되, 카피는 전체적으로 더 간결하게 유지
- 날짜별 아카이브와 상세 페이지로 확장 가능

## 현재 상태
- Day 001 ~ Day 007 디자인 데이터 등록 완료
- 메인에서 오늘의 디자인 + 아카이브 목록 표시
- 단일 상세 템플릿 `day/?slug=<slug>` 지원
- 상세 페이지 이전/다음 네비게이션 지원
- interaction type별 공통 핸들러 구조 적용
- GitHub Pages 자동 배포 연결 완료
- 멀티롤 문서(`SPEC.md`, `UX.md`, `TASKS.md`, `REVIEW.md`) 정리 완료

## 프로젝트 구조
- `index.html` — 메인 엔트리
- `data.js` — 날짜별 디자인 데이터
- `app.js` — 공통 렌더링/인터랙션 로직
- `script.js` — 메인 페이지 렌더링
- `day/index.html` — 단일 상세 템플릿
- `day.js` — 상세 페이지 렌더링
- `styles.css` — 공통 스타일
- `SPEC.md`, `UX.md`, `TASKS.md`, `REVIEW.md` — 기획/리뷰 문서
- `NOTION_UPDATE_TEMPLATE.md` — 큰 업데이트 기록용 템플릿

## Current day concepts
- Day 001 — runaway-no
- Day 002 — shrinking-no
- Day 003 — evasive-no
- Day 004 — swapping-labels
- Day 005 — growing-yes
- Day 006 — leaning-choice
- Day 007 — confirm-stack

## Run
### 로컬 실행
가장 간단한 방법은 브라우저에서 `index.html`을 직접 여는 것이다.

또는 간단한 정적 서버로 실행할 수 있다:

```bash
cd projects/marryme
python3 -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000` 접속.

## Build
정적 사이트라 별도 build 단계는 없다.

## Validate
새 day를 추가했다면 먼저 검증을 돌리는 걸 권장한다.

```bash
cd projects/marryme
npm run validate:days
```

검증 항목 예시:
- slug 형식
- slug / id / dayNumber 중복
- 필수 문자열 필드 누락
- interaction type 유효성
- interaction options/messages 자료형

## Deploy
- GitHub Pages로 자동 배포된다.
- `main` 브랜치에 push하면 GitHub Actions가 배포한다.

## Demo
- GitHub repo: <https://github.com/typark2000/marryme>
- Live demo: <https://typark2000.github.io/marryme/>
- Day detail example: <https://typark2000.github.io/marryme/day/?slug=day-007>

## 새 디자인 추가 방법
1. 새 날짜/새 콘셉트 기획 정리
2. `SPEC.md` / `UX.md` / `TASKS.md` 영향 범위 확인
3. `data.js`에 새 day 객체 추가
4. 필요한 인터랙션이 있으면 `app.js`에 핸들러 추가
5. `npm run validate:days` 실행
6. 로컬 확인
7. public push 전 비밀정보/디버그 로그 점검
8. 큰 업데이트인 경우에만 Notion `Project Updates`에 기록
9. push 후 Pages 배포 확인
