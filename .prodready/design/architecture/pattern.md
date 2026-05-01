# Architecture Pattern

## Selected Pattern: Modular Monolith

## Rationale
Based on:
- Deployment: VPS (Docker) with Caddy reverse proxy
- Scale: ~200 users at launch, ~5,000 users at 6 months (gradual growth)
- Team: Solo developer

Modular Monolith was selected because:
- It preserves fast solo-developer delivery and low operational overhead.
- It introduces clear domain boundaries early, reducing long-term complexity.
- It fits gradual growth while allowing selective extraction later if needed.

## Structure

```
[Client]
  React SPA (TypeScript, TanStack)
        |
        v
[Caddy Reverse Proxy]
        |
        v
[Django Headless API - Modular Monolith]
  ├── auth module
  ├── profiles module
  ├── letters module
  ├── discovery module
  ├── postcards module
  ├── moderation module
  └── shared core (config, utils, events)
        |
        v
[PostgreSQL]

Async processing:
Django Task Queue (DB backend)
  ├── delayed letter delivery
  └── postcard reward grants
```

## Key Decisions
- Keep one deployable backend service for v1.0 with strict module boundaries per domain.
- Use OpenAPI as source-of-truth contract; generate typed frontend client via Orval.
- Process delayed delivery and reward workflows asynchronously with Django Tasks.
- Build mobile-first UI while keeping web SPA architecture simple for MVP.

## Future Considerations
- Extract high-traffic domains (e.g., open-letter feed) into separate services only if:
  - operational load exceeds single-service limits, or
  - team size grows enough to justify service ownership boundaries.
- Add read replicas/caching before considering service decomposition.

