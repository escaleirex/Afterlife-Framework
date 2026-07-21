# Git Workflow

## Purpose

Standardize branches, reviews, and releases.

## Branches

- `main` — stable docs/runtime
- `release/x.y` — release trains when runtime exists
- feature branches from `main`

## Reviews

At least one maintainer approval for architecture-impacting PRs. RFCs need explicit acceptance before impl merges.

## Releases

Tag `vX.Y.Z`; move CHANGELOG Unreleased → version section; publish Hub protocol version notes if needed.

## Related Documents

- [Contributing](../../CONTRIBUTING.md)
- [CI/CD](../devops/ci-cd.md)
