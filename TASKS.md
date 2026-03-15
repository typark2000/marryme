# TASKS.md — marryme roadmap

## Done
1. 프로젝트 생성
2. 첫 정적 프로토타입 구현
3. GitHub repo 생성 및 public push
4. GitHub Pages 배포 연결
5. 멀티롤 문서 정비 (`SPEC.md`, `UX.md`, `TASKS.md`, `REVIEW.md`)
6. `data.js` 기반 날짜별 구조로 재편
7. Day 002 추가
8. 메인 화면에 아카이브 목록 추가
9. 개별 day 상세 페이지 및 permalink 구조 추가
10. 공통 렌더링 로직을 `app.js`로 분리
11. 상세 페이지를 단일 템플릿으로 자동화 (`day/?slug=<slug>`)
12. day metadata validation 추가
13. 상세 페이지에 이전/다음 day 네비게이션 추가
14. 이전/다음 day 네비게이션에 제목/설명 미리보기 추가
15. 차분한 모드 제거
16. Day 002 버튼 겹침/축소 버그 수정

## Next
### P0
1. interaction type을 더 모듈화해 새 디자인 추가 비용 줄이기
2. GitHub Actions에서 검증 실패 내용을 더 읽기 쉽게 정리하기
3. 이전/다음 네비게이션에 테마 태그나 interaction 타입까지 노출할지 검토

### P1
4. 썸네일/OG 메타데이터 강화
5. README에 새 day 추가 체크리스트 더 구체화
6. data entry helper 또는 generator 스크립트 검토

### P2
7. 필터링(귀여움/집요함/인터랙션 타입) 추가
8. 사운드/애니메이션 테마 확장
9. 간단한 분석 도구 도입 여부 검토

## Definition of done for next release
- 네비게이션/탐색성이 한 단계 더 좋아짐
- 새 day 추가 절차가 더 단순해짐
- GitHub Pages에서 정상 동작
- 접근성/보안 리뷰 재실행
