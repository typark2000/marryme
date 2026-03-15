# SPEC_DAY8_15.md — marryme Day 008~015 planning

## Goal
Day 008~015를 단순 아이디어 메모가 아니라 실제 구현 가능한 백로그로 정리한다.

## Product direction
- 카피는 짧고 직설적으로 유지
- 장난은 설명문이 아니라 인터랙션으로 만든다
- 정적 웹으로 구현 가능해야 한다
- 모바일에서도 성립해야 한다
- 기존 Day 001~007과 체감 차이가 나야 한다

## Scope
### In scope
- Day 008~015 컨셉 정의
- 각 day의 핵심 interaction 설계
- 구현 난이도 / 리스크 / QA 포인트 정의
- 우선순위와 추천 구현 순서 정의

### Out of scope
- 이번 문서 단계에서 실제 구현 착수
- 신규 백엔드/DB 도입
- 대규모 디자인 시스템 개편

## Days
### Day 008 — button swap
- concept: 좋아 / 잠깐만 버튼이 가까워질 때 자리를 바꾼다
- user value: 단순하지만 즉시 이해되는 장난기
- implementation notes:
  - hover/focus/touch 반응 규칙 필요
  - 버튼 위치 교체 후 겹침 방지 필수
- acceptance criteria:
  - 초기 레이아웃이 안정적이다
  - 버튼 교체가 1~2번은 확실히 체감된다
  - 모바일에서 오작동하지 않는다
- QA focus:
  - 버튼 겹침
  - 터치 시 튐 현상
  - focus 이동 안정성

### Day 009 — layout compression
- concept: 거절을 망설일수록 yes 중심으로 화면이 압축된다
- user value: 버튼이 아니라 레이아웃 자체가 설득하는 느낌
- implementation notes:
  - 카드 폭/여백/정렬 단계 정의 필요
  - 시각 변화는 크되 레이아웃은 깨지지 않아야 함
- acceptance criteria:
  - 단계적 압축 변화가 명확하다
  - 최종 상태에서도 CTA가 깨지지 않는다
- QA focus:
  - 모바일 폭에서 overflow 발생 여부
  - 단계별 레이아웃 안정성

### Day 010 — multiplying yes
- concept: 상호작용할수록 yes 버튼이 하나씩 더 생긴다
- user value: 짧고 강한 시각적 재미
- implementation notes:
  - 복제 버튼 배치 규칙 필요
  - 모든 복제 버튼이 같은 성공 동작을 가져야 함
- acceptance criteria:
  - yes 버튼 복제 후 클릭 일관성이 있다
  - 최대 개수 제한이 있다
- QA focus:
  - 버튼 중첩 여부
  - 포커스 순서
  - 모바일 줄바꿈

### Day 011 — fading no
- concept: 거절 버튼이 점점 희미해진다
- user value: 깔끔하고 덜 부산스러운 연출
- implementation notes:
  - opacity 단계 정의 필요
  - 너무 빨리 안 보이지 않게 제한 필요
- acceptance criteria:
  - 점진적 변화가 보인다
  - 완전히 사라져 UX를 망치지 않는다
- QA focus:
  - 가독성
  - 대비 저하
  - 마지막 상태의 조작 가능성

### Day 012 — sentence completion
- concept: 선택할수록 약속 문장이 완성된다
- user value: 감정선이 조금 더 있는 날
- implementation notes:
  - 단계별 문장 설계 필요
  - 카피 과잉 금지
- acceptance criteria:
  - 문장 진행이 직관적이다
  - 최종 문장이 현재 제품 톤과 맞는다
- QA focus:
  - 문장 단계 순서
  - 카피 어색함
  - 상태 전환 일관성

### Day 013 — decorative hide
- concept: no 버튼이 장식 요소 사이로 숨어든다
- user value: 비주얼 변주
- implementation notes:
  - 장식 밀도와 버튼 식별성 균형 필요
- acceptance criteria:
  - 버튼이 완전히 실종되지는 않는다
  - 장식과 CTA가 모두 구분 가능하다
- QA focus:
  - 장식 과밀도
  - 모바일에서 터치 난이도
  - 버튼 식별성

### Day 014 — card deck persuasion
- concept: 카드 덱 구조에서 yes가 메인 카드에 배치된다
- user value: UI 패턴 변주
- implementation notes:
  - 카드 우선순위 구조 필요
  - 시선 유도 설계 필요
- acceptance criteria:
  - 메인 CTA가 첫눈에 보인다
  - 카드 구조가 복잡하지 않다
- QA focus:
  - 계층 표현
  - 클릭 타깃 충돌
  - 모바일 stacking

### Day 015 — finale mix
- concept: 앞선 패턴 2~3개를 섞은 시즌 피날레
- user value: 컬렉션의 중간 결산 느낌
- implementation notes:
  - 과한 복합성 금지
  - 단계형 인터랙션 수 제한 필요
- acceptance criteria:
  - 단계가 명확하다
  - 산만하지 않다
  - 최종 성공 상태가 자연스럽다
- QA focus:
  - 단계 누락/중복
  - 모바일 복잡도
  - 회귀 버그

## Priority recommendation
### Recommended order
1. Day 010
2. Day 011
3. Day 008
4. Day 012
5. Day 014
6. Day 013
7. Day 009
8. Day 015

## Exit criteria
- Day 008~015 각각의 concept / acceptance / QA focus가 정리되어 있다
- 구현 우선순위가 정의되어 있다
- PM이 개발 티켓으로 쪼갤 수 있는 수준이다
