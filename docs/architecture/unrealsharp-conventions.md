# UnrealSharp Conventions

## Purpose

Standardize C# usage on UnrealSharp for Afterlife Framework.

## Principles

1. Prefer C# for gameplay systems and tools logic.
2. Use C++/Blueprints only where UnrealSharp cannot express a requirement cleanly.
3. Keep UObject boundaries explicit; do not fight the engine’s lifetime model.
4. Replication attributes and RPCs must be reviewed for bandwidth and authority.

## Patterns

### Subsystems

Long-lived services should be World or GameInstance subsystems depending on lifetime:

- Match-scoped: World subsystem
- Cross-map (Hub, profile): GameInstance subsystem

### Data Assets

Definitions are Unreal data assets mirrored by C# strongly typed wrappers where useful.

### Events vs Delegates

- Intra-system: C# events/delegates OK
- Inter-system: Event Bus mandatory

### Async Loading

All non-trivial asset loads go through [Asset Manager](../core/asset-manager.md). No ad-hoc `LoadObject` in tick paths.

## Testing

Pure logic (curves, weighting, dependency graphs) should be unit-testable without PIE.

## Related Documents

- [Code Style](../standards/code-style.md)
- [Networking](../networking/overview.md)
