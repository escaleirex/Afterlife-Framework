# Testing

## Purpose

Define the testing strategy: unit, integration, networked smoke, validators.

## Layers

| Layer | What |
|-------|------|
| Unit | Curves, resolvers, economy math, weighting |
| Integration | Subsystem interactions in controlled world |
| Networked smoke | 2 clients + dedicated boot/join/round start |
| Content validation | Manifests, registry conflicts |
| UI smoke | Navigation Critical paths |

## Rule

Behavioral changes require tests or an explicit documented test plan in the PR.

## Related Documents

- [CI/CD](../devops/ci-cd.md)
- [Automation](../devops/automation.md)
