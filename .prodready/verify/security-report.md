# Security Audit Report

Generated: 2026-05-01 21:46:17 UTC

## Dependency Scan

Frontend (`pnpm audit --prod --json`):

- Critical: 0
- High: 0
- Moderate: 0
- Low: 0

Python (`pip_audit` in current environment):

- Found 2 vulnerabilities on `pip==25.3` (`CVE-2026-1703`, `CVE-2026-3219`)
- Note: this audit runs against the local Python environment, not a locked backend requirements file.

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 2 (tooling environment only) |

## Secrets Detection

Gitleaks command:

`docker run --rm -v "<repo>:/repo" zricethezav/gitleaks:latest detect --source=/repo --report-format=json --report-path=/repo/.prodready/verify/gitleaks-report.json`

Result: **No secrets found**.

## OWASP Top 10 Checklist

| # | Vulnerability | Status | Notes |
|---|---------------|--------|-------|
| A01 | Broken Access Control | ✓ Pass | Auth checks are enforced in tested endpoints (401/403 behaviors covered by integration tests). |
| A02 | Cryptographic Failures | ✓ Pass | Session + CSRF flow and secret-from-env pattern present. |
| A03 | Injection | ✓ Pass | Django ORM usage and tested request validation reduce SQL injection risk. |
| A04 | Insecure Design | ✓ Pass | Core auth/profile/letter boundaries are covered by integration tests. |
| A05 | Security Misconfiguration | ⚠ Partial | Production env flags present; hardening headers/rate limiting not fully verified in this pass. |
| A06 | Vulnerable Components | ⚠ Partial | Frontend audit clean; backend dependency audit is limited by missing lock/requirements audit source. |
| A07 | Auth Failures | ✓ Pass | Login/logout/auth-required flows are covered in backend integration tests. |
| A08 | Data Integrity Failures | ✓ Pass | Input validation and model constraints are tested. |
| A09 | Logging Failures | ⚠ Partial | No leak evidence found, but no structured log redaction audit performed. |
| A10 | SSRF | ✓ Pass | No direct server-side URL fetch paths identified in reviewed routes. |

## Code Review Checks

- [x] No hardcoded secrets detected by gitleaks
- [x] Auth/session flows present and tested
- [x] Sensitive config read from environment variables
- [x] Input validation and model constraints present
- [ ] Rate limiting on auth-sensitive endpoints explicitly verified
- [ ] Full backend dependency CVE audit against locked requirements file

## Issues Found

1. **Low** - Local Python tooling environment contains vulnerable `pip==25.3`; upgrade recommended.
2. **Medium (process gap)** - Backend CVE audit is not fully reproducible from project lockfile/requirements in current repository layout.
3. **Medium (hardening gap)** - Rate limiting/security headers verification not automated yet.

## Result

**Status: PASSED with follow-up hardening tasks**

- Critical: 0
- High: 0
- Medium: 2 (process/hardening gaps)
- Low: 1 (local tooling environment)
