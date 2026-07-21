# Registries

## Purpose

Provide stable, data-driven lookup of all content definitions (weapons, perks, enemies, modes, mutators, crates, etc.) so gameplay code never hardcodes content lists.

## Responsibilities

- Register definitions from framework, mods, and maps
- Resolve by stable string ID
- Apply override layers (mode/mutator/map)
- Validate uniqueness and schema
- Expose enumeration for UI and tools

## Architecture

### Registry Types

Each content domain has a registry:

- `WeaponRegistry`
- `PerkRegistry`
- `EnemyRegistry`
- `PowerUpRegistry`
- `ConsumableRegistry`
- `GameModeRegistry`
- `MutatorRegistry`
- `CharacterRegistry`
- `MusicEventRegistry`
- ...extensible via Plugin System

### Definition Identity

```
afterlife.weapon.starter_pistol
com.acme.weapon.rail_splitter
```

IDs are immutable once published. Display names are localized separately.

### Override Model

```
Base definition
  ← Mod patch (additive fields / replaced asset refs)
  ← Mutator patch
  ← Map patch
```

Patches are JSON/data-asset deltas, not silent mutation of shared assets.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

1. Dependency Loader loads packages in order
2. Each package contributes definitions to registries
3. Validators run (unique ids, required fields, soft refs resolve)
4. Session systems query registries only—never scan Content folders at runtime for gameplay decisions

## Networking

Registries themselves are not fully replicated as giant catalogs. Clients load the same resolved package set. Server validates that client content signature matches session signature (hash of package ids+versions). Mismatch → disconnect with actionable error.

## Events

| Event | When |
|-------|------|
| `Registry.DomainReloaded` | Hot reload in editor / rare runtime reload |
| `Registry.ValidationFailed` | Package rejected |

## Extension Points

- Plugins register new registry domains
- Content packs register definitions
- Map manifests patch definitions by id

## Examples

```csharp
var weapon = weaponRegistry.Get("afterlife.weapon.starter_pistol");
foreach (var perk in perkRegistry.All) { /* populate Hub preview */ }
```

## Edge Cases

- Duplicate IDs across mods: hard fail with conflict report
- Missing dependency definition referenced by map: hard fail before match start
- Partial overrides removing required fields: validation fail
- Case sensitivity: IDs are case-sensitive; tools warn on near-misses

## Future Considerations

- Binary registry caches for faster cook
- Signed definition provenance for Hub trust UX

## Implementation Specification

### Lookup API

```csharp
T Get<T>(string id);
bool TryGet<T>(string id, out T def);
IEnumerable<T> All<T>();
IEnumerable<T> Where<T>(Func<T,bool> pred);
```

### Conflict Report Format

Include package A version, package B version, duplicate id, and suggested resolution (rename/remove).

## Related Documents

- [Asset Manager](asset-manager.md)
- [Dependency Loader](dependency-loader.md)
- [Plugin System](plugin-system.md)
