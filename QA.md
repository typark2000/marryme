# QA.md — marryme

## Purpose
Push 전 QA 게이트 기록용 문서.

## QA Run — 2026-03-16 / Post-launch polish round 2
### Scope
- what changed: Added a reusable OG preview asset, expanded OG/Twitter metadata, added archive tag filters, and improved related-day ranking on detail pages.
- build/validation target: day data validation, runtime syntax safety, archive filtering behavior, detail share/meta continuity
- surfaces checked: OG asset path, homepage search+tag filters, detail related-day ordering, share button continuity, latest-day render continuity

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
- summary: Sharing previews are now more complete, archive browsing gained tag-level filtering, and detail pages suggest more relevant related days without breaking the existing Day 001~100 runtime.

### Findings
- issue: Preview metadata now points to a static shared asset; truly per-day social cards would require a separate image generation layer later.
- severity: low
- status: accepted / tracked

### Push decision
- allowed to push: yes
- reason: QA passed and no blocking issues remain.
