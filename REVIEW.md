# REVIEW.md — marryme review

## Review summary
검토 범위: 정적 프론트엔드 구조, 날짜별 permalink, 접근성, 공개 저장소 노출 위험

## Risk-ranked issues

### High
없음.

### Medium
1. **새 day 추가 시 상세 페이지 파일 생성이 수동임**
   - 현재는 `data.js`에 추가하고 `days/<slug>/index.html`도 함께 만들어야 함.
   - 영향: 반복 작업 발생 가능
   - 상태: 미해결

2. **interaction 타입 증가 시 app.js 복잡도 상승 가능성**
   - 공통화로 개선됐지만 타입이 계속 늘면 별도 모듈 분리가 필요함.
   - 영향: 유지보수성 저하 가능성
   - 상태: 미해결

### Low
1. **상세 페이지 탐색성 추가 개선 여지**
   - 현재는 메인 복귀와 related days만 있음.
   - 영향: 충분히 usable하지만 더 좋아질 수 있음.
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
- 링크형 아카이브 카드와 텍스트 링크에 focus-visible 적용됨
- not found 상태에도 복귀 링크 제공

## Release risk review
- 현재 릴리스 리스크는 낮음
- 남은 핵심 리스크는 상세 페이지 생성의 수동성 및 interaction 구조 확장성

## Recommendation
현재 구조는 공개 가능한 MVP로 충분하다.
다음 큰 업데이트에서는 상세 페이지 생성을 더 자동화하거나 템플릿화할 것.
