# TASKS.md — marryme roadmap

## Done
1. 프로젝트 생성
2. 첫 정적 프로토타입 구현
3. GitHub repo 생성 및 public push
4. GitHub Pages 배포 연결
5. 멀티롤 문서 정비 (`SPEC.md`, `UX.md`, `TASKS.md`, `REVIEW.md`)
6. 접근성 보완용 calm mode 추가
7. `data.js` 기반 날짜별 구조로 재편
8. Day 002 추가
9. 메인 화면에 아카이브 목록 추가
10. 개별 day 상세 페이지 및 permalink 구조 추가
11. 공통 렌더링 로직을 `app.js`로 분리
12. 상세 페이지를 단일 템플릿으로 자동화 (`day/?slug=<slug>`)

## Next
### P0
1. interaction type을 더 모듈화해 새 디자인 추가 비용 줄이기
2. detail 페이지에 이전/다음 day 네비게이션 추가
3. slug 누락/중복 검증 규칙 추가

### P1
4. day 메타데이터 검증 규칙 추가
5. 썸네일/OG 메타데이터 강화
6. README에 새 day 추가 체크리스트 더 구체화

### P2
7. 필터링(귀여움/집요함/인터랙션 타입) 추가
8. 사운드/애니메이션 테마 확장
9. 간단한 분석 도구 도입 여부 검토

## Definition of done for next release
- 새 day 추가 절차가 더 단순해짐
- 최소 1개 이상의 네비게이션 개선이 추가됨
- GitHub Pages에서 정상 동작
- 접근성/보안 리뷰 재실행
