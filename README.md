# marryme

매일 하나씩 새로운 청혼 페이지 디자인이 업로드되는 웹앱.

## 컨셉
- 매일 다른 청혼 웹 디자인 공개
- 사용자가 직접 인터랙션을 체험 가능
- 장난스럽게 `거절 버튼을 누르기 어렵게 만드는` 연출이 핵심
- 날짜별 아카이브와 다양한 콘셉트 디자인으로 확장 예정

## 현재 상태
- Day 001 정적 프로토타입 구현 완료
- GitHub Pages 자동 배포 연결 완료
- 멀티롤 문서(`SPEC.md`, `UX.md`, `TASKS.md`, `REVIEW.md`) 정리 완료

## 프로젝트 문서
- `SPEC.md` — 범위, 사용자 스토리, 수용 기준
- `UX.md` — UX 흐름, 상태, 컴포넌트 정의
- `TASKS.md` — 다음 작업 계획
- `REVIEW.md` — 코드/보안/릴리즈 리스크 리뷰

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

## 다음 디자인 추가 방법
1. 새 날짜/새 콘셉트 기획 정리
2. `SPEC.md` / `UX.md` 범위 갱신 여부 확인
3. 인터랙션 추가
4. 로컬 확인
5. public push 전 비밀정보/디버그 로그 점검
6. push 후 Pages 배포 확인
