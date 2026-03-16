# marryme

매일 하나씩 새로운 청혼 페이지 디자인이 업로드되는 웹앱.

## 현재 상태
- Day 001 ~ Day 100 디자인 데이터 등록 완료
- 메인에서 오늘의 디자인 + 아카이브 목록 표시
- 단일 상세 템플릿 `day/?slug=<slug>` 지원
- 상세 페이지 이전/다음 네비게이션 지원
- interaction type별 공통 핸들러 구조 적용
- GitHub Pages 자동 배포 연결 완료

## Current day concepts
- Day 001~100: full collection implemented
- Latest day detail: <https://typark2000.github.io/marryme/day/?slug=day-100>

## Validate
```bash
cd projects/marryme
npm run validate:days
```
