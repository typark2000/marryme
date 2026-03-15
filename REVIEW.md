# REVIEW.md — marryme review

## Review summary
검토 범위: 정적 프론트엔드 구조, permalink 자동화, day metadata validation, 탐색성, 접근성, 공개 저장소 노출 위험

## Risk-ranked issues

### High
없음.

### Medium
1. **interaction 타입 증가 시 app.js 복잡도 상승 가능성**
   - 검증 레일과 네비게이션은 추가됐지만 interaction 분기는 계속 늘어날 수 있음.
   - 영향: 유지보수성 저하 가능성
   - 상태: 미해결

2. **query parameter 기반 URL은 예쁘진 않음**
   - 자동화와 단순성을 우선한 선택.
   - 영향: 기능상 문제는 없지만 미학적 아쉬움 존재
   - 상태: 허용

### Low
1. **이전/다음 네비게이션 정보 밀도는 아직 얕음**
   - 현재는 day 번호 중심으로 탐색함.
   - 영향: 사용성은 좋아졌지만 더 풍부하게 개선 가능
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
- reduced motion 대응 존재
- calm mode 존재
- 키보드 포커스 스타일 유지
- 링크형 카드, 텍스트 링크, day navigation 링크에 focus-visible 적용됨
- 오류 상태에서도 메인 복귀 링크 제공

## Release risk review
- 현재 릴리스 리스크는 낮음
- 주요 실수였던 slug/metadata 누락은 validation으로 상당 부분 완화됨
- 남은 핵심 리스크는 interaction 구조 확장성

## Recommendation
현재 구조는 공개 가능한 MVP로 충분하다.
다음 큰 업데이트에서는 interaction 모듈화와 navigation 정보 강화(제목/설명 preview)를 우선 추가할 것.
