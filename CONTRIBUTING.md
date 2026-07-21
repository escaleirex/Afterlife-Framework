# Contributing to Afterlife Framework

Thank you for contributing. Afterlife Framework is an engine, not a game. Contributions that harden systems, improve documentation, or expand modular extension points are preferred over one-off map features.

This document is mandatory reading before any pull request.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Before You Start](#before-you-start)
3. [Ways to Contribute](#ways-to-contribute)
4. [Documentation First](#documentation-first)
5. [RFC Requirement](#rfc-requirement)
6. [Development Workflow](#development-workflow)
7. [Pull Request Requirements](#pull-request-requirements)
8. [Review Criteria](#review-criteria)
9. [Commit Messages](#commit-messages)
10. [What We Will Reject](#what-we-will-reject)

---

## Code of Conduct

Be respectful. Assume good intent. Critique ideas, not people. Harassment, gatekeeping, or IP-infringing contributions are not welcome.

See also: [`docs/reference/code-of-conduct.md`](docs/reference/code-of-conduct.md)

---

## Before You Start

1. Read the [Constitution](docs/00-vision/Afterlife-Framework-Constitution.md) — foundational project law
2. Read the [Design Philosophy](docs/philosophy/design-philosophy.md)
3. Read the [Discovery Philosophy](docs/philosophy/discovery-philosophy.md)
4. Read the current [Roadmap](ROADMAP.md) — **do not implement future-phase work early**
5. Search existing issues, RFCs, and docs for duplicates
6. Confirm your change does not invent architecture outside documented systems
7. Confirm your change does not violate the Constitution

---

## Ways to Contribute

| Type | Examples | Notes |
|------|----------|-------|
| Documentation | Clarifications, missing edge cases, mapping examples | Always welcome |
| Bug fixes | Replication bugs, registry leaks, save corruption | Include regression tests |
| Core systems | Event Bus, registries, networking helpers | Requires RFC if new surface area |
| Gameplay systems | Perks, weapons pipeline, spawn director | Requires RFC |
| Tools | Editor utilities, validators, Hub packaging | Prefer Phase 3+ unless blocked |
| Tests | Unit, integration, networked smoke tests | Always welcome |
| RFCs | Proposal before large features | Required for new gameplay systems |

---

## Documentation First

**Every behavioral change updates documentation in the same PR.**

- New system → new or updated doc under `docs/`
- Changed public API → update the owning doc + CHANGELOG
- Deprecated path → mark deprecated, document migration, never silently remove
- Cursor agents must follow [`.cursor/rules/`](.cursor/rules/)

If docs and code disagree, **docs win until an RFC amends them**.

---

## RFC Requirement

A new gameplay feature **must** have an accepted RFC before implementation begins.

Applies to (non-exhaustive):

- New gameplay subsystems
- Changes to Event Bus contracts
- Changes to replication ownership
- Breaking or potentially breaking registry APIs
- Hub protocol changes
- Save format changes

Does **not** require RFC (still needs PR review):

- Typo / docs-only fixes
- Private refactors with no public API change
- Test-only additions
- Bug fixes that restore documented behavior

Process: [`docs/rfc/process.md`](docs/rfc/process.md)  
Template: [`rfcs/templates/0000-template.md`](rfcs/templates/0000-template.md)

---

## Development Workflow

```
1. Fork / branch from main
2. Confirm roadmap phase allows the work
3. Open or reference an RFC (if required)
4. Implement against documented architecture
5. Write / update tests
6. Update docs + CHANGELOG
7. Open pull request
8. Address review
9. Merge only after required checks pass
```

Branch naming:

```
docs/<topic>
fix/<issue-id>-short-name
feat/<rfc-id>-short-name
refactor/<area>
test/<area>
chore/<topic>
```

---

## Pull Request Requirements

Every PR must:

1. Reference related issue and/or RFC
2. Explain **why**, not only what
3. Update documentation
4. Update [`CHANGELOG.md`](CHANGELOG.md) under `[Unreleased]`
5. Include tests for new behavior or bug regressions
6. Avoid hardcoded Call of Duty / proprietary names in core
7. Route gameplay communication through the Event Bus where applicable
8. Preserve multiplayer / server authority assumptions
9. Avoid bypassing registries, asset manager, or dependency loader
10. Pass CI (lint, tests, doc link checks when available)

PR description checklist (copy into PR body):

```markdown
## Summary
-

## RFC
- [ ] N/A
- [ ] RFC #### accepted

## Docs
- [ ] Docs updated
- [ ] CHANGELOG updated

## Tests
- [ ] Unit
- [ ] Integration / networked (if applicable)

## Compatibility
- [ ] No intentional break
- [ ] Migration notes included (if any)
```

---

## Review Criteria

Reviewers evaluate:

| Criterion | Question |
|-----------|----------|
| Philosophy | Does this keep the framework an engine, not a game? |
| Discovery | Does this force objectives on players? (Must not) |
| Authority | Is server still authoritative? |
| Extensibility | Can maps/mods replace this without forking core? |
| Data-driven | Are tunables in data, not code? |
| Events | Are cross-system notifications on the Event Bus? |
| Compatibility | Will published maps keep working? |
| Clarity | Is the code readable by a new contributor? |
| Docs | Could a senior engineer implement from docs alone? |

---

## Commit Messages

Follow Conventional Commits:

```
feat(rounds): add intermission pause configuration
fix(net): correct score replication for late joiners
docs(hub): document collection dependency resolution
test(ai): add barrier vault regression
refactor(registry): simplify weapon id lookup
chore(ci): add markdown link checker
```

Breaking changes must include `BREAKING CHANGE:` in the footer and a migration section in docs + CHANGELOG.

---

## What We Will Reject

- Changes that violate the [Constitution](docs/00-vision/Afterlife-Framework-Constitution.md)
- Hardcoded proprietary IP, names, logos, or assets in core
- Built-in Main Quest / Side Quest / Mission systems in core
- Client-authoritative gameplay state
- Systems that bypass the Event Bus for cross-system coupling
- Duplicate parallel systems that already exist
- Features from future roadmap phases without explicit maintainership approval
- Undocumented public APIs
- PRs without tests for behavioral changes
- “Temporary” hacks with no removal plan
- Exclusive Steam Workshop (or similar) lock-in instead of Afterlife Hub

---

## Getting Help

- Open a Discussion for design questions
- Open an Issue for bugs
- Open an RFC for new systems
- Read [`docs/index.md`](docs/index.md) before asking architecture questions

---

## License of Contributions

By contributing, you agree your contributions are licensed under the same GPL-3.0 terms as the project (`LICENSE`).
