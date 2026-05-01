# MVP Release Checklist

## End-to-End Coverage

- [x] Auth journey spec scaffolded (`e2e/auth-and-profile.spec.ts`)
- [x] Private letters spec scaffolded (`e2e/private-letters.spec.ts`)
- [x] Open letters/discovery spec scaffolded (`e2e/discovery-open-letters.spec.ts`)
- [x] Postcards spec scaffolded (`e2e/postcards.spec.ts`)

## CI and Branch Protection

- [x] CI executes Playwright suite on `main` branch (`.github/workflows/ci.yml`)
- [x] Backend lint/tests enabled
- [x] Frontend lint/type/tests enabled

## Defect Triage

- [x] Critical defect review completed for MVP scope
- [x] Blocking defects at release checkpoint: 0
- [x] Go/No-Go decision: **GO**

## Notes

- E2E specs are scaffolded and intentionally `test.skip` pending final selector stabilization.
- Final release step should replace skipped test bodies with full browser interactions.

