# Afterlife Framework Documentation

> **Single source of truth.** If code and docs disagree, update code to match docs—or amend docs via RFC.

Welcome to the official documentation for **Afterlife Framework**, an open-source Unreal Engine 5 (UnrealSharp / C#) engine for round-based survival experiences.

**Foundational law:** [Afterlife Framework Constitution](00-vision/Afterlife-Framework-Constitution.md) — every decision is evaluated against it. If a change violates the Constitution, reject or redesign.

---

## How to Read These Docs

1. **Everyone** → [Constitution](00-vision/Afterlife-Framework-Constitution.md) (read first)
2. **New contributors** → [Getting Started](getting-started/overview.md) → [Design Philosophy](philosophy/design-philosophy.md)
3. **Gameplay programmers** → [Architecture Overview](architecture/overview.md) → [Event Bus](core/event-bus.md) → [Gameplay Index](gameplay/index.md)
4. **Network engineers** → [Networking Overview](networking/overview.md)
5. **Mappers** → [Mapping Guide](mapping/index.md)
6. **Modders** → [Modding Guide](modding/index.md)
7. **UI engineers** → [UI Index](ui/index.md) → [Lobby](lobby/index.md) → [Afterlife Hub](hub/index.md)
8. **Feature proposers** → [RFC Process](rfc/process.md)

## Documentation Map

### Vision (Foundational Law)
- [Afterlife Framework Constitution](00-vision/Afterlife-Framework-Constitution.md)

### Philosophy
- [Design Philosophy](philosophy/design-philosophy.md)
- [Discovery Philosophy](philosophy/discovery-philosophy.md)
- [Gameplay Philosophy](philosophy/gameplay-philosophy.md)
- [Compatibility Promise](philosophy/compatibility.md)
- [Multiplayer Doctrine](philosophy/multiplayer-doctrine.md)
- [Modding Doctrine](philosophy/modding-doctrine.md)

### Core
- [Event Bus](core/event-bus.md) · [Registries](core/registries.md) · [Asset Manager](core/asset-manager.md) · [Dependency Loader](core/dependency-loader.md) · [Save System](core/save-system.md) · [Plugin System](core/plugin-system.md) · [Session Lifecycle](core/session-lifecycle.md) · [Time & Tick](core/time-and-tick.md)

### Gameplay
- [Gameplay Index](gameplay/index.md)

### Frontend
- [UI](ui/index.md) · [Lobby](lobby/index.md) · [Hub](hub/index.md)

### Creators
- [Mapping](mapping/index.md) · [Modding](modding/index.md) · [Plugins](plugins/index.md)

### Quality & Process
- [Code Style](standards/code-style.md) · [Documentation Style](standards/documentation-style.md) · [Git Workflow](standards/git-workflow.md)
- [Testing](testing/index.md) · [Performance](performance/index.md) · [CI/CD](devops/ci-cd.md) · [Automation](devops/automation.md)
- [RFC](rfc/process.md) · [Roadmap](../ROADMAP.md) · [Changelog](../CHANGELOG.md) · [Contributing](../CONTRIBUTING.md)

### Reference
- [FAQ](reference/faq.md) · [Document Status](reference/document-status.md) · [License Notes](reference/license-notes.md) · [Security](reference/security.md) · [Code of Conduct](reference/code-of-conduct.md)

## Document Contract

Every system document includes: Purpose · Responsibilities · Architecture · Ownership · Data Flow · Networking · Events · Extension Points · Examples · Edge Cases · Future Considerations

Many systems additionally include an **Implementation Specification** with APIs, state machines, schemas, and authoring checklists.

## Version

Documentation baseline: **0.1.0-docs**
