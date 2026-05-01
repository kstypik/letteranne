# Test Plan

## Testing Strategy

### Test Pyramid

```
        /\
       /  \   E2E (15%)
      /----\
     /      \  Integration (35%)
    /--------\
   /          \  Unit (50%)
  /-----------\
```

Rationale: This MVP has important API/state transitions (auth, delayed delivery, moderation), so integration coverage is intentionally high.

## Quality Targets

- Backend coverage target: 80%+ for service/domain modules
- Frontend coverage target: 75%+ for critical screens/components
- Critical E2E journeys: 100% pass before release

## Unit Tests

**What to test**
- Django services: validation, delivery scheduling rules, postcard ownership rules
- Model constraints and helper utilities
- Frontend UI components: rendering, form validation, interactions
- Client adapters: request/response mapping and error normalization

**Frameworks**
- Backend: `pytest`
- Frontend: `vitest` + `@testing-library/react`

**Locations**
- `backend/tests/unit/`
- `frontend/src/**/__tests__/`

## Integration Tests

**What to test**
- API endpoints against test DB
- Authentication/session/CSRF behavior
- Query correctness for history/feed pagination
- Django task execution for delayed delivery and reward grants

**Frameworks**
- Backend: `pytest` + `pytest-django`
- Frontend integration (selected): `vitest` + `msw`

**Locations**
- `backend/tests/integration/`
- `frontend/src/integration-tests/`

### API Test Cases

#### Auth
- [ ] `POST /auth/register` success
- [ ] `POST /auth/register` duplicate email conflict
- [ ] `POST /auth/login` success
- [ ] `POST /auth/login` invalid credentials
- [ ] `POST /auth/logout` clears session

#### Profiles
- [ ] `GET /profiles/me` authenticated success
- [ ] `PATCH /profiles/me` updates bio/avatar
- [ ] `PATCH /profiles/me` validation failure

#### Users and Discovery
- [ ] `GET /users/by-id/{displayId}` found
- [ ] `GET /users/by-id/{displayId}` not found
- [ ] `GET /users/discover` returns randomized list

#### Letters
- [ ] `POST /letters` private letter success
- [ ] `POST /letters` empty body validation failure
- [ ] `GET /letters` paginated history
- [ ] `GET /letters/{id}` participant success
- [ ] `GET /letters/{id}` forbidden for non-participant
- [ ] `GET /letters/open` returns public feed
- [ ] `POST /letters/{id}/replies` open letter reply success

#### Postcards and Moderation
- [ ] `GET /postcards/collection` returns owned postcards
- [ ] `POST /letters/{id}/postcard` attach owned postcard success
- [ ] `POST /letters/{id}/postcard` forbidden for unowned postcard
- [ ] `POST /moderation/reports` report submission success

## E2E Tests

**Framework**: `Playwright`  
**Location**: `e2e/`

### E2E Scenarios (mapped from feature files)
- [ ] `auth-and-profile.feature` -> `auth-and-profile.spec.ts`
- [ ] `private-letters.feature` -> `private-letters.spec.ts`
- [ ] `discovery-and-open-letters.feature` -> `discovery-open-letters.spec.ts`
- [ ] `postcards.feature` -> `postcards.spec.ts`

### Critical Journey Matrix
- [ ] User signs up, logs in, and updates profile
- [ ] User sends delayed private letter; recipient sees after schedule
- [ ] User discovers people, posts open letter, receives reply
- [ ] User attaches owned postcard to letter
- [ ] User reports abusive open-letter content

## Test Data

### Fixtures
- Factory helpers for users, letters, postcards, and moderation reports
- Time-control fixtures for delivery scheduling tests
- MSW handlers for frontend integration states

### Seed Data
- Deterministic seed script for local dev/testing:
  - 10 users
  - 20 private letters
  - 10 open letters + replies
  - sample postcard inventory

## CI Integration

Checks on each PR:
1. Backend lint/format check
2. Frontend lint/type check
3. Backend unit + integration tests (with test PostgreSQL service)
4. Frontend unit/integration tests
5. OpenAPI -> Orval generation consistency check
6. Playwright smoke E2E on main protected branch

## Traceability

| User Story | Feature File | Planned E2E |
|------------|--------------|-------------|
| US-001 | `auth-and-profile.feature` | `auth-and-profile.spec.ts` |
| US-002 | `auth-and-profile.feature` | `auth-and-profile.spec.ts` |
| US-003 | `private-letters.feature` | `private-letters.spec.ts` |
| US-004 | `private-letters.feature` | `private-letters.spec.ts` |
| US-005 | `discovery-and-open-letters.feature` | `discovery-open-letters.spec.ts` |
| US-006 | `discovery-and-open-letters.feature` | `discovery-open-letters.spec.ts` |
| US-007 | `discovery-and-open-letters.feature` | `discovery-open-letters.spec.ts` |
| US-008 | `postcards.feature` | `postcards.spec.ts` |
| US-009 | `postcards.feature` | `postcards.spec.ts` |

