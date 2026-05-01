# Launch Checklist

Project: Letteranne  
Date: 2026-05-01 21:46:17 UTC  
Verified by: ProdReady

## Specification

- [x] All user stories implemented
- [x] All API endpoints match OpenAPI spec (with documented extra endpoints)
- [x] Data model matches schema
- [x] Automated backend/frontend tests pass

## Security

- [x] No critical/high vulnerabilities in frontend dependencies
- [x] No secrets in codebase (gitleaks)
- [x] OWASP baseline reviewed
- [x] Authentication working correctly
- [x] Authorization checks in place
- [x] Input validation on tested endpoints
- [ ] Backend dependency CVE audit from locked requirements fully automated
- [ ] Rate-limiting/security-header verification automated

## Performance

- [ ] Core Web Vitals measured and meet targets
- [ ] API response p95 < 200ms validated in prod-like runtime
- [x] Database indexes defined in schema/models
- [ ] Frontend initial raw JS bundle < 200kB

## Testing

- [x] Unit tests passing
- [x] Integration tests passing
- [ ] E2E tests passing
- [ ] Acceptance criteria verified by executable E2E scenarios

## Infrastructure

- [x] Docker production build succeeds
- [x] `docker-compose.prod.yml` configured
- [x] Healthcheck endpoint implemented
- [x] Environment variables documented
- [x] CI/CD pipeline configured
- [ ] Production compose DB startup migration path validated for Postgres 18 volumes

## Documentation

- [x] `README.md` complete
- [x] `DEPLOYMENT.md` complete
- [x] API documentation complete
- [x] `.env.example` present

## Pre-Deployment

- [ ] Production environment variables set
- [ ] Database credentials secured
- [ ] Domain configured (if applicable)
- [ ] SSL certificate ready (if applicable)
- [ ] Backup strategy defined
- [ ] Monitoring configured

---

## Deployment Command

```bash
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml exec app python manage.py migrate
```

---

## Result

⚠ **NOT YET PRODUCTION READY**

Blocking items before launch:
1. Replace scaffolded/skipped E2E tests with runnable acceptance scenarios.
2. Resolve Postgres 18 production volume startup incompatibility and validate runtime.
3. Complete remaining performance/security hardening checks.
