# Performance and Reliability Notes

## Query Plan and Index Review

- Letter history query uses sender/recipient filters with recent-order sorting.
  - Supporting indexes:
    - `idx_letter_sender_created_at`
    - `idx_letter_recipient_created_at`
- Open feed query uses visibility filter and recent ordering.
  - Supporting index:
    - `idx_letter_visibility_created_at`

## Scheduler Reliability Baseline

- Delivery task command: `python manage.py deliver_letters`
- Baseline behavior:
  - retries up to 3 attempts per run
  - logs failed attempts to stderr
  - uses idempotent status transition (`queued -> delivered` only)

## Follow-up Actions

- Add explicit `EXPLAIN ANALYZE` snapshots for high-volume fixtures.
- Add structured JSON logging output for task failures.
- Add alerting for repeated delivery-task failures.

