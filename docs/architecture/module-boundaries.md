# Module Boundaries

## Purpose

Prevent cyclic dependencies and god-modules.

## Allowed Dependency Direction

```
UI → Gameplay → Core → Net abstractions → Engine
Hub Client → Core
Editor → everything (editor-only)
```

Gameplay must not depend on UI widgets. UI listens to events / view models.

## Module Responsibilities

| Module | May contain | Must not contain |
|--------|-------------|------------------|
| Core | EventBus, Registries, Saves, Plugins, Assets | Weapon firing logic |
| Net | Replication helpers, server host utils | Perk effect math |
| Gameplay | Directors, AI, economy, interactions | Hub HTTP client |
| UI | Widgets, navigation | Authoritative state mutation |
| Hub | Storefront client, install orchestration | Round director |
| Editor | Validators, preview tools | Shipping-only hacks |

## Boundary Enforcement

- Architecture tests (runtime era) fail builds on illegal references
- RFCs required to introduce new top-level modules

## Related Documents

- [Architecture Overview](overview.md)
- [Composition Model](composition-model.md)
