# Asset Manager

## Purpose

Centralize asynchronous loading, soft references, memory budgets, and streaming policies for Afterlife content.

## Responsibilities

- Load primary assets by ID / soft path
- Maintain memory budgets per category (UI, weapons, enemies, audio)
- Coordinate prefetch for upcoming rounds / Hub previews
- Integrate with Unreal Primary Asset system
- Provide progress callbacks for loading screens

## Architecture

### Categories

| Category | Examples | Budget owner |
|----------|----------|--------------|
| Core | Framework essentials | Always resident |
| MapEssential | Spawn, HUD, doors | Loaded with map |
| Combat | Weapons, FX | Streaming + LRU |
| Enemy | Meshes, anims | Director-driven prefetch |
| UI | Menus, Hub | Mode-based |
| Audio | Stems, VO | Music director |

### APIs (conceptual)

- `LoadAsync<T>(PrimaryAssetId)`
- `Hold(handle)` / `Release(handle)`
- `Prefetch(ids, priority)`
- `GetLoadProgress(token)`

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Match start → resolve required package assets → load MapEssential → show loading screen progress → hand off to GameMode → directors prefetch combat/enemy assets based on round curves.

## Networking

Asset Manager is local. Content signature mismatch is a session problem (see Registries), not an Asset Manager replication feature.

## Events

| Event | Meaning |
|-------|---------|
| `Assets.LoadStarted` | Bundle began |
| `Assets.LoadProgress` | 0..1 |
| `Assets.LoadCompleted` | Ready |
| `Assets.LoadFailed` | Hard failure |

## Extension Points

- Custom budget policies per platform
- Mod-provided primary asset rules
- Prefetch strategies registered by directors

## Examples

Loading screen binds to `Assets.LoadProgress`. Mystery crate prefetches weighted weapon meshes when power turns on.

## Edge Cases

- Load fail on required asset: abort match start with package id
- Soft ref null after mod uninstall: Dependency Loader should have blocked; still fail safe
- Memory pressure: evict LRU Combat/UI first, never Core mid-match without policy

## Future Considerations

- Platform-specific cook rules
- Hub CDN streaming for large optional trailers (UI only)

## Implementation Specification

### Handle Refcount

Prefetch increments hold count; systems release when round leaves need window. Leaks detected in editor with `Afterlife.Assets.DumpHolds`.

## Related Documents

- [Registries](registries.md)
- [Loading Screen](../ui/loading-screen.md)
- [Performance](../performance/index.md)
