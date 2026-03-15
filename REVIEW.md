# REVIEW.md — marryme review

## Review summary
검토 범위: 정적 프론트엔드 구조, Day 001~007 interaction set, validation, 탐색성, 공개 저장소 노출 위험

## Risk-ranked issues

### High
없음.

### Medium
1. **interaction 종류가 늘면서 app.js가 다시 커지고 있음**
   - 핸들러 구조로 개선했지만 더 늘어나면 파일 분리가 필요함.
   - 영향: 유지보수성 저하 가능성
   - 상태: 미해결

2. **query parameter 기반 URL은 예쁘진 않음**
   - 자동화와 단순성을 우선한 선택.
   - 영향: 기능상 문제는 없지만 미학적 아쉬움 존재
   - 상태: 허용

### Low
1. **Day 007 confirm overlay는 향후 더 다듬을 여지 있음**
   - 현재는 간단한 MVP 확인 흐름.
   - 영향: 동작은 충분하지만 연출 고도화 여지 존재
   - 상태: 허용

2. **일부 day는 모바일에서 체감 차이가 줄 수 있음**
   - 예: evasive-no, growing-yes, leaning-choice
   - 영향: 완전한 오류는 아니지만 디바이스별 인상 차이 가능
   - 상태: 허용

## Security review
- 정적 사이트이며 인증/세션/서버 저장소 없음
- 현재 코드상 API 키/토큰/인증 흐름 없음
- 공개 저장소 운영 시 `.env`, 토큰, 사설 URL, 디버그 로그 제외 원칙 유지 필요
- GitHub Actions에서 배포 전 validation을 수행하도록 추가함

## Privacy review
- 사용자 데이터 수집 기능 없음
- 폼 전송/쿠키/분석 스크립트 없음
- 현재 범위에서 개인정보 처리 위험 낮음

## Accessibility review
- 키보드 포커스 스타일 유지
- 링크형 카드, 텍스트 링크, day navigation 링크에 focus-visible 적용됨
- 오류 상태에서도 메인 복귀 링크 제공
- 모달형 confirm overlay에도 버튼 포커스 접근 가능

## Release risk review
- 현재 릴리스 리스크는 낮음
- metadata validation으로 기본적인 콘텐츠 실수는 상당 부분 완화됨
- 남은 핵심 리스크는 interaction 구조 확장성과 모바일별 미세한 체감 차이

## Recommendation
현재 구조는 Day 007까지 체험 가능한 공개 MVP로 충분하다.
다음 큰 업데이트에서는 interaction 파일 분리와 OG 메타데이터 강화를 우선 추가할 것.
