# ADR-001: Framework Selection

## Status
Accepted

## Date
2026-05-01

## Context
The project requires fast MVP delivery by a solo developer while preserving long-term maintainability. The product needs a rich writing UI and a backend with clear module boundaries, async workflows, and authentication.

## Decision
We will use Django 6.x as a headless backend API (with `django-modern-rest`) and React SPA with TypeScript strict mode for frontend because:
- Django maximizes backend development speed and provides mature ORM/auth/task ecosystem.
- React + TypeScript supports high-quality interactive writing interfaces and scalable UI architecture.
- The team is most productive with this stack, reducing delivery risk within 4 weeks.

## Consequences

### Positive
- Rapid delivery using familiar, mature frameworks.
- Strong ecosystem support for auth, testing, and data modeling.
- Separation of concerns between API and SPA aligns with OpenAPI + Orval workflow.

### Negative
- Two runtimes/toolchains increase project setup complexity.
- SPA + API split requires explicit handling for auth cookies, CORS, and CSRF.

### Risks
- Risk: Frontend/backend contract drift.  
  Mitigation: Treat OpenAPI as source of truth and regenerate client with Orval in CI.

## Alternatives Considered
1. Django full-stack templates: Rejected because rich SPA writing interactions are central to product quality.
2. Next.js full-stack: Rejected because backend preference and team productivity are stronger with Django domain model/task stack.

