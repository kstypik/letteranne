# ADR-003: Authentication Strategy

## Status
Accepted

## Date
2026-05-01

## Context
The frontend is a browser-based React SPA and the backend is a Django headless API. The product requires secure sign-up/login, GDPR-aware account lifecycle controls, and dependable session handling for a social platform with user-generated content.

## Decision
We will use `django-allauth` headless mode with cookie-based session authentication for browser clients because:
- It integrates tightly with Django auth primitives and reduces custom auth surface area.
- HTTP-only secure cookies reduce token theft risk versus localStorage token strategies.
- Session-based auth is straightforward for MVP and compatible with CSRF protections.

## Consequences

### Positive
- Mature, audited auth flows with minimal custom code.
- Better default browser security posture for session credentials.
- Easier account lifecycle management (password reset, verification extensions).

### Negative
- SPA must handle CSRF token flow correctly for state-changing requests.
- Cross-origin deployment requires careful cookie domain/samesite/secure configuration.

### Risks
- Risk: Misconfigured CORS/CSRF could block valid requests or weaken protections.  
  Mitigation: Define explicit allowed origins, enforce CSRF middleware, and include auth integration tests in CI.

## Alternatives Considered
1. Pure JWT access/refresh tokens in SPA storage: Rejected due to higher implementation and security foot-gun risk for v1.
2. Third-party managed auth provider: Rejected to keep architecture simpler and avoid early vendor lock-in/cost.

