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

### Frontend Setup (placeholder)

```bash
# TODO: add frontend dependency install + dev server commands
```

### Running Tests (placeholder)

```bash
# TODO: add backend/frontend test commands
```
