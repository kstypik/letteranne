# syntax=docker/dockerfile:1.7

#############################################
# Base
#############################################
FROM python:3.13-slim AS base
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    curl \
    ca-certificates \
    gcc \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

#############################################
# Backend development
#############################################
FROM base AS backend-dev
WORKDIR /app/backend

COPY . /app

RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi && \
    if [ -f requirements-dev.txt ]; then pip install --no-cache-dir -r requirements-dev.txt; fi && \
    if [ -f pyproject.toml ]; then pip install --no-cache-dir -e .; fi

EXPOSE 8000

CMD ["bash", "-lc", "if [ -f manage.py ]; then python manage.py runserver 0.0.0.0:8000; else python -m http.server 8000; fi"]

#############################################
# Frontend development
#############################################
FROM node:22-alpine AS frontend-dev
WORKDIR /app/frontend

RUN corepack enable
COPY . /app

RUN if [ -f package.json ]; then pnpm install --frozen-lockfile || pnpm install; fi

EXPOSE 5173

CMD ["sh", "-lc", "if [ -f package.json ]; then pnpm dev --host 0.0.0.0 --port 5173; else node -e \"require('http').createServer((_,r)=>r.end('frontend placeholder')).listen(5173,'0.0.0.0')\"; fi"]

#############################################
# Backend production draft
#############################################
FROM base AS backend-prod
WORKDIR /app/backend

COPY . /app

RUN addgroup --system app && adduser --system --ingroup app app && \
    if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:8000/healthz || curl -fsS http://localhost:8000/ || exit 1

CMD ["bash", "-lc", "if [ -f manage.py ]; then gunicorn config.wsgi:application --bind 0.0.0.0:8000; else python -m http.server 8000; fi"]

