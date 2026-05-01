# Tech Stack

## Core

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Language | Python 3.14 (backend), TypeScript 6.x strict (frontend) | High productivity for solo dev with strong type safety on UI/API integration |
| Runtime | CPython + Node.js 22 LTS toolchain | Stable backend runtime plus modern frontend build/test ecosystem |
| Framework | Django 6.x headless API (`django-modern-rest`) + React 19 SPA | Fast iteration on backend and rich interaction model for writing UX |
| Database | PostgreSQL 18 | Reliable relational model for users, letters, threads, moderation, and history |
| ORM | Django ORM | Native integration with Django ecosystem and migration tooling |

## Infrastructure

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Container | Docker | Reproducible local/prod environments |
| Reverse Proxy | Caddy | Simple HTTPS, routing, and low-maintenance config |
| CI/CD | GitHub Actions | Free-tier friendly and integrates directly with repository workflow |

## Development

| Tool | Purpose |
|------|---------|
| Ruff | Python linting, formatting and import/style checks |
| Pytest + pytest-django | Backend unit/integration testing |
| Vitest | Frontend unit/component testing |
| MSW | API mocking for frontend tests |
| Playwright | End-to-end testing |
| Oxilint | Frontend linting |
| Oxfmt | Frontend formatting |
| lefthook | Local hooks for quality automation |
| Orval | Typed frontend API client generation from OpenAPI |
| uv | Python's package and project manager |
| pnpm | JavaScript package and project manager |

## Versions

```json
{
  "python": "3.14.x",
  "django": "6.0.x",
  "postgresql": "18.x",
  "node": "22.x",
  "typescript": "6.x",
  "react": "19.x",
  "@tanstack/react-query": "5.x",
  "@tanstack/react-form": "1.x",
  "@tanstack/react-router": "1.x",
  "pytest": "9.x",
  "pytest-django": "4.x",
  "vitest": "4.x",
  "msw": "2.x",
  "playwright": "1.x",
  "orval": "7.x",
  "ruff": "0.x",
  "uv": "0.x",
  "pnpm": "10.x"
}
```

## Authentication

- Strategy: Session auth (cookie-based) with optional token endpoint for non-browser clients
- Library: `django-allauth` in headless mode
- Storage:
  - Browser: HTTP-only secure session cookies
  - SPA CSRF: CSRF token header/cookie flow for state-changing requests

## Monitoring (Optional for MVP, recommended baseline)

- Logging: Structured JSON logs from Django; Caddy access logs
- Error tracking: Sentry (optional in v1.0; enable before public growth phase)
- Analytics: Privacy-friendly event analytics (self-hosted PostHog or Plausible later)

