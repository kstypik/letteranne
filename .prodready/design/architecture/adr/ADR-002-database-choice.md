# ADR-002: Database Choice

## Status
Accepted

## Date
2026-05-01

## Context
The domain requires transactional consistency across users, letters, delayed delivery states, open-letter threads, moderation reports, and postcard ownership. Query patterns include timelines, relational joins, and filtered moderation queues.

## Decision
We will use PostgreSQL 18 as the primary datastore because:
- The model is relational and strongly structured, with integrity constraints needed for correctness.
- PostgreSQL supports robust indexing and transactional semantics for history, threading, and moderation workflows.
- It fits VPS + Docker deployment and free-tier-conscious operation.

## Consequences

### Positive
- Strong consistency and data integrity with foreign keys and constraints.
- Flexible SQL capabilities for reporting and feed-oriented queries.
- Mature tooling with Django ORM and migration support.

### Negative
- Requires schema management discipline and migration planning.
- Scaling writes beyond a single instance adds operational complexity later.

### Risks
- Risk: Open-letter feed queries may become expensive at growth.  
  Mitigation: Add targeted indexes, pagination strategy, and optional cache layer before considering architecture split.

## Alternatives Considered
1. SQLite for MVP: Rejected due to concurrency limits and weaker production characteristics.
2. NoSQL document database: Rejected because core domain is relational and would complicate integrity guarantees.

