# REVIEW.md — marryme review

## Review summary
검토 범위: 정적 프론트엔드 구조, 날짜별 데이터 확장성, 접근성, 공개 저장소 노출 위험

## Risk-ranked issues

### High
없음.

### Medium
1. **개별 day permalink 부재**
   - 지금은 아카이브 카드가 목록 역할만 하고 개별 URL이 없음.
   - 영향: 공유성과 회고성이 제한됨.
   - 상태: 미해결

2. **interaction 타입 증가 시 script 복잡도 상승 가능성**
   - 현재는 `script.js` 내부 분기 처리로 충분하지만 타입이 늘면 관리가 어려워질 수 있음.
   - 영향: 유지보수성 저하 가능성
   - 상태: 미해결

### Low
1. **아카이브 정보 밀도 제한**
   - 현재는 카드에 요약 정보만 보임.
   - 영향: 탐색성은 무난하지만 회고 UX는 제한적.
   - 상태: 허용

## Security review
- 정적 사이트이며 인증/세션/서버 저장소 없음
- 현재 코드상 API 키/토큰/인증 흐름 없음
- 공개 저장소 운영 시 `.env`, 토큰, 사설 URL, 디버그 로그 제외 원칙 유지 필요

## Privacy review
- 사용자 데이터 수집 기능 없음
- 폼 전송/쿠키/분석 스크립트 없음
- 현재 범위에서 개인정보 처리 위험 낮음

## Accessibility review
- reduced motion 대응 존재
- calm mode 존재
- 키보드 포커스 스타일 유지
- 아카이브 카드가 실제 상세 페이지로 연결될 때 링크 텍스트/포커스 순서 추가 점검 필요

## Release risk review
- 현재 릴리스 리스크는 낮음
- 남은 핵심 리스크는 permalink 부재와 interaction 구조 확장성

## Recommendation
현재 구조는 MVP로 공개 유지 가능.
다음 큰 업데이트에서는 개별 day 상세 페이지 또는 permalink 구조를 우선 추가할 것.
