# Letteranne

Letteranne is a modular monolith with a Django headless API backend and a React SPA frontend.

## Project Structure

```
.
├── backend/                # Django API application (apps, settings, tests)
├── frontend/               # React SPA (routes, UI components, tests)
├── .prodready/             # Product/design/plan artifacts
├── docker-compose.yml      # Local multi-service orchestration
├── Dockerfile              # Base container definition
└── Makefile                # Local developer commands
```

### Workspace Conventions

- `backend/`: API, domain services, DB migrations, backend test suite.
- `frontend/`: SPA views/components, API client, frontend test suite.
- Shared contracts are generated from OpenAPI and consumed by frontend tooling.

## Local Setup

### Prerequisites

- Docker and Docker Compose
- Make

### Start Development Environment (placeholder)

```bash
make dev
```

### Backend Setup (placeholder)

```bash
# TODO: add backend dependency install + migrate commands
```

### Database Readiness (dev/test)

Use Docker services as the source of truth for local DB readiness:

```bash
make dev          # starts backend, frontend, postgres
make migrate      # applies Django migrations against configured DATABASE_URL
make db-shell     # opens psql for manual verification
```

For test execution, set `DJANGO_SETTINGS_MODULE=config.settings.test` and a test `DATABASE_URL`
(CI already provides this in `.github/workflows/ci.yml`).

### Frontend Setup (placeholder)

```bash
# TODO: add frontend dependency install + dev server commands
```

### Running Tests (placeholder)

```bash
# TODO: add backend/frontend test commands
```

## API Contract Generation

- Backend source of truth: `.prodready/design/api/openapi.yaml`
- Backend schema endpoint: `GET /openapi`
- Frontend typed client generation:

```bash
cd frontend
pnpm api:generate
```
