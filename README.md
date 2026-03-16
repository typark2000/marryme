# marryme

매일 하나씩 새로운 청혼 페이지 디자인이 업로드되는 웹앱.

## 현재 상태
- Day 001 ~ Day 100 디자인 데이터 등록 완료
- 메인에서 오늘의 디자인 + searchable archive 표시
- 단일 상세 템플릿 `day/?slug=<slug>` 지원
- 상세 페이지 이전/다음 네비게이션 + 링크 복사 지원
- interaction type 목록을 `interaction-types.js`로 분리해 런타임/검증기 동기화
- 기본 OG 메타데이터와 GitHub Pages 자동 배포 연결 완료

## Current day concepts
- Day 001~100: full collection implemented
- Latest day detail: <https://typark2000.github.io/marryme/day/?slug=day-100>

## Validate
```bash
cd projects/marryme
npm run validate:days
```
