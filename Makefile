.PHONY: dev dev-build dev-down dev-logs test lint format typecheck migrate makemigrations db-shell db-reset clean help

# ===========================================
# Development
# ===========================================

dev: ## Start development containers
	docker compose up

dev-build: ## Rebuild and start development containers
	docker compose up --build

dev-down: ## Stop development containers
	docker compose down

dev-logs: ## Tail container logs
	docker compose logs -f

# ===========================================
# Testing
# ===========================================

test: ## Run backend and frontend tests (if present)
	@if [ -d backend/tests ]; then docker compose run --rm backend bash -lc "pytest"; else echo "No backend tests yet"; fi
	@if [ -f frontend/package.json ]; then docker compose run --rm frontend sh -lc "pnpm test --if-present"; else echo "No frontend tests yet"; fi

# ===========================================
# Code Quality
# ===========================================

lint: ## Run lint checks
	@if [ -d backend ]; then docker compose run --rm backend bash -lc "ruff check ."; else echo "No backend yet"; fi
	@if [ -f frontend/package.json ]; then docker compose run --rm frontend sh -lc "pnpm run lint --if-present"; else echo "No frontend yet"; fi

format: ## Format code
	@if [ -d backend ]; then docker compose run --rm backend bash -lc "ruff format ."; else echo "No backend yet"; fi
	@if [ -f frontend/package.json ]; then docker compose run --rm frontend sh -lc "pnpm run format --if-present"; else echo "No frontend yet"; fi

typecheck: ## Run static type checks
	@if [ -d backend ]; then docker compose run --rm backend bash -lc "python -m pip show mypy >/dev/null 2>&1 && mypy . || echo 'mypy not installed yet'"; else echo "No backend yet"; fi
	@if [ -f frontend/package.json ]; then docker compose run --rm frontend sh -lc "pnpm run typecheck --if-present"; else echo "No frontend yet"; fi

migrate: ## Run backend database migrations
	docker compose run --rm backend bash -lc "cd /app/backend && python manage.py migrate"

makemigrations: ## Create backend migration files
	docker compose run --rm backend bash -lc "cd /app/backend && python manage.py makemigrations"

# ===========================================
# Database
# ===========================================

db-shell: ## Open psql shell in db container
	docker compose exec db psql -U postgres -d letteranne_dev

db-reset: ## Reset database volume and restart
	docker compose down -v
	docker compose up -d db

# ===========================================
# Cleanup
# ===========================================

clean: ## Stop containers and remove volumes
	docker compose down -v --remove-orphans

# ===========================================
# Help
# ===========================================

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*##"; printf "\nTargets:\n"} /^[a-zA-Z0-9_-]+:.*##/ {printf "  %-16s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

