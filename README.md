# Letteranne

Letteranne is a modular monolith with a Django headless API backend and a React SPA frontend.

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Make
- Node.js 22+ with `pnpm` (for local frontend tooling and E2E runs)

### Development

```bash
# Clone repository
git clone <repo-url>
cd letteranne

# Create local environment variables
cp .env.example .env

# Start backend + frontend + database
make dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Healthcheck: `http://localhost:8000/healthz`

## Running Tests

```bash
make test          # backend + frontend tests
make test-e2e      # Playwright E2E tests
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DJANGO_SECRET_KEY` | Yes | Django secret key used for session and CSRF signing |
| `DATABASE_URL` | Yes | PostgreSQL connection string for backend |
| `ALLOWED_HOSTS` | Yes (prod) | Comma-separated Django allowed hosts |
| `DJANGO_DEBUG` | No | `1` for local dev, `0` for production |
| `POSTGRES_USER` | Yes (prod compose) | PostgreSQL username |
| `POSTGRES_PASSWORD` | Yes (prod compose) | PostgreSQL password |
| `POSTGRES_DB` | Yes (prod compose) | PostgreSQL database name |

## Architecture

- Backend: Django API (`backend/`) with domain-specific apps.
- Frontend: React + TanStack stack (`frontend/`).
- Database: PostgreSQL for users, letters, moderation, and profile data.
- API contract source: `.prodready/design/api/openapi.yaml`.

## API Documentation

- OpenAPI endpoint: `GET /openapi`
- Human-oriented API reference: `docs/api.md`

## Deployment

Production deployment steps are documented in `DEPLOYMENT.md`.
