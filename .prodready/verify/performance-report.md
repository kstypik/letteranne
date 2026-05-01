# Performance Report

Generated: 2026-05-01 21:46:17 UTC

## Core Web Vitals

Lighthouse run was not completed in this verification pass because a stable full app runtime was not available from Docker compose (production DB startup failed due existing Postgres data-volume version mismatch; see below).

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| LCP | N/A | < 2.5s | ⚠ Not measured |
| FID/INP | N/A | < 100ms | ⚠ Not measured |
| CLS | N/A | < 0.1 | ⚠ Not measured |
| Performance Score | N/A | > 90 | ⚠ Not measured |

## API Response Times

Attempted production stack run:

`docker compose -f docker-compose.prod.yml up -d --build`

Observed blocker:
- `postgres:18-alpine` container repeatedly restarted because existing volume data at `/var/lib/postgresql/data` is incompatible with Postgres 18 directory layout expectations.

Because DB never became healthy, API latency benchmark could not be executed against a running production stack in this pass.

| Endpoint | p50 | p95 | p99 | Status |
|----------|-----|-----|-----|--------|
| GET /healthz | N/A | N/A | N/A | ✗ Blocked by DB startup failure |

## Database

| Check | Status |
|-------|--------|
| All schema indexes defined | ✓ |
| No obvious N+1 in covered tests | ✓ (limited confidence; no query profiler run) |
| Production DB startup healthy | ✗ (volume/version mismatch with Postgres 18) |

## Bundle Analysis

Frontend production build (`pnpm --dir frontend build`) output:

- `dist/assets/index-*.js`: **334.51 kB** raw, **104.80 kB gzip**

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Initial JS (raw) | 334.51 kB | < 200 kB | ✗ Miss |
| Initial JS (gzip) | 104.80 kB | < 200 kB (budget not explicitly gzip-based) | ✓ |

## Optimization Recommendations

1. Add route-level code splitting to reduce initial raw JS payload.
2. Resolve Postgres 18 volume migration path in production compose docs and test flow.
3. Add automated Lighthouse run in CI once stable preview environment is available.
4. Add API latency smoke benchmark in CI (p50/p95 for `/healthz` and representative business endpoints).

## Result

**Status: FAILED (2 targets blocked/missed)**

- Production API perf benchmark blocked by infrastructure issue.
- Frontend initial raw JS bundle exceeds target budget.
