# Implementation Backlog

## Sprint 1: Foundation

### TASK-001: Repository and workspace scaffolding
**Priority**: P0 | **Estimate**: 2h | **Status**: Done

**Description**:  
Create backend/frontend workspace structure, shared conventions, and base docs.

**Acceptance Criteria**:
- [ ] `backend/` and `frontend/` workspaces created
- [ ] Standard folder conventions documented
- [ ] Base `.editorconfig` and project `.gitignore` updated
- [ ] README sections for local setup placeholders added

**Blocked by**: None  
**Blocks**: TASK-002, TASK-003, TASK-004

---

### TASK-002: Docker local development baseline
**Priority**: P0 | **Estimate**: 3h | **Status**: Done

**Description**:  
Set up containerized local environment for backend, frontend, and PostgreSQL.

**Acceptance Criteria**:
- [ ] `Dockerfile`(s) for backend/frontend created
- [ ] `docker-compose.yml` includes backend, frontend, postgres
- [ ] `.dockerignore` files added
- [ ] Services start successfully with one command

**Blocked by**: TASK-001  
**Blocks**: TASK-005, TASK-006

---

### TASK-003: Backend Django project bootstrap
**Priority**: P0 | **Estimate**: 3h | **Status**: Done

**Description**:  
Initialize Django 6 project with modular app layout and settings split.

**Acceptance Criteria**:
- [ ] Django project and apps (`auth`, `profiles`, `letters`, `discovery`, `postcards`, `moderation`) created
- [ ] Environment-based settings configured
- [ ] Health check endpoint implemented
- [ ] Ruff + pytest config added

**Blocked by**: TASK-001  
**Blocks**: TASK-007, TASK-008, TASK-009

---

### TASK-004: Frontend React SPA bootstrap
**Priority**: P0 | **Estimate**: 3h | **Status**: Done

**Description**:  
Initialize React TypeScript strict SPA with TanStack Router/Query baseline.

**Acceptance Criteria**:
- [ ] React app scaffolded with strict TypeScript
- [ ] TanStack Router root routes configured
- [ ] TanStack Query client setup complete
- [ ] ESLint/formatter/test runner configured

**Blocked by**: TASK-001  
**Blocks**: TASK-010, TASK-011, TASK-012

---

### TASK-005: PostgreSQL + Django DB connection and migrations
**Priority**: P0 | **Estimate**: 2h | **Status**: Done

**Description**:  
Configure Django database settings and verify migrations workflow.

**Acceptance Criteria**:
- [ ] PostgreSQL connection works in local Docker setup
- [ ] Initial migration pipeline runs successfully
- [ ] Database readiness documented for dev/test

**Blocked by**: TASK-002, TASK-003  
**Blocks**: TASK-008, TASK-013

---

### TASK-006: CI baseline (lint + tests)
**Priority**: P0 | **Estimate**: 3h | **Status**: Done

**Description**:  
Create GitHub Actions workflow for backend and frontend quality checks.

**Acceptance Criteria**:
- [ ] Workflow runs backend lint + tests
- [ ] Workflow runs frontend lint + tests
- [ ] Failing checks block merge
- [ ] Caching enabled for package managers

**Blocked by**: TASK-002, TASK-003, TASK-004  
**Blocks**: TASK-030

---

### TASK-007: Headless auth integration with django-allauth
**Priority**: P0 | **Estimate**: 4h | **Status**: Done

**Description**:  
Implement register/login/logout endpoints with session cookies.

**Acceptance Criteria**:
- [ ] Register endpoint implemented
- [ ] Login and logout endpoints implemented
- [ ] Session cookie security settings defined per environment
- [ ] Auth integration tests cover success and failure paths

**Blocked by**: TASK-003, TASK-005  
**Blocks**: TASK-011, TASK-014, TASK-018

---

### TASK-008: Core data models and migrations
**Priority**: P0 | **Estimate**: 4h | **Status**: Done

