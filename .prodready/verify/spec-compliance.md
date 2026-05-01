# Specification Compliance Report

Generated: 2026-05-01 21:46:17 UTC

## User Stories

| ID | Title | Status | Test Coverage |
|----|-------|--------|---------------|
| US-001 | Create account and sign in | ✓ Implemented | `backend/tests/integration/test_auth_endpoints.py`, `e2e/auth-and-profile.spec.ts` (scaffolded) |
| US-002 | Manage user profile | ✓ Implemented | `backend/tests/integration/test_profiles_me.py`, `e2e/auth-and-profile.spec.ts` (scaffolded) |
| US-003 | Compose and send a private letter | ✓ Implemented | `backend/tests/integration/test_letters_private_api.py`, `e2e/private-letters.spec.ts` (scaffolded) |
| US-004 | Browse letter history | ✓ Implemented | `backend/tests/integration/test_letters_private_api.py`, `e2e/private-letters.spec.ts` (scaffolded) |
| US-005 | Find user by ID | ✓ Implemented | `backend/tests/integration/test_discovery_api.py`, `e2e/discovery-open-letters.spec.ts` (scaffolded) |
| US-006 | Discover users from random list | ✓ Implemented | `backend/tests/integration/test_discovery_api.py`, `e2e/discovery-open-letters.spec.ts` (scaffolded) |
| US-007 | Publish and reply to open letters | ✓ Implemented | `backend/tests/integration/test_open_letters_api.py`, `backend/tests/integration/test_moderation_api.py`, `e2e/discovery-open-letters.spec.ts` (scaffolded) |
| US-008 | Earn/receive postcards | ✓ Implemented | `backend/tests/integration/test_postcards_api.py`, `backend/tests/unit/test_postcard_grants.py`, `e2e/postcards.spec.ts` (scaffolded) |
| US-009 | Attach owned postcard to letter | ✓ Implemented | `backend/tests/integration/test_letter_postcard_attach_api.py`, `e2e/postcards.spec.ts` (scaffolded) |

**Coverage**: 9/9 stories implemented (100%)

## API Endpoints

OpenAPI contract paths: 13  
Implemented URL routes in backend: 19 (includes health/schema and extra internal endpoints)

| Method | Path | Status | Test |
|--------|------|--------|------|
| POST | /auth/register | ✓ | ✓ |
| POST | /auth/login | ✓ | ✓ |
| POST | /auth/logout | ✓ | ✓ |
| GET/PATCH | /profiles/me | ✓ | ✓ |
| GET | /users/by-id/{displayId} | ✓ (implemented as `display_id`) | ✓ |
| GET | /users/discover | ✓ | ✓ |
| GET/POST | /letters | ✓ | ✓ |
| GET | /letters/{letterId} | ✓ | ✓ |
| GET | /letters/open | ✓ | ✓ |
| POST | /letters/{letterId}/replies | ✓ | ✓ |
| GET | /postcards/collection | ✓ | ✓ |
| POST | /letters/{letterId}/postcard | ✓ | ✓ |
| POST | /moderation/reports | ✓ | ✓ |

**Coverage**: 13/13 OpenAPI endpoints implemented (100%)

## Data Model

| Entity | Fields | Relations | Status |
|--------|--------|-----------|--------|
| app_user | ✓ Complete | ✓ | ✓ |
| user_profile | ✓ Complete | ✓ One-to-one user | ✓ |
| letter | ✓ Complete | ✓ sender/recipient/parent | ✓ |
| postcard | ✓ Complete | ✓ | ✓ |
| user_postcard | ✓ Complete | ✓ user/postcard | ✓ |
| letter_postcard | ✓ Complete | ✓ one-to-one letter | ✓ |
| moderation_report | ✓ Complete | ✓ reporter/letter | ✓ |

Indexes from schema are present in Django model metadata (`letters`, `postcards`, `moderation` apps), including:
- `idx_letter_sender_created_at`
- `idx_letter_recipient_created_at`
- `idx_letter_visibility_created_at`
- `idx_letter_parent_letter_id`
- `idx_user_postcard_user_unlocked_at`
- `idx_moderation_report_status_created_at`

## Gaps

- OpenAPI contract does not yet document implemented GDPR endpoints (`/gdpr/export`, `/gdpr/delete-account`) and postcard grant endpoint (`/postcards/grant`).
- E2E specs are scaffolded and currently skipped, so user-story verification is primarily backend integration/unit test driven.

## Result

**Compliance: 100% implementation coverage against defined stories and OpenAPI paths, with documentation/test maturity gaps noted above.**
