# API Reference

Base URL (local): `http://localhost:8000`

## Authentication

Session authentication is cookie-based. For state-changing requests from the SPA, include CSRF token headers as configured by Django.

## Health and schema

### GET /healthz

Returns service health.

Response `200`:

```json
{
  "status": "ok"
}
```

### GET /openapi

Returns OpenAPI YAML schema generated from `.prodready/design/api/openapi.yaml`.

## Main endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`

### Profile

- `GET /profiles/me`

### Discovery

- `GET /users/discover`
- `GET /users/by-id/{display_id}`

### Letters

- `GET /letters`
- `GET /letters/open`
- `GET /letters/{letter_id}`
- `POST /letters/{letter_id}/replies`
- `POST /letters/{letter_id}/postcard`

### Postcards

- `GET /postcards/collection`
- `POST /postcards/grant`

### Moderation

- `POST /moderation/reports`

### GDPR

- `POST /gdpr/export`
- `POST /gdpr/delete-account`

## Example: register

Request:

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

For full request/response payloads and validation details, use the OpenAPI document at `GET /openapi`.