**Description**:  
Implement entities from data model in Django ORM and create migrations.

**Acceptance Criteria**:
- [ ] Models for UserProfile, Letter, Postcard, UserPostcard, LetterPostcard, ModerationReport created
- [ ] Required constraints/indexes implemented
- [ ] Migrations generated and applied
- [ ] Model-level tests verify critical constraints

**Blocked by**: TASK-003, TASK-005  
**Blocks**: TASK-013, TASK-014, TASK-016, TASK-018, TASK-021

---

### TASK-009: OpenAPI generation and Orval contract pipeline
**Priority**: P0 | **Estimate**: 3h | **Status**: Done

**Description**:  
Publish backend OpenAPI and configure frontend Orval generation.

**Acceptance Criteria**:
- [ ] Backend exposes OpenAPI schema endpoint/file
- [ ] Orval config generates typed frontend client
- [ ] Generated client committed or reproducibly generated in CI
- [ ] Contract generation documented

**Blocked by**: TASK-003, TASK-004  
**Blocks**: TASK-012, TASK-015, TASK-017

---

## Sprint 2: Core Letter and Profile Features

### TASK-010: Frontend app shell and auth screens
**Priority**: P0 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Build mobile-first shell, sign-up/login screens, and protected route behavior.

**Acceptance Criteria**:
- [ ] Mobile-first layout shell implemented
- [ ] Sign-up/login screens with form validation
- [ ] Unauthorized routes redirect correctly
- [ ] Auth state bootstrap handled on app load

**Blocked by**: TASK-004, TASK-007  
**Blocks**: TASK-011, TASK-019

---

### TASK-011: Session/CSRF frontend integration
**Priority**: P0 | **Estimate**: 2h | **Status**: Ready

**Description**:  
Wire API client for cookie credentials and CSRF handling.

**Acceptance Criteria**:
- [ ] API client sends credentials by default
- [ ] CSRF token retrieval/forwarding implemented for mutating requests
- [ ] 401 handling and relogin flow defined
- [ ] Integration tests for auth-protected requests pass

**Blocked by**: TASK-007, TASK-010  
**Blocks**: TASK-015, TASK-017, TASK-019

---

### TASK-012: Typed API hooks and query key conventions
**Priority**: P1 | **Estimate**: 2h | **Status**: Ready

**Description**:  
Create reusable TanStack Query hooks over generated Orval client.

**Acceptance Criteria**:
- [ ] Query key conventions documented
- [ ] Base hooks for auth/profile/letters/discovery created
- [ ] Error/loading typing standardized

**Blocked by**: TASK-009, TASK-011  
**Blocks**: TASK-015, TASK-017, TASK-020

---

### TASK-013: Profile API (`GET/PATCH /profiles/me`)
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement profile retrieval and update endpoints with validation.

**Acceptance Criteria**:
- [ ] `GET /profiles/me` returns authenticated profile
- [ ] `PATCH /profiles/me` updates bio/avatar with validation
- [ ] Unauthorized access is rejected
- [ ] API tests cover success and invalid payloads

**Blocked by**: TASK-008, TASK-011  
**Blocks**: TASK-019

---

### TASK-014: Private letter create/read APIs
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Implement private letter creation, detail read, and ownership checks.

**Acceptance Criteria**:
- [ ] `POST /letters` supports private letter validation rules
- [ ] `GET /letters/{id}` enforces participant-only access
- [ ] Queued status and scheduled delivery fields are persisted
- [ ] API tests cover unauthorized and invalid cases

**Blocked by**: TASK-007, TASK-008  
**Blocks**: TASK-015, TASK-016, TASK-022

---

### TASK-015: Letter composer UI + delayed send flow
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Build writing-focused compose experience and submit private letters.

**Acceptance Criteria**:
- [ ] Letter compose screen with subject/body/schedule controls
- [ ] Empty-body validation blocks submit
- [ ] Send mutation updates local history view
- [ ] Component/integration tests for compose flow

