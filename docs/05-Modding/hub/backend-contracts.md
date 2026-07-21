# Hub Backend Contracts

## Purpose

Specify API surfaces so the Hub can be first-party hosted and preferably self-hostable for communities.

## Resources (conceptual)

`GET /v1/search` · `GET /v1/packages/:id` · `GET /v1/packages/:id/versions` · `GET /v1/collections/:id` · `GET /v1/creators/:id` · `POST /v1/reviews` · download URLs with signed tokens

## Auth

Optional login for reviews/uploads. Downloads of public packages may be anonymous with rate limits.

## Self-Host

Documented schema allows community mirrors. Clients can add mirror endpoints in settings.

## Implementation Specification

### Error Model

JSON errors: `{ "code": "package_not_found", "message": "...", "details": {} }`

### Rate Limits

Anonymous search soft limit; authenticated upload stricter quotas. Clients backoff on 429.

## Related Documents

- [CI/CD](../devops/ci-cd.md)
- [Security notes](../reference/security.md)
