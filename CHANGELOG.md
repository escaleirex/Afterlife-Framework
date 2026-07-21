# Changelog

All notable changes to Afterlife Framework are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once the first public runtime release ships.

Until the first runtime release, versions may use `0.y.z` documentation/pre-release numbering.

---

## [Unreleased]

### Added

- Afterlife Framework Constitution as foundational project law (`docs/00-vision/`)
- Initial official documentation repository (source of truth)
- Design, discovery, and gameplay philosophy documents
- Architecture overview, folder structure, and naming conventions
- Core system specifications: Event Bus, Registries, Asset Manager, Dependency Loader, Save System, Plugin System
- Networking and dedicated server authority model
- Gameplay system specifications (rounds, economy, AI, weapons, perks, and related modules)
- UI, Lobby, and Afterlife Hub specifications
- Mapping and Modding guides
- RFC process and template
- Multi-year roadmap (Phases 1–6+)
- Cursor rules under `.cursor/rules/`
- Contributing guide, security policy notes, code of conduct

### Changed

- N/A (initial documentation baseline)

### Deprecated

- None

### Removed

- None

### Fixed

- None

### Security

- None

---

## [0.1.0-docs] — 2026-07-21

### Added

- Documentation-only foundation release
- Project README and repository structure for docs-first development
- GPL-3.0 LICENSE retained as project license

---

## Versioning Notes

| Range | Meaning |
|-------|---------|
| `0.y.z` | Pre-1.0: APIs may evolve; still prioritize map compatibility where runtime exists |
| `1.0.0` | First public runtime release with stability guarantees |
| `x.0.0` | Major: rare; requires RFC + migration guide; never intentional silent map breaks |

Compatibility policy: [`docs/philosophy/compatibility.md`](docs/philosophy/compatibility.md)

---

## How Maintainers Update This File

1. Add entries under `[Unreleased]` in the same PR as the change
2. On release, move `[Unreleased]` items into a dated version section
3. Link PRs/RFCs where helpful: `(#123)`, `(RFC-0042)`
4. Separate **Added / Changed / Deprecated / Removed / Fixed / Security**
5. Never rewrite published version history except for factual corrections