**Blocked by**: TASK-011, TASK-012, TASK-014  
**Blocks**: TASK-022, TASK-026

---

### TASK-016: Letter history APIs and pagination
**Priority**: P0 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement history listing with pagination and visibility filters.

**Acceptance Criteria**:
- [ ] `GET /letters` supports page/limit/visibility query params
- [ ] Sent/received history ordering by recent activity works
- [ ] Index-backed query plan validated
- [ ] API tests cover pagination and auth boundaries

**Blocked by**: TASK-008, TASK-014  
**Blocks**: TASK-017, TASK-026

---

### TASK-017: Letter history UI and detail screens
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Build list and detail thread screens for private/open letters.

**Acceptance Criteria**:
- [ ] Paginated history list UI implemented
- [ ] Letter detail view renders full content and metadata
- [ ] Loading/error/empty states implemented
- [ ] UI tests cover navigation and access error handling

**Blocked by**: TASK-011, TASK-012, TASK-016  
**Blocks**: TASK-026

---

## Sprint 3: Discovery, Open Letters, Postcards, Moderation

### TASK-018: User lookup and discovery APIs
**Priority**: P0 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement `GET /users/by-id/{displayId}` and `GET /users/discover`.

**Acceptance Criteria**:
- [ ] User by ID lookup endpoint implemented
- [ ] Randomized discovery endpoint implemented
- [ ] Empty/no-result states represented cleanly
- [ ] API tests for auth + not-found behavior

**Blocked by**: TASK-007, TASK-008  
**Blocks**: TASK-020

---

### TASK-019: Profile UI editing and public profile preview
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement user profile screens and editing flow.

**Acceptance Criteria**:
- [ ] Edit profile form supports bio/avatar updates
- [ ] Form validation and save feedback implemented
- [ ] Public profile card component created
- [ ] UI tests cover update success/failure

**Blocked by**: TASK-010, TASK-013  
**Blocks**: TASK-020

---

### TASK-020: Discovery UI and user lookup interactions
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Build screens for finding users by ID and browsing random users.

**Acceptance Criteria**:
- [ ] User ID search UI with no-result state
- [ ] Random discovery list with refresh action
- [ ] Profile card integration for discovered users
- [ ] Component tests cover empty and success flows

**Blocked by**: TASK-012, TASK-018, TASK-019  
**Blocks**: TASK-026

---

### TASK-021: Open letters + reply APIs
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Implement open-letter feed, publishing, and reply endpoints.

**Acceptance Criteria**:
- [ ] `GET /letters/open` returns paginated public feed
- [ ] `POST /letters` with open visibility supported
- [ ] `POST /letters/{id}/replies` creates threaded reply
- [ ] API tests cover thread linkage and validations

**Blocked by**: TASK-008, TASK-014  
**Blocks**: TASK-022, TASK-026

---

### TASK-022: Delivery scheduler and Django task processing
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Implement asynchronous delivery worker for queued letters.

**Acceptance Criteria**:
- [ ] Task scans queued letters by `scheduled_for`
- [ ] Delivery status transition logic implemented
- [ ] Idempotency guard prevents duplicate delivery updates
- [ ] Task tests include time-based edge cases

**Blocked by**: TASK-014, TASK-015  
**Blocks**: TASK-026

---

### TASK-023: Postcard collection APIs
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement postcard ownership listing and reward grant path.

**Acceptance Criteria**:
- [ ] `GET /postcards/collection` returns owned postcards
- [ ] Reward grant service creates ownership entries
- [ ] Duplicate grant prevention enforced
- [ ] API/service tests for grant rules

**Blocked by**: TASK-008  
**Blocks**: TASK-024, TASK-026

---

### TASK-024: Postcard attach-to-letter API
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement `POST /letters/{id}/postcard` with ownership checks.

