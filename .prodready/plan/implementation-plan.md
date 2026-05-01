# Implementation Plan

## Overview

Project: Letteranne  
Pattern: Modular Monolith  
Stack: Django 6 headless API (`django-modern-rest`, `django-allauth`), PostgreSQL, Django Tasks, React SPA (TypeScript strict, TanStack), Orval, Playwright

## Phases

### Phase 1: Foundation (Week 1)
**Goal**: Stand up development baseline and core platform primitives.
- Monorepo structure (backend/frontend/shared contracts)
- Docker + local environment + CI baseline
- PostgreSQL schema and migration baseline
- Authentication/session/CSRF baseline
- OpenAPI workflow + Orval client generation

### Phase 2: Core Features (Week 2-3)
**Goal**: Deliver MVP feature set from user stories.
- Private delayed letters (compose, queue, delivery task, history)
- Open letters + replies
- User profile and user lookup/discovery
- Postcard collection + postcard attachment to letters
- Basic moderation reporting

### Phase 3: Integration and Hardening (Week 4)
**Goal**: Stabilize for MVP release.
- End-to-end flow completion across backend/frontend
- Error handling, observability, and reliability hardening
- GDPR essentials (data export/delete hooks baseline)
- Performance checks on feed/history queries
- Release checklist and docs

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Auth + CSRF integration issues between SPA and headless Django | High | Add dedicated auth integration tests early; keep cookie/session config explicit by environment |
| Delayed delivery logic creates message timing bugs | High | Isolate scheduling logic in service + task tests with frozen time utilities |
| Scope pressure in 4-week solo timeline | High | Prioritize P0 stories; gate P1 items behind week-3 progress checkpoint |
| Open-letter feed query performance degrades | Medium | Add pagination + indexes first; profile queries before release |
| OpenAPI and frontend client drift | Medium | Regenerate Orval client in CI and fail build on spec/client mismatch |

## Dependencies

External dependencies:
- [ ] VPS provisioned with Docker + Caddy access
- [ ] Domain and TLS setup strategy confirmed
- [ ] SMTP/email provider (for auth lifecycle emails, if enabled in MVP)
- [ ] Optional Sentry project (if monitoring enabled pre-launch)

