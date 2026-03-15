# marryme

매일 하나씩 새로운 청혼 페이지 디자인이 업로드되는 웹앱.

## 컨셉
- 매일 다른 청혼 웹 디자인 공개
- 사용자가 직접 인터랙션을 체험 가능
- 장난스럽게 `거절 버튼을 누르기 어렵게 만드는` 연출이 핵심
- 날짜별 아카이브와 상세 페이지로 확장 가능

## 현재 상태
- data-driven 구조로 재편 완료
- Day 001 / Day 002 디자인 데이터 등록 완료
- 메인에서 오늘의 디자인 + 아카이브 목록 표시
- 단일 상세 템플릿 `day/?slug=<slug>` 지원
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

## Deploy
- GitHub Pages로 자동 배포된다.
- `main` 브랜치에 push하면 GitHub Actions가 배포한다.

## Demo
- GitHub repo: <https://github.com/typark2000/marryme>
- Live demo: <https://typark2000.github.io/marryme/>
- Day 001: <https://typark2000.github.io/marryme/day/?slug=day-001>
- Day 002: <https://typark2000.github.io/marryme/day/?slug=day-002>

## 새 디자인 추가 방법
1. 새 날짜/새 콘셉트 기획 정리
2. `SPEC.md` / `UX.md` / `TASKS.md` 영향 범위 확인
3. `data.js`에 새 day 객체 추가
4. 필요한 인터랙션이 있으면 `app.js`에 타입 추가
5. 로컬 확인
6. public push 전 비밀정보/디버그 로그 점검
7. 큰 업데이트인 경우에만 Notion `Project Updates`에 기록
8. push 후 Pages 배포 확인

이제는 상세 페이지용 HTML 파일을 day마다 따로 만들 필요가 없다.
