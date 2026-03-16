# QA.md — marryme

## Purpose
Push 전 QA 게이트 기록용 문서.

## QA Run — 2026-03-16 / Post-launch refactor + product polish
### Scope
- what changed: Extracted shared interaction type registry, aligned runtime/validation lookup, added searchable archive UX, added share-link controls, and added baseline OG metadata updates for main/detail pages.
- build/validation target: day data validation, runtime syntax safety, archive rendering, day detail navigation/share behavior assumptions
- surfaces checked: shared type registry wiring, homepage archive search, day detail share button wiring, document metadata updates, latest-day rendering continuity

### Checks
- [x] acceptance criteria reviewed
- [x] happy path verified
- [x] edge cases checked
- [x] mobile/basic responsive behavior checked
- [x] copy/content reviewed
- [x] regression check completed
- [x] validation/build/test commands passed

### Commands run
```bash
npm run validate:days
node --check app.js
node --check interaction-types.js
node --check data.js
node --check script.js
node --check day.js
node --check validate-days.js
```

### Result
- status: PASS
- summary: Shared interaction types now come from one source, archive browsing is more usable, and detail pages are easier to share without breaking the Day 001~100 runtime.

### Findings
- issue: OG metadata is now structurally present and updated in-page, but richer preview assets would still need dedicated images later.
- severity: low
- status: accepted / tracked

### Push decision
- allowed to push: yes
- reason: QA passed and no blocking issues remain.