**Acceptance Criteria**:
- [ ] Endpoint validates caller owns selected postcard
- [ ] Attachment record persists correctly
- [ ] Unauthorized attachment attempts are rejected
- [ ] API tests cover success/forbidden/not-found

**Blocked by**: TASK-014, TASK-023  
**Blocks**: TASK-025, TASK-026

---

### TASK-025: Postcard UI picker and render in letter detail
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Build postcard collection UI and letter attachment interaction.

**Acceptance Criteria**:
- [ ] Postcard picker modal in composer implemented
- [ ] Owned postcard list renders from API
- [ ] Letter detail shows attached postcard
- [ ] UI tests cover owned/unowned flows

**Blocked by**: TASK-012, TASK-024  
**Blocks**: TASK-026

---

### TASK-026: Open-letter and moderation end-to-end integration
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Implement frontend open-letter feed/replies and moderation report flow.

**Acceptance Criteria**:
- [ ] Open-letter publishing UI works end-to-end
- [ ] Reply UI links to parent letter thread
- [ ] Moderation report submit flow works
- [ ] Integration tests cover key happy/error paths

**Blocked by**: TASK-017, TASK-020, TASK-021, TASK-022, TASK-024, TASK-025  
**Blocks**: TASK-028, TASK-029

---

## Sprint 4: Hardening and Release Readiness

### TASK-027: Global error handling and API error contract alignment
**Priority**: P1 | **Estimate**: 2h | **Status**: Ready

**Description**:  
Standardize backend and frontend error handling behavior.

**Acceptance Criteria**:
- [ ] Backend returns consistent `Error` schema responses
- [ ] Frontend global error handler/toast integration added
- [ ] Unknown errors mapped to safe user-facing message

**Blocked by**: TASK-014, TASK-017  
**Blocks**: TASK-030

---

### TASK-028: GDPR baseline capabilities
**Priority**: P1 | **Estimate**: 3h | **Status**: Ready

**Description**:  
Implement baseline user data export and account delete workflow hooks.

**Acceptance Criteria**:
- [ ] User data export endpoint/service stub implemented
- [ ] Account deletion flow (soft/hard per decision) implemented
- [ ] Data lifecycle behavior documented
- [ ] Tests verify access controls around export/delete

**Blocked by**: TASK-007, TASK-008, TASK-026  
**Blocks**: TASK-030

---

### TASK-029: Query performance and reliability checks
**Priority**: P1 | **Estimate**: 2h | **Status**: Ready

**Description**:  
Validate high-impact queries and task reliability before release.

**Acceptance Criteria**:
- [ ] Letter history and open-feed query plans reviewed
- [ ] Necessary indexes verified in migrations
- [ ] Task retries/failure logging baseline added
- [ ] Findings documented with follow-up actions

**Blocked by**: TASK-022, TASK-026  
**Blocks**: TASK-030

---

### TASK-030: E2E suite and release checklist
**Priority**: P0 | **Estimate**: 4h | **Status**: Ready

**Description**:  
Implement Playwright happy-path suite and MVP release checklist.

**Acceptance Criteria**:
- [ ] Playwright tests cover auth, private letters, open letters, postcards
- [ ] CI executes E2E suite on protected branch
- [ ] MVP release checklist completed
- [ ] Critical defects triaged with go/no-go decision

**Blocked by**: TASK-006, TASK-026, TASK-027, TASK-028, TASK-029  
**Blocks**: None

---

## Task Summary

| Sprint | Tasks | Total Estimate |
|--------|-------|----------------|
| Sprint 1 | TASK-001 to TASK-009 | 27h |
| Sprint 2 | TASK-010 to TASK-017 | 25h |
| Sprint 3 | TASK-018 to TASK-026 | 30h |
| Sprint 4 | TASK-027 to TASK-030 | 11h |
| **Total** | **30 tasks** | **93h** |

