# REVIEW.md — marryme MVP review

## Review summary
검토 범위: 정적 프론트엔드, GitHub Pages 배포, 공개 저장소 노출 위험, 접근성

## Risk-ranked issues

### High
없음.

### Medium
1. **키보드/감각 민감 사용자 접근성 문제**
   - 기존 상태에서는 `싫어` 버튼이 focus 시 이동하여 키보드 사용자 경험이 나빴음.
   - 조치: calm mode 토글 및 `prefers-reduced-motion` 대응 추가.
   - 상태: 완화됨

2. **프로젝트 구조의 확장성 부족**
   - 현재는 단일 페이지 구조라 날짜별 디자인이 늘어나면 유지보수가 어려움.
   - 조치: `TASKS.md`에 날짜별 구조 분리 작업 추가.
   - 상태: 미해결

### Low
1. **README 운영 정보 부족**
   - 실행/배포/데모/콘텐츠 추가 절차가 부족했음.
   - 조치: README 보강.
   - 상태: 완화됨

2. **JS 비활성 환경 안내 부족**
   - 스크립트가 꺼져도 페이지는 열리지만, 사용자 안내가 더 명확할 필요가 있었음.
   - 조치: `noscript` 안내 추가.
   - 상태: 완화됨

## Security review
- 정적 사이트이며 인증/세션/서버 저장소 없음
- 공개 저장소에 비밀정보가 포함되면 위험하므로 `.env`, 토큰, 개인 URL, 디버그 로그 제외 필요
- 현재 코드상 API 키/토큰/인증 흐름은 없음
- GitHub Actions workflow는 Pages 배포 용도만 사용

## Privacy review
- 사용자 데이터 수집 기능 없음
- 폼 전송/쿠키/분석 스크립트 없음
- 현재 범위에서 개인정보 처리 위험 낮음

## Accessibility review
- 색 대비는 대체로 양호
- 모션 감소 대응이 추가됨
- 키보드 포커스 사용자 대응이 개선됨
- 향후 아카이브/추가 상호작용 시 focus order, semantic landmarks 재점검 필요

## Release risk review
- 현재 릴리스 리스크는 낮음
- 가장 큰 잔여 리스크는 구조 확장성(날짜별 콘텐츠 관리)임

## Recommendation
현재 MVP는 공개 데모 상태로 유지 가능.
다음 릴리스 전에는 날짜별 아카이브 구조를 우선 정리할 것.
